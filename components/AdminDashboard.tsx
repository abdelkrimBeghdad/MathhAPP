
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Chapter, LessonContent, VisualizationType } from '../types';

const AdminDashboard: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  
  // Chapter Form State
  const [newChapter, setNewChapter] = useState({
    id: '',
    title: '',
    icon: '📚',
    description: '',
    color: 'bg-indigo-500'
  });

  // Lesson Form State
  const [newLesson, setNewLesson] = useState<LessonContent>({
    subtitle: '',
    explanation: '',
    visualization: undefined,
    example: { problem: '', solution: '' }
  });

  useEffect(() => {
    loadChapters();
  }, []);

  const loadChapters = async () => {
    const data = await apiService.getChapters();
    setChapters(data);
  };

  const handleCreateChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiService.createChapter(newChapter);
    setIsAddingChapter(false);
    loadChapters();
    alert('تمت إضافة الوحدة بنجاح (محاكاة)');
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapterId) return;
    await apiService.addLesson(selectedChapterId, newLesson);
    setSelectedChapterId(null);
    setNewLesson({ subtitle: '', explanation: '', example: { problem: '', solution: '' } });
    alert('تمت إضافة الدرس بنجاح (محاكاة)');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right">
      <header className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-800">لوحة تحكم الإدارة 🔐</h2>
          <p className="text-slate-500 text-sm">إدارة المحتوى التعليمي والدروس</p>
        </div>
        <button 
          onClick={() => setIsAddingChapter(true)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          + إضافة وحدة جديدة
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chapters List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-lg text-slate-700 px-2">الوحدات الحالية</h3>
          <div className="space-y-3">
            {chapters.map(ch => (
              <div 
                key={ch.id} 
                className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer ${selectedChapterId === ch.id ? 'border-indigo-500 ring-2 ring-indigo-50' : 'border-slate-100'}`}
                onClick={() => setSelectedChapterId(ch.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{ch.title}</h4>
                    <p className="text-xs text-slate-400">{ch.detailedContent?.length || 0} دروس</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Area */}
        <div className="lg:col-span-2">
          {isAddingChapter ? (
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
              <h3 className="text-xl font-black mb-6">إضافة وحدة دراسية جديدة</h3>
              <form onSubmit={handleCreateChapter} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">المعرف (ID)</label>
                    <input 
                      type="text" required
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="مثال: geometry"
                      value={newChapter.id}
                      onChange={e => setNewChapter({...newChapter, id: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">العنوان</label>
                    <input 
                      type="text" required
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="عنوان الوحدة"
                      value={newChapter.title}
                      onChange={e => setNewChapter({...newChapter, title: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">الوصف</label>
                  <textarea 
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none h-24"
                    placeholder="وصف مختصر للوحدة..."
                    value={newChapter.description}
                    onChange={e => setNewChapter({...newChapter, description: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                   <button type="submit" className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold">حفظ الوحدة</button>
                   <button type="button" onClick={() => setIsAddingChapter(false)} className="px-6 py-3 bg-slate-100 rounded-xl font-bold">إلغاء</button>
                </div>
              </form>
            </div>
          ) : selectedChapterId ? (
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
              <h3 className="text-xl font-black mb-6">إضافة درس لـ: {chapters.find(c => c.id === selectedChapterId)?.title}</h3>
              <form onSubmit={handleAddLesson} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">عنوان الدرس</label>
                  <input 
                    type="text" required
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="مثال: خاصية فيثاغورس"
                    value={newLesson.subtitle}
                    onChange={e => setNewLesson({...newLesson, subtitle: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-1">الشرح (يدعم MathText)</label>
                  <textarea 
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none h-32"
                    placeholder="اكتب الشرح هنا... استخدم √ للجذور و / للكسور"
                    value={newLesson.explanation}
                    onChange={e => setNewLesson({...newLesson, explanation: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-bold text-slate-600 mb-1">مثال تطبيقي (سؤال)</label>
                      <input 
                        type="text"
                        className="w-full p-3 rounded-xl border border-slate-200 outline-none"
                        value={newLesson.example?.problem}
                        onChange={e => setNewLesson({...newLesson, example: {...newLesson.example!, problem: e.target.value}})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-600 mb-1">الحل النموذجي</label>
                      <input 
                        type="text"
                        className="w-full p-3 rounded-xl border border-slate-200 outline-none"
                        value={newLesson.example?.solution}
                        onChange={e => setNewLesson({...newLesson, example: {...newLesson.example!, solution: e.target.value}})}
                      />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-600 mb-1">نوع التوضيح البصري (اختياري)</label>
                   <select 
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none"
                    onChange={e => setNewLesson({...newLesson, visualization: e.target.value as VisualizationType || undefined})}
                   >
                      <option value="">بدون توضيح</option>
                      <option value="THALES">طالس</option>
                      <option value="TRIGONOMETRY">المثلثات</option>
                      <option value="COORDINATES">المعالم</option>
                   </select>
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors">إضافة الدرس للمنهاج ✅</button>
              </form>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400">
               <span className="text-6xl mb-4">👈</span>
               <p className="font-bold">اختر وحدة دراسية من القائمة لإضافة دروس إليها</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
