import React, { useState, useEffect } from 'react';
import { SCHOOL_DATA, BRANCH_ADMIN_DATA } from './constants';
import KpiCard from './components/KpiCard';
import AdminPanel from './components/AdminPanel';
import { TrackData } from './types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { LayoutDashboard, Users, PieChart, School, Settings, Clock, CalendarDays } from 'lucide-react';

// Custom Tick Component for Mobile X-Axis
const CustomXAxisTick = ({ x, y, payload }: any) => {
  const text = payload.value;
  // Split by " - " to wrap lines for specific track names
  const lines = text.split(' - ');
  // If text is long and no dash, split by space (fallback)
  const finalLines = lines.length > 1 ? lines : text.split(' ');

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#64748b" fontSize={9} fontWeight={600} fontFamily="Tajawal">
        {finalLines.map((line: string, index: number) => (
          <tspan x={0} dy={index === 0 ? 0 : 11} key={index}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize data from localStorage or fallback to constants
  const [schoolData, setSchoolData] = useState<TrackData[]>(() => {
    try {
      const saved = localStorage.getItem('andalusSchoolData');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load data from storage", e);
    }
    // Default fallback
    return [...SCHOOL_DATA, BRANCH_ADMIN_DATA];
  });

  // Initialize Logo from localStorage with the new default
  const [appLogo, setAppLogo] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('appLogo');
      // Ensure we don't return "null" string or empty string if it was saved incorrectly
      if (saved && saved !== "null" && saved !== "undefined") {
        return saved;
      }
      return "https://img.sanishtech.com/u/51c80a7dddbff72ffbaa8e5fc98d7f64.png";
    } catch (e) {
      return "https://img.sanishtech.com/u/51c80a7dddbff72ffbaa8e5fc98d7f64.png";
    }
  });

  // Initialize Last Updated Date
  const [lastUpdated, setLastUpdated] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('lastUpdated');
      // Return saved date or current date formatted in Arabic
      return saved || new Date().toLocaleDateString('ar-SA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return new Date().toLocaleDateString('ar-SA');
    }
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('andalusSchoolData', JSON.stringify(schoolData));
  }, [schoolData]);

  // Helper to update the timestamp
  const refreshLastUpdated = () => {
    const now = new Date();
    const dateStr = now.toLocaleString('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    setLastUpdated(dateStr);
    localStorage.setItem('lastUpdated', dateStr);
  };

  const handleUpdateData = (newData: TrackData[]) => {
    setSchoolData(newData);
    refreshLastUpdated();
  };

  const handleUpdateLogo = (newLogo: string | null) => {
    setAppLogo(newLogo);
    refreshLastUpdated();
    try {
      if (newLogo) {
        localStorage.setItem('appLogo', newLogo);
      } else {
        localStorage.removeItem('appLogo');
      }
    } catch (e) {
      alert("عذراً، حجم الصورة كبير جداً للتخزين المحلي. يرجى اختيار صورة أصغر.");
    }
  };

  const currentTrack = selectedTrackId 
    ? schoolData.find(t => t.id === selectedTrackId) 
    : null;

  // Chart Data Preparation
  const performanceData = schoolData.map(track => ({
    // Update: Keep distinction between Boys/Girls by removing only "المسار " prefix but keeping " - بنين/بنات"
    name: track.name.replace('المسار ', ''),
    value: track.overallPerformance,
    fullId: track.id
  }));

  const getBarGradient = (value: number) => {
    if (value < 60) return 'url(#colorLow)';
    if (value < 85) return 'url(#colorMedium)';
    return 'url(#colorHigh)';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              {/* Logo Section - Modified to support wider/larger logos */}
              {appLogo ? (
                <div className="h-12 w-auto flex items-center">
                    <img 
                        src={appLogo} 
                        alt="شعار المدرسة" 
                        className="h-full w-auto object-contain" 
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md overflow-hidden bg-indigo-600 text-white">
                    <School className="w-6 h-6" />
                </div>
              )}
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">مدارس الأندلس</h1>
                <p className="text-xs text-gray-500">لوحة معلومات الأداء - فرع المنار</p>
              </div>
            </div>
            
            {/* Desktop Tabs */}
            <div className="hidden md:flex items-center gap-4">
               <button 
                onClick={() => { setActiveTab('dashboard'); setSelectedTrackId(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
               >
                 نظرة عامة
               </button>
               <button 
                 onClick={() => { setActiveTab('admin'); }}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'admin' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:text-gray-900'}`}
               >
                 <Settings className="w-4 h-4" />
                 <span>الإدارة</span>
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {activeTab === 'admin' ? 'لوحة تحكم المشرف' : selectedTrackId ? currentTrack?.name : 'لوحة القيادة الرئيسية'}
                </h2>
                <p className="text-gray-500 max-w-3xl">
                    {activeTab === 'admin'
                      ? 'تحديث البيانات والمؤشرات، وتخصيص هوية التطبيق.'
                      : 'نؤمن أن التعلم ثقافة تطورنا ونضمن بها استمرارية نجاحنا.'}
                </p>
            </div>
            
            {/* Last Updated Badge - Visible mainly on Dashboard */}
            {activeTab === 'dashboard' && !selectedTrackId && (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />
                    <span>آخر تحديث: <span className="font-semibold text-gray-700">{lastUpdated}</span></span>
                </div>
            )}
        </div>

        {activeTab === 'admin' ? (
          <AdminPanel 
            data={schoolData} 
            onUpdate={handleUpdateData} 
            logo={appLogo}
            onUpdateLogo={handleUpdateLogo}
          />
        ) : (
          <div className="space-y-8">
            {/* Top Level Stats / Chart */}
            {!selectedTrackId && (
              <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>
                
                <div className="flex justify-between items-center mb-8 mt-2">
                    <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 shadow-sm">
                            <PieChart className="w-6 h-6"/>
                        </div>
                        مقارنة الأداء العام للمسارات
                    </h3>
                </div>
                
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={performanceData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: isMobile ? 60 : 5 }}
                    >
                      <defs>
                        <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0.4}/>
                        </linearGradient>
                        <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#eab308" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#eab308" stopOpacity={0.4}/>
                        </linearGradient>
                        <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9}/>
                          <stop offset="100%" stopColor="#ef4444" stopOpacity={0.4}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={isMobile ? <CustomXAxisTick /> : {fill: '#64748b', fontSize: 12, fontWeight: 600, fontFamily: 'Tajawal'}} 
                        interval={0} 
                        dy={10}
                        height={isMobile ? 70 : 30}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12}} 
                        domain={[0, 100]} 
                        dx={-10}
                      />
                      <Tooltip 
                        cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                        contentStyle={{
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            padding: '12px 16px',
                            fontFamily: 'Tajawal, sans-serif'
                        }}
                        itemStyle={{color: '#1e293b', fontWeight: 700}}
                        formatter={(value: number) => [`${value}%`, 'الأداء العام']}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[12, 12, 4, 4]} 
                        barSize={isMobile ? 32 : 50} 
                        animationDuration={1500}
                        animationBegin={200}
                        onClick={(data) => setSelectedTrackId(data.fullId)} 
                        className="cursor-pointer filter hover:brightness-105 transition-all"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBarGradient(entry.value)} strokeWidth={0} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium text-gray-500 bg-gray-50/50 p-4 rounded-xl border border-gray-100 mx-auto max-w-2xl">
                     <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-100"></span>
                         <span>متميز (85%+)</span>
                     </div>
                     <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-yellow-500 ring-2 ring-yellow-100"></span>
                         <span>متوسط (60%-84%)</span>
                     </div>
                     <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-100"></span>
                         <span>يحتاج تحسين (أقل من 60%)</span>
                     </div>
                     <p className="text-xs text-center text-gray-400 w-full mt-2">* اضغط على العمود لعرض التفاصيل الكاملة للمسار</p>
                </div>
              </div>
            )}

            {/* Track Selection Cards (Visible if no track selected) */}
            {!selectedTrackId && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {schoolData.map((track, index) => {
                   // Alternate colored strip position: Right for even (Start in RTL), Left for odd (End in RTL)
                   // Assuming 2-column grid in standard flow
                   const isEven = index % 2 === 0;
                   const statusColorClass = track.overallPerformance < 60 ? 'bg-red-500' : track.overallPerformance < 85 ? 'bg-yellow-500' : 'bg-emerald-500';
                   const statusTextClass = track.overallPerformance < 60 ? 'text-red-600' : track.overallPerformance < 85 ? 'text-yellow-600' : 'text-emerald-600';
                   const statusBgSoft = track.overallPerformance < 60 ? 'bg-red-50 text-red-600' : track.overallPerformance < 85 ? 'bg-yellow-50 text-yellow-600' : 'bg-emerald-50 text-emerald-600';

                   return (
                     <button
                       key={track.id}
                       onClick={() => setSelectedTrackId(track.id)}
                       className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group overflow-hidden flex flex-col justify-between min-h-[160px]"
                     >
                       {/* Colored Strip */}
                       <div className={`absolute top-0 bottom-0 w-1.5 ${isEven ? 'right-0' : 'left-0'} ${statusColorClass}`}></div>
                       
                       <div className="flex justify-between items-start w-full mb-4">
                         {/* Icon - Right aligned in RTL */}
                         <div className={`p-3 rounded-2xl ${statusBgSoft}`}>
                           <Users className="w-6 h-6" />
                         </div>
                         
                         {/* Percentage - Left aligned in RTL */}
                         <div className={`text-4xl font-bold tracking-tight ${statusTextClass}`}>
                           {track.overallPerformance}<span className="text-xl align-top text-gray-400">%</span>
                         </div>
                       </div>
                       
                       <div className="w-full text-right mt-auto">
                         <h3 className="font-bold text-gray-900 text-xl group-hover:text-indigo-600 transition-colors">{track.name}</h3>
                         <p className="text-sm text-gray-400 mt-1">نسبة التحقق من المستهدفات</p>
                       </div>
                     </button>
                   );
                 })}
               </div>
            )}

            {/* Detailed View for Selected Track */}
            {selectedTrackId && currentTrack && (
              <div className="animate-fade-in-up">
                <button 
                  onClick={() => setSelectedTrackId(null)}
                  className="mb-6 px-4 py-2 bg-white hover:bg-gray-50 text-indigo-600 hover:text-indigo-700 font-bold rounded-xl shadow-sm border border-gray-200 flex items-center gap-2 transition-all"
                >
                  <span>←</span>
                  <span>العودة للقائمة الرئيسية</span>
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentTrack.kpis.map((kpi) => (
                    <KpiCard key={kpi.id} kpi={kpi} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Mobile Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-safe z-50">
          <div className="flex justify-around p-3">
              <button 
                onClick={() => { setActiveTab('dashboard'); setSelectedTrackId(null); }}
                className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-gray-400'}`}
              >
                  <LayoutDashboard className="w-6 h-6" />
                  <span className="text-xs">الرئيسية</span>
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`flex flex-col items-center gap-1 ${activeTab === 'admin' ? 'text-indigo-600' : 'text-gray-400'}`}
              >
                  <Settings className="w-6 h-6" />
                  <span className="text-xs">الإدارة</span>
              </button>
          </div>
      </div>
    </div>
  );
}

export default App;