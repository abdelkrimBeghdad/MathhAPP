
import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { AppView, Chapter, MathField } from '../types';
import { FIELD_LABELS } from '../constants';

interface DashboardProps {
  setView: (view: AppView) => void;
  onSelectChapter: (chapter: Chapter) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, onSelectChapter }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await apiService.getChapters();
      setChapters(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const fields: MathField[] = ['NUMERICAL', 'GEOMETRIC', 'DATA_FUNCTIONS'];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-24 px-4 md:px-0">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-[3.5rem] shadow-xl border border-slate-50 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">رحلة التميز في <span className="text-indigo-600">BEM 2024</span></h2>
          <p className="text-slate-500 mt-4 text-lg md:text-xl font-bold max-w-2xl">استكشف 43 مورداً معرفياً مصممة لمساعدتك على نيل شهادة التعليم المتوسط بتفوق.</p>
        </div>
        <div className="flex gap-4 relative z-10">
           <div className="bg-indigo-600 p-6 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-center min-w-[140px] text-white">
              <span className="block text-4xl font-black">43</span>
              <span className="text-[10px] text-white/70 font-black uppercase tracking-widest mt-2 block">مورداً معرفياً</span>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </header>

      <section 
        onClick={() => setView(AppView.CHAT)}
        className="math-gradient p-10 md:p-16 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-12 cursor-pointer hover:scale-[1.01] transition-all duration-700 shadow-3xl shadow-indigo-200 group relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
        <div className="text-8xl md:text-9xl animate-bounce relative z-10">🤖</div>
        <div className="flex-1 text-center md:text-right relative z-10 space-y-6">
          <h3 className="text-3xl md:text-4xl font-black">المعلم "ذكي" بانتظارك!</h3>
          <p className="text-indigo-100 text-lg md:text-xl font-medium leading-loose">
            هل استعصى عليك حل مسألة؟ صور تمرينك الآن وسيقوم الأستاذ بمساعدتك في فهم الخطوات وحلها بذكاء.
          </p>
          <button className="bg-white text-indigo-600 px-14 py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl transition-all group-hover:-translate-y-2">ابدأ الدردشة الآن 💬</button>
        </div>
      </section>

      <div className="space-y-24">
        {fields.map(field => {
          const fieldChapters = chapters.filter(c => c.field === field).sort((a,b) => a.segmentNumber - b.segmentNumber);
          if (fieldChapters.length === 0 && !loading) return null;

          return (
            <section key={field} className="space-y-10">
              <div className="flex items-center gap-6 px-4">
                 <div className="h-14 w-3 bg-indigo-600 rounded-full shadow-lg shadow-indigo-100"></div>
                 <h3 className="text-3xl font-black text-slate-800">{FIELD_LABELS[field]}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {loading ? (
                  [1, 2, 3].map(i => <div key={i} className="h-72 bg-white animate-pulse rounded-[3rem] border border-slate-100"></div>)
                ) : (
                  fieldChapters.map((chapter) => (
                    <div 
                      key={chapter.id}
                      onClick={() => onSelectChapter(chapter)}
                      className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm transition-all duration-500 group cursor-pointer hover:shadow-3xl hover:shadow-indigo-50 border-b-[12px] hover:-translate-y-3 relative overflow-hidden h-full flex flex-col"
                      style={{ borderBottomColor: `var(--tw-bg-opacity, 1) ${chapter.color.replace('bg-', '')}` }}
                    >
                      <div className="flex justify-between items-start mb-10">
                        <div className={`${chapter.color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl shadow-2xl group-hover:rotate-12 transition-transform`}>
                          {chapter.icon}
                        </div>
                        <span className="bg-slate-50 text-slate-400 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-inner">
                          المقطع {chapter.segmentNumber}
                        </span>
                      </div>
                      <h4 className="font-black text-slate-800 text-2xl mb-4 group-hover:text-indigo-600 transition-colors leading-tight">{chapter.title}</h4>
                      <p className="text-slate-500 text-base leading-relaxed font-bold mb-8 line-clamp-2">{chapter.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                           <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                           <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">{chapter.detailedContent.length} موارد متاحة</span>
                        </div>
                        <div className="text-indigo-600 font-black text-sm opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">تصفح ⬅️</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
