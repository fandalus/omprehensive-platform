import React from 'react';
import { AnalysisResponse } from '../types';
import { Lightbulb, ShieldAlert, TrendingUp, Sparkles } from 'lucide-react';

interface AnalysisSectionProps {
  analysis: AnalysisResponse | null;
  loading: boolean;
  onGenerate: () => void;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ analysis, loading, onGenerate }) => {
  if (!analysis && !loading) {
    return (
      <div className="w-full bg-indigo-900 text-white rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">اكتشف رؤى أعمق مع الذكاء الاصطناعي</h2>
          <p className="mb-6 text-indigo-200 max-w-xl mx-auto">
            قم بتوليد تحليل فوري للأداء، وتحديد الفجوات، والحصول على خطة عمل مقترحة لتحسين أداء مدارس الأندلس.
          </p>
          <button 
            onClick={onGenerate}
            className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>توليد التقرير الذكي</span>
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 animate-pulse">جاري تحليل البيانات وصياغة التوصيات...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">الملخص التنفيذي</h3>
            <p className="leading-relaxed opacity-90">{analysis?.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-xl p-6 border-t-4 border-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4 text-emerald-700">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-bold text-lg">نقاط القوة</h3>
          </div>
          <ul className="space-y-3">
            {analysis?.strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-xl p-6 border-t-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4 text-red-700">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-lg">فرص التحسين</h3>
          </div>
          <ul className="space-y-3">
            {analysis?.weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl p-6 border-t-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4 text-amber-700">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-bold text-lg">توصيات العمل</h3>
          </div>
          <ul className="space-y-3">
            {analysis?.recommendations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;