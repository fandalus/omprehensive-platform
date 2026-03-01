import { TrackData, Semester, AppData } from './types';

// Data parsed directly from the user's provided table text.
export const SCHOOL_DATA: TrackData[] = [
  {
    id: 'national-boys',
    name: 'المسار الأهلي - بنين',
    manager: 'عبداللطيف مدخلي',
    overallPerformance: 85.76,
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 82, achievementPercentage: 100, unit: '%', responsible: 'رشيد العلواني' },
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 6.42, achievementPercentage: 100, unit: '#', responsible: 'عبد العزيز أبو عالي' },
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'عبد العزيز أبو عالي' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 88, achievementPercentage: 98, unit: '%', responsible: 'محمد هزازي' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'محمد هزازي' },
      { id: 'awards', name: 'المراكز التنافسية', target: 10, actual: 15, achievementPercentage: 100, unit: '#', responsible: 'محمد مصطفى' },
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 70, achievementPercentage: 99, unit: '%', responsible: 'محمد هزازي' },
      { id: 'activity-revenue', name: 'إيرادات الأنشطة والفعاليات', target: 99800, actual: 44263, achievementPercentage: 44, unit: '$', responsible: 'عبدالعزيز ابوعالي' },
    ]
  },
  {
    id: 'kg',
    name: 'رياض الأطفال',
    manager: 'شذى الظاهري',
    overallPerformance: 75.69,
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 80, achievementPercentage: 100, unit: '%', responsible: 'عبد الحميد جابو' },
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 7.04, achievementPercentage: 50, unit: '#', responsible: 'منصور الروقي' }, // Note: Data says 50% achievement despite high actual? Likely data quirk or penalty.
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 90, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'رعود اللحياني' },
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 64, achievementPercentage: 91, unit: '%', responsible: 'سارة السلمي' },
      { id: 'activity-revenue', name: 'إيرادات الأنشطة والفعاليات', target: 258200, actual: 31481, achievementPercentage: 12, unit: '$', responsible: '' },
    ]
  },
  {
    id: 'national-girls',
    name: 'المسار الأهلي - بنات',
    manager: 'شذى الظاهري',
    overallPerformance: 78.73,
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 83, achievementPercentage: 100, unit: '%', responsible: 'عبد الحميد جابو' },
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 5.44, achievementPercentage: 100, unit: '#', responsible: 'منصور الروقي' },
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 89, achievementPercentage: 99, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'رعود اللحياني' },
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 44, achievementPercentage: 63, unit: '%', responsible: 'سارة السلمي' }, // Low
      { id: 'activity-revenue', name: 'إيرادات الأنشطة والفعاليات', target: 258200, actual: 31481, achievementPercentage: 12, unit: '$', responsible: '' },
    ]
  },
  {
    id: 'intl-boys',
    name: 'المسار العالمي - بنين',
    manager: 'عبداللطيف مدخلي',
    overallPerformance: 82.80,
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 63, achievementPercentage: 100, unit: '%', responsible: 'رشيد العلواني' },
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 3.98, achievementPercentage: 80, unit: '#', responsible: 'عبد العزيز أبو عالي' },
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'عبد العزيز أبو عالي' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 84, achievementPercentage: 94, unit: '%', responsible: 'محمد هزازي' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'محمد هزازي' },
      { id: 'awards', name: 'المراكز التنافسية', target: 5, actual: 11, achievementPercentage: 100, unit: '#', responsible: 'محمد مصطفى' },
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 96, achievementPercentage: 100, unit: '%', responsible: 'محمد هزازي' },
      { id: 'activity-revenue', name: 'إيرادات الأنشطة والفعاليات', target: 99800, actual: 44263, achievementPercentage: 44, unit: '$', responsible: 'عبدالعزيز ابوعالي' },
    ]
  },
  {
    id: 'intl-girls',
    name: 'المسار العالمي - بنات',
    manager: 'شذى الظاهري',
    overallPerformance: 58.61, // Lowest
    kpis: [
      { id: 'quran', name: 'إجادة تعلم القرآن الكريم', target: 60, actual: 75, achievementPercentage: 50, unit: '%', responsible: 'عبد الحميد جابو' }, // Data inconsistency in source, utilizing achievement %
      { id: 'interaction', name: 'تفاعل الطلاب', target: 5.0, actual: 1.96, achievementPercentage: 61, unit: '#', responsible: 'منصور الروقي' }, // Low
      { id: 'image', name: 'معامل الصورة الذهنية', target: 50, actual: 50, achievementPercentage: 100, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'parent-sat', name: 'رضا ولي الأمر', target: 90, actual: 82, achievementPercentage: 91, unit: '%', responsible: 'رعود اللحياني' },
      { id: 'communication', name: 'التواصل الفعال مع ولي الأمر', target: 1.0, actual: 0.89, achievementPercentage: 89, unit: '#', responsible: 'رعود اللحياني' },
      { id: 'awards', name: 'المراكز التنافسية', target: 5, actual: 0, achievementPercentage: 0, unit: '#', responsible: 'محمد مصطفى' }, // Critical
      { id: 'job-env', name: 'جودة بيئة العمل', target: 70, actual: 55, achievementPercentage: 78, unit: '%', responsible: 'سارة السلمي' },
      { id: 'activity-revenue', name: 'إيرادات الأنشطة والفعاليات', target: 258200, actual: 31481, achievementPercentage: 12, unit: '$', responsible: '' },
    ]
  }
];

export const BRANCH_ADMIN_DATA: TrackData = {
    id: 'branch-admin',
    name: 'إدارة الفرع',
    manager: 'سارة السلمي',
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

export const INITIAL_SEMESTERS: Semester[] = [
  { id: 'term-1-2025', name: 'الفصل الدراسي الأول 1447' },
  { id: 'term-2-2025', name: 'الفصل الدراسي الثاني 1447' },
];

// Helper to clone and modify data for demo purposes
const createMockSemesterData = (baseData: TrackData[], adminData: TrackData, modifier: number): TrackData[] => {
    const all = [...baseData, adminData];
    return all.map(track => ({
        ...track,
        overallPerformance: parseFloat(Math.min(100, Math.max(0, track.overallPerformance + modifier)).toFixed(2)),
        kpis: track.kpis.map(kpi => ({
            ...kpi,
            actual: kpi.unit === '%' ? Math.min(100, Math.max(0, kpi.actual + modifier)) : kpi.actual,
            achievementPercentage: Math.min(100, Math.max(0, kpi.achievementPercentage + modifier))
        }))
    }));
};

// Helper to create zeroed data for a new semester
const createZeroedSemesterData = (baseData: TrackData[], adminData: TrackData): TrackData[] => {
    const all = [...baseData, adminData];
    return all.map(track => ({
        ...track,
        overallPerformance: 0,
        kpis: track.kpis.map(kpi => ({
            ...kpi,
            actual: 0,
            achievementPercentage: 0
        }))
    }));
};

export const INITIAL_APP_DATA: AppData = {
    semesters: INITIAL_SEMESTERS,
    defaultSemesterId: 'term-1-2025',
    data: {
        'term-1-2025': [...SCHOOL_DATA, BRANCH_ADMIN_DATA],
        'term-2-2025': createZeroedSemesterData(SCHOOL_DATA, BRANCH_ADMIN_DATA),
    }
};