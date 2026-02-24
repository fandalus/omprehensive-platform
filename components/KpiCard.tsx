import React from 'react';
import { KPI } from '../types';
import { AlertCircle, CheckCircle2, TrendingUp, TrendingDown, UserCircle2 } from 'lucide-react';

interface KpiCardProps {
  kpi: KPI;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  const isCritical = kpi.achievementPercentage < 60;
  const isWarning = kpi.achievementPercentage >= 60 && kpi.achievementPercentage < 85;
  const isGood = kpi.achievementPercentage >= 85;

  let statusColor = "bg-emerald-500";
  let statusBg = "bg-emerald-50";
  let textColor = "text-emerald-600";
  let Icon = CheckCircle2;

  if (isCritical) {
    statusColor = "bg-red-500";
    statusBg = "bg-red-50";
    textColor = "text-red-600";
    Icon = AlertCircle;
  } else if (isWarning) {
    statusColor = "bg-yellow-500";
    statusBg = "bg-yellow-50";
    textColor = "text-yellow-600";
    Icon = TrendingDown;
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
      {/* Subtle top border accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${statusColor} opacity-80`}></div>
      
      <div className="flex justify-between items-start mb-4 mt-1">
        <h3 className="font-bold text-sm text-slate-800 line-clamp-2 leading-relaxed max-w-[80%]">{kpi.name}</h3>
        <div className={`p-2 rounded-xl ${statusBg} ${textColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {kpi.achievementPercentage}
        </span>
        <span className="text-sm font-medium text-slate-400">%</span>
      </div>

      <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
        <div 
          className={`h-full rounded-full ${statusColor} transition-all duration-1000 ease-out`} 
          style={{ width: `${Math.min(kpi.achievementPercentage, 100)}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mb-auto">
        <div className="flex flex-col gap-1">
          <span className="text-slate-400 font-medium">المستهدف</span>
          <span className="font-bold text-slate-700">{kpi.target} {kpi.unit}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-slate-400 font-medium">الفعلي</span>
          <span className="font-bold text-slate-700">{kpi.actual} {kpi.unit}</span>
        </div>
      </div>

      {kpi.responsible && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
            <UserCircle2 className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <span className="font-medium text-slate-600">{kpi.responsible}</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;