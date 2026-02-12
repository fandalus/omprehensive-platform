import { TrackData } from './types';

// Data parsed directly from the user's provided table text.
export const SCHOOL_DATA: TrackData[] = [
  {
    id: 'national-boys',
    name: 'المسار الأهلي - بنين',
    overallPerformance: 85.76,
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 82, achievementPercentage: 100, unit: '%', responsible: 'عبد الحميد جابو' },
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 6.42, achievementPercentage: 100, unit: '#', responsible: 'منصور الروقي' },
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 88, achievementPercentage: 98, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'رعود اللحياني' },
      { id: 'awards', name: 'المراكز التنافسية', target: 10, actual: 15, achievementPercentage: 100, unit: '#', responsible: 'محمد مصطفى' },
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 70, achievementPercentage: 99, unit: '%', responsible: 'سارة السلمي' },
    ]
  },
  {
    id: 'kg',
    name: 'رياض الأطفال',
    overallPerformance: 75.69,
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 80, achievementPercentage: 100, unit: '%', responsible: 'عبد الحميد جابو' },
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 7.04, achievementPercentage: 50, unit: '#', responsible: 'منصور الروقي' }, // Note: Data says 50% achievement despite high actual? Likely data quirk or penalty.
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 90, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'رعود اللحياني' },
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 64, achievementPercentage: 91, unit: '%', responsible: 'سارة السلمي' },
    ]
  },
  {
    id: 'national-girls',
    name: 'المسار الأهلي - بنات',
    overallPerformance: 78.73,
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 83, achievementPercentage: 100, unit: '%', responsible: 'عبد الحميد جابو' },
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 5.44, achievementPercentage: 100, unit: '#', responsible: 'منصور الروقي' },
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 89, achievementPercentage: 99, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'رعود اللحياني' },
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 44, achievementPercentage: 63, unit: '%', responsible: 'سارة السلمي' }, // Low
    ]
  },
  {
    id: 'intl-boys',
    name: 'المسار العالمي - بنين',
    overallPerformance: 82.80,
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 63, achievementPercentage: 100, unit: '%', responsible: 'عبد الحميد جابو' },
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 3.98, achievementPercentage: 80, unit: '#', responsible: 'منصور الروقي' },
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 84, achievementPercentage: 94, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'رعود اللحياني' },
      { id: 'awards', name: 'المراكز التنافسية', target: 5, actual: 11, achievementPercentage: 100, unit: '#', responsible: 'محمد مصطفى' },
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 96, achievementPercentage: 100, unit: '%', responsible: 'سارة السلمي' },
    ]
  },
  {
    id: 'intl-girls',
    name: 'المسار العالمي - بنات',
    overallPerformance: 58.61, // Lowest
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 75, achievementPercentage: 50, unit: '%', responsible: 'عبد الحميد جابو' }, // Data inconsistency in source, utilizing achievement %
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 1.96, achievementPercentage: 61, unit: '#', responsible: 'منصور الروقي' }, // Low
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 82, achievementPercentage: 91, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'رعود اللحياني' },
      { id: 'awards', name: 'المراكز التنافسية', target: 5, actual: 0, achievementPercentage: 0, unit: '#', responsible: 'محمد مصطفى' }, // Critical
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 55, achievementPercentage: 78, unit: '%', responsible: 'سارة السلمي' },
    ]
  }
];

export const BRANCH_ADMIN_DATA = {
    id: 'branch-admin',
    name: 'إدارة الفرع',
    overallPerformance: 82.75,
    kpis: [
        { id: 'students', name: 'أعداد الطلاب', target: 777, actual: 1827, achievementPercentage: 100, unit: '#', responsible: 'منصور الروقي' },
        { id: 'revenue', name: 'صافي الإيرادات الأخرى', target: 432950, actual: 104416, achievementPercentage: 24, unit: '$', responsible: 'بشر محمد رياض' },
        { id: 'fees', name: 'تحصيل الرسوم الدراسية', target: 50, actual: 65, achievementPercentage: 100, unit: '%', responsible: 'منال القحطاني' },
        { id: 'retention', name: 'الإحتفاظ بالموظفين', target: 100, actual: 90, achievementPercentage: 90, unit: '%', responsible: 'سارة السلمي' },
        { id: 'excellence', name: 'تحقيق معايير التميز المؤسسي', target: 90, actual: 0, achievementPercentage: 0, unit: '%', responsible: 'محمد مصطفى' }, // Critical
        { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 77, achievementPercentage: 100, unit: '%', responsible: 'سارة السلمي' },
    ]
}