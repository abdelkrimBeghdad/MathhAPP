
import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { AppView, Chapter } from '../types';

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

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">أهلاً بك يا بطل! 👋</h2>
          <p className="text-slate-500 mt-2 text-lg">أنت اليوم أقرب خطوة لشهادة التعليم المتوسط.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100 text-center">
            <span className="block text-2xl font-bold text-indigo-600">85%</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">تقدم المنهاج</span>
          </div>
          <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100 text-center">
            <span className="block text-2xl font-bold text-emerald-500">12</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">تمارين اليوم</span>
          </div>
        </div>
      </header>

      {/* Main Action */}
      <section 
        onClick={() => setView(AppView.CHAT)}
        className="math-gradient p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center gap-8 cursor-pointer hover:scale-[1.01] transition-transform duration-300 shadow-2xl shadow-indigo-200 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="text-6xl animate-bounce">🤖</div>
        <div className="flex-1 text-center md:text-right relative z-10">
          <h3 className="text-2xl font-bold mb-2">الأستاذ ذكي في انتظارك!</h3>
          <p className="text-indigo-100 mb-6 text-lg">هل تواجه صعوبة في حل تمرين؟ صور التمرين الآن وسيقوم الأستاذ بشرحه لك خطوة بخطوة.</p>
          <button className="bg-white text-indigo-600 px-10 py-3 rounded-2xl font-bold hover:shadow-xl transition-all hover:-translate-y-1">ابدأ المحادثة الآن</button>
        </div>
      </section>

      {/* Chapters Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            📂 وحدات المنهاج الدراسي
          </h3>
          <button 
            onClick={() => setView(AppView.FORMULAS)} 
            className="text-indigo-600 font-bold hover:underline text-sm"
          >
            عرض القوانين
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <div 
                key={chapter.id}
                onClick={() => onSelectChapter(chapter)}
                className={`bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm transition-all duration-300 group cursor-pointer border-b-4 hover:border-b-indigo-500 card-hover`}
              >
                <div className={`${chapter.color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:rotate-6 transition-transform`}>
                  {chapter.icon}
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-2">{chapter.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{chapter.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                        <img src={`https://picsum.photos/32/32?random=${chapter.id + i}`} alt="Student" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">+12</div>
                  </div>
                  <div className="text-indigo-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    تصفح الدرس 📖
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
