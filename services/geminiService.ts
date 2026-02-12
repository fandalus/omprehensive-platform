import { GoogleGenAI, Type } from "@google/genai";
import { TrackData } from '../types';
import { AnalysisResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSchoolAnalysis = async (currentData: TrackData[]): Promise<AnalysisResponse> => {
  // Use the passed data instead of imports
  const dataContext = JSON.stringify(currentData);

  const prompt = `
    أنت مستشار تعليمي وإداري خبير.
    لديك البيانات التالية لأداء "مدارس الأندلس - فرع المنار":
    ${dataContext}

    المطلوب:
    قم بتحليل هذه البيانات واستخرج التالي:
    1. "summary": ملخص عام للأداء بنبرة تحفيزية.
    2. "strengths": قائمة بأهم 3 نقاط قوة في الفرع.
    3. "weaknesses": قائمة بأهم 3 نقاط ضعف تحتاج لتحسين فوري (الأرقام المنخفضة).
    4. "recommendations": 3 توصيات عملية وإدارية للتحسين.

    يجب أن تكون اللغة عربية مهنية، محفزة، وموجهة للقيادة المدرسية.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["summary", "strengths", "weaknesses", "recommendations"],
        },
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResponse;
  } catch (error) {
    console.error("Error generating analysis:", error);
    return {
      summary: "عذراً، لم نتمكن من توليد التحليل الذكي في الوقت الحالي. يرجى مراجعة البيانات يدوياً.",
      strengths: ["جودة تعليم القرآن مرتفعة في معظم المسارات", "أعداد الطلاب تجاوزت المستهدف", "رضا أولياء الأمور مستقر"],
      weaknesses: ["تحقيق معايير التميز المؤسسي", "تفاعل الطلاب في المسار العالمي بنات", "الإيرادات الأخرى"],
      recommendations: ["تشكيل لجنة للتميز المؤسسي", "مراجعة خطة الأنشطة للمسار العالمي", "وضع خطة تسويقية لزيادة الإيرادات الإضافية"]
    };
  }
};