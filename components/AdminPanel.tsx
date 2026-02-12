import React, { useState, useMemo } from 'react';
import { TrackData, KPI } from '../types';
import * as XLSX from 'xlsx';
import { 
  Save, Plus, Trash2, Edit2, Lock, X, LogIn, 
  Search, SortAsc, SortDesc, FileSpreadsheet, Printer, 
  CheckCircle2, AlertTriangle, FileText, Upload, Image as ImageIcon
} from 'lucide-react';

interface AdminPanelProps {
  data: TrackData[];
  onUpdate: (newData: TrackData[]) => void;
  logo: string | null;
  onUpdateLogo: (logo: string | null) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ data, onUpdate, logo, onUpdateLogo }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showHint, setShowHint] = useState(true);
  
  // UI State
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TrackData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'performance', direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  // Authentication Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      showNotification('تم تسجيل الدخول بنجاح', 'success');
    } else {
      showNotification('كلمة المرور غير صحيحة', 'error');
    }
  };

  // Notification Handler
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Logo Upload Handler
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) { // 2MB limit check
        showNotification('حجم الصورة كبير جداً. يرجى اختيار صورة أقل من 2 ميجابايت', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdateLogo(e.target?.result as string);
        showNotification('تم تحديث الشعار بنجاح', 'success');
      };
      reader.onerror = () => {
        showNotification('حدث خطأ أثناء رفع الصورة', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  // Export to Excel
  const handleDownloadExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      
      // Sheet 1: Summary
      const summaryData = data.map(t => ({
        "المسار": t.name,
        "الأداء العام": `${t.overallPerformance}%`,
        "عدد المؤشرات": t.kpis.length
      }));
      const summaryWs = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summaryWs, "ملخص المسارات");

      // Sheet 2: Detailed KPIs
      const detailsData = data.flatMap(t => t.kpis.map(k => ({
        "المسار": t.name,
        "المؤشر": k.name,
        "المستهدف": k.target,
        "الفعلي": k.actual,
        "الوحدة": k.unit,
        "نسبة التحقق": `${k.achievementPercentage}%`,
        "الحالة": k.achievementPercentage < 60 ? 'خطر' : k.achievementPercentage < 85 ? 'تحذير' : 'جيد',
        "المسؤول": k.responsible || ''
      })));
      const detailsWs = XLSX.utils.json_to_sheet(detailsData);
      XLSX.utils.book_append_sheet(wb, detailsWs, "تفاصيل المؤشرات");

      XLSX.writeFile(wb, "تقرير_أداء_مدارس_الأندلس.xlsx");
      showNotification('تم تحميل تقرير Excel بنجاح', 'success');
    } catch (error) {
      console.error(error);
      showNotification('حدث خطأ أثناء تصدير الملف', 'error');
    }
  };

  // Print / PDF Handler
  const handlePrint = () => {
    window.print();
  };

  // CRUD Operations
  const startEditing = (track: TrackData) => {
    setEditingTrackId(track.id);
    setEditForm(JSON.parse(JSON.stringify(track)));
  };

  const cancelEditing = () => {
    setEditingTrackId(null);
    setEditForm(null);
  };

  const saveTrack = () => {
    if (!editForm) return;
    const newData = data.map(t => t.id === editForm.id ? editForm : t);
    onUpdate(newData);
    setEditingTrackId(null);
    setEditForm(null);
    showNotification('تم حفظ التغييرات بنجاح', 'success');
  };

  const deleteTrack = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المسار وجميع مؤشراته؟')) {
      onUpdate(data.filter(t => t.id !== id));
      showNotification('تم حذف المسار بنجاح', 'success');
    }
  };

  const addTrack = () => {
    const newTrack: TrackData = {
      id: `track-${Date.now()}`,
      name: 'مسار جديد',
      overallPerformance: 0,
      kpis: []
    };
    onUpdate([...data, newTrack]);
    startEditing(newTrack);
  };

  const updateKpi = (kpiId: string, field: keyof KPI, value: any) => {
    if (!editForm) return;
    const updatedKpis = editForm.kpis.map(k => 
      k.id === kpiId ? { ...k, [field]: value } : k
    );
    setEditForm({ ...editForm, kpis: updatedKpis });
  };

  const addKpi = () => {
    if (!editForm) return;
    const newKpi: KPI = {
      id: `kpi-${Date.now()}`,
      name: 'مؤشر جديد',
      target: 100,
      actual: 0,
      achievementPercentage: 0,
      unit: '%',
      responsible: ''
    };
    setEditForm({ ...editForm, kpis: [...editForm.kpis, newKpi] });
  };

  const removeKpi = (kpiId: string) => {
    if (!editForm) return;
    if (window.confirm('حذف المؤشر؟')) {
        setEditForm({ ...editForm, kpis: editForm.kpis.filter(k => k.id !== kpiId) });
    }
  };

  // Derived Data (Sorting & Filtering)
  const processedData = useMemo(() => {
    let filtered = data.filter(track => 
      track.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortConfig.key === 'performance') {
        return sortConfig.direction === 'asc' 
          ? a.overallPerformance - b.overallPerformance 
          : b.overallPerformance - a.overallPerformance;
      } else {
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });
  }, [data, searchTerm, sortConfig]);

  const toggleSort = (key: 'name' | 'performance') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
        {notification && (
            <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 z-50 ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5"/> : <AlertTriangle className="w-5 h-5"/>}
                {notification.message}
            </div>
        )}
        <div className="bg-white p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 w-full max-w-[480px] text-center relative overflow-hidden">
          
          <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Lock className="w-9 h-9 text-indigo-600 stroke-[1.5]" />
          </div>
          
          <h2 className="text-2xl font-extrabold mb-3 text-slate-800">تسجيل دخول المشرف</h2>
          <p className="text-gray-400 mb-8 font-medium">يرجى إدخال كلمة المرور للوصول إلى لوحة التحكم</p>
          
          <form onSubmit={handleLogin} className="space-y-4 mb-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-xl bg-[#333] text-white placeholder-gray-500 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-center tracking-widest text-lg shadow-inner"
            />
            <button
              type="submit"
              className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold py-4 rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 transform active:scale-[0.98]"
            >
              <LogIn className="w-5 h-5" />
              <span>دخول</span>
            </button>
          </form>
          
          {showHint && (
              <div className="animate-fade-in">
                 <div className="border-2 border-dashed border-indigo-200 rounded-lg py-3 px-4 text-xs font-semibold text-gray-400 mb-2 select-all">
                    (كلمة المرور التجريبية: admin123)
                 </div>
                 <button 
                    onClick={() => setShowHint(false)}
                    className="text-indigo-400 hover:text-indigo-600 text-xs font-medium transition-colors"
                 >
                    احذفها من الصفحة
                 </button>
              </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-xl text-white font-bold flex items-center gap-3 z-50 animate-bounce-in ${notification.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5"/> : <AlertTriangle className="w-5 h-5"/>}
            {notification.message}
        </div>
      )}

      {/* General Settings Section (Logo Upload) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-2 no-print">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            تخصيص الهوية
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group shrink-0">
                {logo ? (
                    <img src={logo} alt="School Logo" className="w-full h-full object-contain p-2" />
                ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
            </div>
            <div className="flex-1 w-full text-center sm:text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">شعار المدرسة</label>
                <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>رفع صورة جديدة</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </label>
                    {logo && (
                        <button 
                            onClick={() => {
                                if(window.confirm('هل أنت متأكد من حذف الشعار؟')) {
                                    onUpdateLogo(null);
                                    showNotification('تم حذف الشعار', 'success');
                                }
                            }}
                            className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            حذف الشعار
                        </button>
                    )}
                </div>
                <p className="text-xs text-gray-400 mt-2">يفضل استخدام صورة شفافة (PNG) بحجم لا يتجاوز 2MB</p>
            </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 no-print">
        <div className="flex items-center gap-2 w-full md:w-auto">
             <div className="relative w-full md:w-64">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="بحث عن مسار..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
             </div>
             <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => toggleSort('name')}
                    className={`p-2 rounded-md transition-colors ${sortConfig.key === 'name' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    title="ترتيب حسب الاسم"
                >
                    {sortConfig.key === 'name' && sortConfig.direction === 'desc' ? <SortDesc className="w-4 h-4"/> : <SortAsc className="w-4 h-4"/>}
                </button>
                <button 
                    onClick={() => toggleSort('performance')}
                    className={`p-2 rounded-md transition-colors ${sortConfig.key === 'performance' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    title="ترتيب حسب الأداء"
                >
                    <CheckCircle2 className="w-4 h-4"/>
                </button>
             </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
             <button
              onClick={handleDownloadExcel}
              className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>تصدير Excel</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / PDF</span>
            </button>
            <button
              onClick={addTrack}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مسار</span>
            </button>
        </div>
      </div>

      {/* Data List */}
      <div className="grid gap-6 print:block">
        {processedData.map((track) => (
          <div key={track.id} className={`bg-white rounded-xl shadow-sm border transition-all mb-6 print:shadow-none print:border-gray-300 ${editingTrackId === track.id ? 'border-indigo-500 ring-2 ring-indigo-50 ring-opacity-50' : 'border-gray-200'}`}>
            
            {/* View Mode */}
            {editingTrackId !== track.id ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                    <h3 className="text-lg font-bold text-gray-900">{track.name}</h3>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <span className={`inline-block w-2 h-2 rounded-full print-color-adjust ${track.overallPerformance >= 85 ? 'bg-emerald-500' : track.overallPerformance >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                        الأداء العام: <span className="font-semibold">{track.overallPerformance}%</span>
                    </div>
                    </div>
                    <div className="flex gap-2 no-print">
                    <button
                        onClick={() => startEditing(track)}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="تعديل"
                    >
                        <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => deleteTrack(track.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    </div>
                </div>

                {/* KPIs Summary for View Mode / Print Mode */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-right">
                        <thead className="bg-gray-50 text-gray-600 font-medium">
                            <tr>
                                <th className="px-4 py-2 rounded-r-lg">المؤشر</th>
                                <th className="px-4 py-2">المسؤول</th>
                                <th className="px-4 py-2">المستهدف</th>
                                <th className="px-4 py-2">الفعلي</th>
                                <th className="px-4 py-2 rounded-l-lg">نسبة التحقق</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {track.kpis.map(kpi => (
                                <tr key={kpi.id}>
                                    <td className="px-4 py-2 font-medium text-gray-800">{kpi.name}</td>
                                    <td className="px-4 py-2 text-gray-500">{kpi.responsible || '-'}</td>
                                    <td className="px-4 py-2 text-gray-500">{kpi.target} {kpi.unit}</td>
                                    <td className="px-4 py-2 text-gray-500">{kpi.actual} {kpi.unit}</td>
                                    <td className="px-4 py-2">
                                        <span className={`font-bold ${kpi.achievementPercentage < 60 ? 'text-red-600' : kpi.achievementPercentage < 85 ? 'text-yellow-600' : 'text-emerald-600'}`}>
                                            {kpi.achievementPercentage}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            ) : (
              /* Edit Mode Form */
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-indigo-600 font-bold border-b border-indigo-100 pb-2">
                    <Edit2 className="w-5 h-5" />
                    تحرير: {track.name}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اسم المسار</label>
                    <input
                      type="text"
                      value={editForm?.name}
                      onChange={(e) => setEditForm(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow bg-white text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الأداء العام (%)</label>
                    <input
                      type="number"
                      value={editForm?.overallPerformance}
                      onChange={(e) => setEditForm(prev => prev ? ({ ...prev, overallPerformance: parseFloat(e.target.value) }) : null)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        المؤشرات (KPIs)
                    </h4>
                    <button
                      onClick={addKpi}
                      className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors font-medium"
                    >
                      <Plus className="w-3 h-3" />
                      إضافة مؤشر
                    </button>
                  </div>
                  
                  <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    {editForm?.kpis.map((kpi, idx) => (
                      <div key={kpi.id} className="bg-white p-4 rounded-lg border border-gray-200 relative group hover:shadow-sm transition-all">
                        <button
                          onClick={() => removeKpi(kpi.id)}
                          className="absolute top-2 left-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                          <div className="md:col-span-3">
                            <label className="text-xs text-gray-500 block mb-1">اسم المؤشر</label>
                            <input
                              type="text"
                              value={kpi.name}
                              onChange={(e) => updateKpi(kpi.id, 'name', e.target.value)}
                              className="w-full p-1.5 text-sm border border-gray-200 rounded focus:border-indigo-500 outline-none bg-white text-gray-900"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <label className="text-xs text-gray-500 block mb-1">المسؤول</label>
                            <input
                              type="text"
                              value={kpi.responsible || ''}
                              onChange={(e) => updateKpi(kpi.id, 'responsible', e.target.value)}
                              className="w-full p-1.5 text-sm border border-gray-200 rounded focus:border-indigo-500 outline-none bg-white text-gray-900"
                            />
                          </div>
                          <div className="md:col-span-1">
                             <label className="text-xs text-gray-500 block mb-1">الهدف</label>
                             <input
                              type="number"
                              value={kpi.target}
                              onChange={(e) => updateKpi(kpi.id, 'target', parseFloat(e.target.value))}
                              className="w-full p-1.5 text-sm border border-gray-200 rounded focus:border-indigo-500 outline-none bg-white text-gray-900"
                            />
                          </div>
                          <div className="md:col-span-1">
                             <label className="text-xs text-gray-500 block mb-1">الفعلي</label>
                             <input
                              type="number"
                              value={kpi.actual}
                              onChange={(e) => updateKpi(kpi.id, 'actual', parseFloat(e.target.value))}
                              className="w-full p-1.5 text-sm border border-gray-200 rounded focus:border-indigo-500 outline-none bg-white text-gray-900"
                            />
                          </div>
                          <div className="md:col-span-2">
                             <label className="text-xs text-gray-500 block mb-1">الوحدة</label>
                             <select
                               value={kpi.unit}
                               onChange={(e) => updateKpi(kpi.id, 'unit', e.target.value)}
                               className="w-full p-1.5 text-sm border border-gray-200 rounded focus:border-indigo-500 outline-none bg-white text-gray-900"
                             >
                                <option value="%">%</option>
                                <option value="#">عدد (#)</option>
                                <option value="$">عملة ($)</option>
                             </select>
                          </div>
                          <div className="md:col-span-2">
                             <label className="text-xs text-gray-500 block mb-1">التحقق %</label>
                             <input
                              type="number"
                              value={kpi.achievementPercentage}
                              onChange={(e) => updateKpi(kpi.id, 'achievementPercentage', parseFloat(e.target.value))}
                              className={`w-full p-1.5 text-sm border border-gray-200 rounded focus:border-indigo-500 outline-none font-bold bg-white ${kpi.achievementPercentage < 60 ? 'text-red-600' : 'text-emerald-600'}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {editForm?.kpis.length === 0 && (
                        <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                            <FileText className="w-8 h-8 mx-auto mb-2 opacity-50"/>
                            لا توجد مؤشرات مضافة
                        </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={saveTrack}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-sm transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {processedData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
                لا توجد نتائج مطابقة للبحث
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;