
import React from 'react';
import { CHAPTERS } from '../constants';

const ProgressView: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-right pb-24">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-800">خريطة القوة المعرفية 🗺️</h2>
          <p className="text-slate-500 font-bold text-lg">هذا هو تمثيلك الرقمي للرياضيات، يا بطل!</p>
        </div>
      </header>

      {/* Mastery Heatmap Grid */}
      <section className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
        <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-3">
           <span className="text-indigo-600">🌡️</span> خريطة الحرارة للإتقان
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
           {CHAPTERS.map(ch => (
             <div key={ch.id} className="relative group">
                <div className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center p-4 transition-all duration-500 hover:scale-105 border-4 ${ch.masteryLevel! > 70 ? 'bg-emerald-50 border-emerald-100' : ch.masteryLevel! > 30 ? 'bg-amber-50 border-amber-100' : 'bg-rose-50 border-rose-100'}`}>
                   <span className="text-4xl mb-2">{ch.icon}</span>
                   <div className="w-full bg-black/5 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${ch.masteryLevel! > 70 ? 'bg-emerald-500' : ch.masteryLevel! > 30 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${ch.masteryLevel}%` }}></div>
                   </div>
                   <span className="text-[10px] font-black mt-2 text-slate-400">المقطع {ch.segmentNumber}</span>
                </div>
                {/* Tooltip on hover */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                   إتقان بنسبة {ch.masteryLevel}%
                </div>
             </div>
           ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Achievements */}
         <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <h3 className="text-2xl font-black mb-8">خزانة الأوسمة (Achievements) 🏆</h3>
            <div className="grid grid-cols-3 gap-6">
               {[
                 { icon: '🥇', label: 'أول 1000 XP', active: true },
                 { icon: '📐', label: 'خبير طالس', active: true },
                 { icon: '⚡', label: 'سريع الحل', active: false },
                 { icon: '🤖', label: 'صديق ذكي', active: true },
                 { icon: '📈', label: 'متطور دائماً', active: false },
                 { icon: '🎓', label: 'جاهز للبيام', active: false },
               ].map((a, i) => (
                 <div key={i} className={`flex flex-col items-center text-center space-y-2 p-4 rounded-3xl border ${a.active ? 'bg-white/10 border-white/20' : 'bg-black/20 border-white/5 opacity-30 grayscale'}`}>
                    <span className="text-3xl">{a.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{a.label}</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Knowledge Stats */}
         <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-100">
            <h3 className="text-2xl font-black text-slate-800 mb-8">إحصائيات "البيام" الذكية</h3>
            <div className="space-y-6">
               {[
                 { label: 'الأنشطة العددية', val: 85, color: 'bg-blue-500' },
                 { label: 'الأنشطة الهندسية', val: 42, color: 'bg-emerald-500' },
                 { label: 'تنظيم المعطيات', val: 15, color: 'bg-amber-500' },
               ].map((s, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between font-black text-xs">
                       <span className="text-slate-400 uppercase tracking-widest">{s.label}</span>
                       <span className="text-slate-800">{s.val}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                       <div className={`${s.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${s.val}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-10 p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100">
               <p className="text-indigo-800 text-sm font-bold leading-loose">
                  🚀 <span className="font-black">نصيحة المنصة:</span> أنت متأخر قليلاً في الهندسة (طالس والزوايا). خصص لها 30 دقيقة غداً مع الأستاذ ذكي!
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProgressView;
