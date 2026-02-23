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

  let bgColor = "bg-white";
  let borderColor = "border-gray-200";
  let textColor = "text-gray-700";
  let Icon = TrendingUp;

  if (isCritical) {
    borderColor = "border-red-200";
    bgColor = "bg-red-50";
    textColor = "text-red-700";
    Icon = AlertCircle;
  } else if (isWarning) {
    borderColor = "border-yellow-200";
    bgColor = "bg-yellow-50";
    textColor = "text-yellow-700";
    Icon = TrendingDown;
  } else {
    borderColor = "border-emerald-200";
    bgColor = "bg-emerald-50";
    textColor = "text-emerald-700";
    Icon = CheckCircle2;
  }

  return (
    <div className={`p-4 rounded-xl border ${borderColor} ${bgColor} shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-full`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm text-gray-800 line-clamp-2 min-h-[40px]">{kpi.name}</h3>
        <Icon className={`w-5 h-5 ${textColor}`} />
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-bold text-gray-900">
          {kpi.achievementPercentage}%
        </span>
        <span className="text-xs text-gray-500 mb-1">نسبة التحقق</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
        <div 
          className={`h-1.5 rounded-full ${isCritical ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-emerald-500'}`} 
          style={{ width: `${Math.min(kpi.achievementPercentage, 100)}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-xs text-gray-600 border-t border-gray-200/50 pt-2 mb-auto">
        <div className="flex flex-col">
          <span className="opacity-70">المستهدف</span>
          <span className="font-semibold">{kpi.target} {kpi.unit}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="opacity-70">الفعلي</span>
          <span className="font-semibold">{kpi.actual} {kpi.unit}</span>
        </div>
      </div>

      {kpi.responsible && (
        <div className="mt-3 pt-2 border-t border-gray-200/50 flex items-center gap-1.5 text-xs text-gray-500">
          <UserCircle2 className="w-3.5 h-3.5 opacity-60" />
          <span className="opacity-70">المسؤول:</span>
          {kpi.responsibleEmail ? (
            <a href={`mailto:${kpi.responsibleEmail}`} className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
              {kpi.responsible}
            </a>
          ) : (
            <span className="font-semibold text-gray-700">{kpi.responsible}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default KpiCard;