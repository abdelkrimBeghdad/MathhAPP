
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Chapter, Student, YearOfStudy, Exercise, LessonContent, MathField } from '../types';
import { FIELD_LABELS } from '../constants';

enum AdminTab {
  OVERVIEW = 'OVERVIEW',
  CURRICULUM = 'CURRICULUM',
  STUDENTS = 'STUDENTS',
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>(AdminTab.OVERVIEW);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  
  // Lesson Management
  const [selectedField, setSelectedField] = useState<MathField>('NUMERICAL');
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('');
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [newLesson, setNewLesson] = useState<Partial<LessonContent>>({
    subtitle: '',
    explanation: '',
    example: { problem: '', solution: '' }
  });

  useEffect(() => {
    const loadData = async () => {
      const chaps = await apiService.getChapters();
      setChapters(chaps);
      const savedStudents = localStorage.getItem('mathdz_students_db');
      if (savedStudents) setStudents(JSON.parse(savedStudents));
    };
    loadData();
  }, []);

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSegmentId) return;

    const updatedChapters = chapters.map(ch => {
      if (ch.id === selectedSegmentId) {
        const lesson: LessonContent = { 
          ...newLesson as LessonContent, 
          id: `les_${Date.now()}` 
        };
        return {
          ...ch,
          detailedContent: [...ch.detailedContent, lesson]
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    localStorage.setItem('mathdz_chapters_db', JSON.stringify(updatedChapters));
    setIsAddingLesson(false);
    setNewLesson({ subtitle: '', explanation: '', example: { problem: '', solution: '' } });
    alert("✅ تم بنجاح إضافة المورد المعرفي الجديد!");
  };

  const deleteLesson = (chapterId: string, lessonId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المورد المعرفي؟')) return;
    const updated = chapters.map(ch => {
      if (ch.id === chapterId) {
        return { ...ch, detailedContent: ch.detailedContent.filter(l => l.id !== lessonId) };
      }
      return ch;
    });
    setChapters(updated);
    localStorage.setItem('mathdz_chapters_db', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right pb-24">
      {/* Admin Navbar */}
      <header className="bg-white/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white sticky top-0 z-50 flex flex-wrap justify-between items-center gap-6">
         <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">DZ</div>
            <div>
               <h2 className="text-2xl font-black text-slate-800">إدارة الأستاذ ذكي</h2>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">تحكم كامل بالمنهاج الدراسي</p>
            </div>
         </div>
         <nav className="flex gap-2">
            {[
              { id: AdminTab.OVERVIEW, label: 'الإحصائيات', icon: '📊' },
              { id: AdminTab.CURRICULUM, label: 'إدارة المنهاج', icon: '📚' },
              { id: AdminTab.STUDENTS, label: 'قاعدة التلاميذ', icon: '👨‍🎓' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-2xl font-black text-sm transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
         </nav>
      </header>

      {activeTab === AdminTab.OVERVIEW && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border-r-8 border-indigo-500 hover:scale-[1.02] transition-transform">
              <p className="text-slate-400 font-black text-[10px] uppercase mb-2">إجمالي المسجلين</p>
              <h3 className="text-5xl font-black text-slate-800">{students.length}</h3>
           </div>
           <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border-r-8 border-emerald-500 hover:scale-[1.02] transition-transform">
              <p className="text-slate-400 font-black text-[10px] uppercase mb-2">المقاطع الرسمية</p>
              <h3 className="text-5xl font-black text-slate-800">7/7</h3>
           </div>
           <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border-r-8 border-rose-500 hover:scale-[1.02] transition-transform">
              <p className="text-slate-400 font-black text-[10px] uppercase mb-2">الموارد المضافة</p>
              <h3 className="text-5xl font-black text-slate-800">
                {chapters.reduce((acc, ch) => acc + ch.detailedContent.length, 0)}
              </h3>
           </div>
        </div>
      )}

      {activeTab === AdminTab.CURRICULUM && (
        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500">
           <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                 <h3 className="text-3xl font-black text-slate-800">تحديث الموارد المعرفية 📖</h3>
                 <p className="text-slate-500 font-bold mt-2">نظم المنهاج الدراسي حسب التدرج السنوي 2024-2025.</p>
              </div>
              <button 
                onClick={() => setIsAddingLesson(true)}
                className="bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-3"
              >
                <span className="text-2xl">+</span>
                <span>إضافة مورد معرفي جديد</span>
              </button>
           </div>

           {isAddingLesson && (
             <div className="bg-white p-12 rounded-[4rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-indigo-50 animate-in zoom-in-95">
                <form onSubmit={handleAddLesson} className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-3">
                         <label className="text-sm font-black text-slate-600 mr-2">1. اختيار الميدان الدراسي</label>
                         <select 
                           className="w-full p-5 bg-slate-50 rounded-3xl outline-none font-bold text-slate-800 border-2 border-transparent focus:border-indigo-200 focus:bg-white transition-all"
                           value={selectedField}
                           onChange={e => {
                             setSelectedField(e.target.value as MathField);
                             setSelectedSegmentId('');
                           }}
                         >
                            {Object.entries(FIELD_LABELS).map(([key, label]) => (
                              <option key={key} value={key}>{label}</option>
                            ))}
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-sm font-black text-slate-600 mr-2">2. اختيار المقطع (1-7)</label>
                         <select 
                           required 
                           className="w-full p-5 bg-slate-50 rounded-3xl outline-none font-bold border-2 border-transparent focus:border-indigo-200 focus:bg-white transition-all"
                           value={selectedSegmentId}
                           onChange={e => setSelectedSegmentId(e.target.value)}
                         >
                            <option value="">-- اختر المقطع الرسمي --</option>
                            {chapters.filter(ch => ch.field === selectedField).sort((a,b) => a.segmentNumber - b.segmentNumber).map(ch => (
                              <option key={ch.id} value={ch.id}>المقطع {ch.segmentNumber}: {ch.title}</option>
                            ))}
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-sm font-black text-slate-600 mr-2">3. اسم المورد المعرفي</label>
                         <input 
                           type="text" 
                           required 
                           placeholder="مثال: تعيين قواسم عدد طبيعي"
                           className="w-full p-5 bg-slate-50 rounded-3xl outline-none font-bold border-2 border-transparent focus:border-indigo-200 focus:bg-white transition-all"
                           value={newLesson.subtitle}
                           onChange={e => setNewLesson({...newLesson, subtitle: e.target.value})}
                         />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-sm font-black text-slate-600 mr-2">شرح المورد (المفاهيم الرياضية)</label>
                      <textarea 
                        required 
                        rows={6} 
                        placeholder="اكتب القواعد والقوانين الرياضية هنا بوضوح..."
                        className="w-full p-8 bg-slate-50 rounded-[3rem] outline-none font-bold leading-loose border-2 border-transparent focus:border-indigo-200 focus:bg-white transition-all"
                        value={newLesson.explanation}
                        onChange={e => setNewLesson({...newLesson, explanation: e.target.value})}
                      />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-10 rounded-[3rem]">
                      <div className="space-y-3">
                         <label className="text-sm font-black text-indigo-700 mr-2">تمرين تطبيقي نموذجي</label>
                         <textarea 
                           className="w-full p-6 bg-white rounded-3xl outline-none font-bold shadow-sm border border-slate-100"
                           placeholder="أوجد PGCD(150, 45) مثلاً..."
                           value={newLesson.example?.problem}
                           onChange={e => setNewLesson({...newLesson, example: {...newLesson.example!, problem: e.target.value}})}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-sm font-black text-emerald-700 mr-2">الحل النموذجي (للتصحيح)</label>
                         <textarea 
                           className="w-full p-6 bg-white rounded-3xl outline-none font-bold shadow-sm border border-slate-100"
                           placeholder="خطوات الحل بالتفصيل..."
                           value={newLesson.example?.solution}
                           onChange={e => setNewLesson({...newLesson, example: {...newLesson.example!, solution: e.target.value}})}
                         />
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <button type="submit" className="flex-1 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all">حفظ ونشر المورد 🚀</button>
                      <button type="button" onClick={() => setIsAddingLesson(false)} className="px-14 py-6 bg-slate-100 text-slate-400 rounded-[2rem] font-black">إلغاء</button>
                   </div>
                </form>
             </div>
           )}

           <div className="space-y-12">
              {['NUMERICAL', 'GEOMETRIC', 'DATA_FUNCTIONS'].map(field => (
                <div key={field} className="bg-white rounded-[4rem] shadow-xl border border-slate-50 overflow-hidden">
                   <div className="p-10 bg-slate-900 text-white flex justify-between items-center">
                      <h3 className="text-2xl font-black">{FIELD_LABELS[field]}</h3>
                      <span className="bg-white/10 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">{chapters.filter(ch => ch.field === field).length} مقاطع</span>
                   </div>
                   <div className="divide-y divide-slate-100">
                      {chapters.filter(ch => ch.field === field).sort((a,b) => a.segmentNumber - b.segmentNumber).map(ch => (
                        <div key={ch.id} className="p-10 hover:bg-slate-50/50 transition-all group">
                           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                              <div className="flex items-center gap-6">
                                 <div className={`w-16 h-16 ${ch.color} text-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-xl`}>
                                    {ch.icon}
                                 </div>
                                 <div>
                                    <h4 className="text-2xl font-black text-slate-800">المقطع {ch.segmentNumber}: {ch.title}</h4>
                                    <p className="text-slate-400 font-bold text-sm mt-1">{ch.description}</p>
                                 </div>
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {ch.detailedContent.map((les) => (
                                <div key={les.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center group/item hover:border-indigo-200 transition-all">
                                   <div className="flex items-center gap-4">
                                      <span className="text-xl">📖</span>
                                      <span className="font-black text-slate-700 text-sm leading-tight">{les.subtitle}</span>
                                   </div>
                                   <button 
                                     onClick={() => deleteLesson(ch.id, les.id!)}
                                     className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center hover:bg-rose-500 hover:text-white"
                                   >
                                      🗑️
                                   </button>
                                </div>
                              ))}
                              {ch.detailedContent.length === 0 && (
                                <p className="col-span-full text-slate-400 italic font-bold py-10 text-center border-4 border-dashed border-slate-50 rounded-[3rem]">هذا المقطع لا يحتوي على موارد حالياً...</p>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === AdminTab.STUDENTS && (
        <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-slate-50">
           <div className="overflow-x-auto">
              <table className="w-full text-right">
                 <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                       <th className="p-8">معلومات التلميذ</th>
                       <th className="p-8">المؤسسة والولاية</th>
                       <th className="p-8 text-center">الرصيد XP</th>
                       <th className="p-8">الحالة</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {students.map(st => (
                      <tr key={st.id} className="hover:bg-slate-50/50 transition-colors">
                         <td className="p-8">
                            <p className="font-black text-slate-800 text-lg">{st.firstName} {st.lastName}</p>
                            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">4AM</span>
                         </td>
                         <td className="p-8">
                            <p className="font-bold text-slate-600">{st.schoolName}</p>
                            <span className="text-xs text-slate-400 font-bold">ولاية رقم {st.wilaya}</span>
                         </td>
                         <td className="p-8 text-center">
                            <span className="font-black text-emerald-600 bg-emerald-50 px-5 py-2 rounded-2xl border border-emerald-100">{st.points} XP</span>
                         </td>
                         <td className="p-8">
                            <div className="flex items-center gap-2">
                               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                               <span className="text-xs font-black text-slate-400">نشط الآن</span>
                            </div>
                         </td>
                      </tr>
                    ))}
                    {students.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-24 text-center text-slate-400 font-black text-lg">لا يوجد تلاميذ مسجلين في النظام حالياً...</td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
