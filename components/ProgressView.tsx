
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell
} from 'recharts';

const chapterData = [
  { name: 'PGCD', score: 85, color: '#4f46e5' },
  { name: 'الجذور', score: 70, color: '#7c3aed' },
  { name: 'طالس', score: 92, color: '#10b981' },
];

const ProgressView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-800">تحليل الأداء الذكي 📊</h2>
          <p className="text-slate-500 font-bold text-lg">أنت تقوم بعمل رائع! إليك كيف يراك الأستاذ ذكي.</p>
        </div>
        <button className="bg-white px-8 py-4 rounded-2xl shadow-xl border border-slate-100 font-black text-indigo-600 hover:bg-indigo-50 transition-all">
          تحميل تقرير التفوق PDF 📂
        </button>
      </header>

      {/* Wilaya Leaderboard Mini Section */}
      <section className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl font-black text-xs uppercase">المنافسة الوطنية 🇩🇿</div>
               <h3 className="text-4xl font-black">ترتيب ولاية <span className="underline decoration-emerald-400">سطيف</span></h3>
               <p className="text-indigo-100 font-bold text-lg leading-relaxed">
                 ولايتك تحتل المركز الثاني وطنياً هذا الأسبوع! ساعد زملائك في ولايتك لتصدر القائمة والحصول على لقب "الولاية العبقرية".
               </p>
               <div className="flex gap-4">
                  <div className="bg-white/10 p-4 rounded-2xl flex-1 text-center border border-white/10">
                     <span className="block text-2xl font-black">#02</span>
                     <span className="text-[10px] text-white/60 font-black uppercase">الترتيب الحالي</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl flex-1 text-center border border-white/10">
                     <span className="block text-2xl font-black">+4500</span>
                     <span className="text-[10px] text-white/60 font-black uppercase">نقاط الأسبوع</span>
                  </div>
               </div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 space-y-4">
               <h4 className="font-black text-lg mb-4 text-center">أفضل تلاميذ سطيف 🏆</h4>
               {[
                 { name: 'أمين د.', points: '450 XP', avatar: '🦁' },
                 { name: 'لينا ب.', points: '420 XP', avatar: '✨' },
                 { name: 'ياسين ق.', points: '390 XP', avatar: '⚡' },
               ].map((t, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <span className="text-2xl">{t.avatar}</span>
                       <span className="font-bold">{t.name}</span>
                    </div>
                    <span className="font-black text-indigo-200">{t.points}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
          <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <span className="text-indigo-600 text-3xl">📊</span> إتقان المحاور (%)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chapterData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 900 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 900 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontFamily: 'Tajawal', fontWeight: 'bold' }} />
                <Bar dataKey="score" radius={[12, 12, 12, 12]} barSize={45}>
                  {chapterData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col justify-center text-center space-y-8">
           <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center text-6xl mx-auto shadow-inner border-8 border-white">🎓</div>
           <div>
              <h3 className="text-2xl font-black text-slate-800">لقبك الدراسي الحالي</h3>
              <p className="text-indigo-600 text-4xl font-black mt-2">"مهندس طالس الواعد"</p>
           </div>
           <p className="text-slate-500 font-bold max-w-sm mx-auto">
             لقد أتممت 90% من تمارين الهندسة بنجاح باهر. الأستاذ ذكي فخور بك جداً!
           </p>
           <div className="pt-4">
              <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 transition-all">مشاركة الإنجاز 🚀</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
