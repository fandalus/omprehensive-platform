export interface KPI {
  id: string;
  name: string;
  target: number;
  actual: number;
  achievementPercentage: number; // The percentage explicitly stated in the report (e.g., 85.76%)
  unit: '%' | '#' | '$';
  isReverse?: boolean; // If lower is better (not used extensively here but good for type safety)
  responsible?: string;
}

export interface TrackData {
  id: string;
  name: string;
  overallPerformance: number;
  kpis: KPI[];
  manager?: string; // Added manager field
}

export interface AnalysisResponse {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}