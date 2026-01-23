
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell
} from 'recharts';

const chapterData = [
  { name: 'PGCD', score: 85, color: '#4f46e5' },
  { name: 'الجذور', score: 70, color: '#7c3aed' },
  { name: 'الحساب الحرفي', score: 45, color: '#db2777' },
  { name: 'طالس', score: 92, color: '#10b981' },
  { name: 'المثلثات', score: 60, color: '#f59e0b' },
  { name: 'المعالم', score: 30, color: '#ef4444' },
];

const weeklyActivity = [
  { day: 'الأحد', points: 120 },
  { day: 'الاثنين', points: 300 },
  { day: 'الثلاثاء', points: 150 },
  { day: 'الأربعاء', points: 480 },
  { day: 'الخميس', points: 220 },
  { day: 'الجمعة', points: 80 },
  { day: 'السبت', points: 340 },
];

const ProgressView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-black text-slate-800">مستوى إتقانك للمادة 📊</h2>
        <p className="text-slate-500 mt-2">حلل أداءك واعرف نقاط قوتك والمواضيع التي تحتاج لتركيز أكبر.</p>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl">🔥</div>
          <div>
            <span className="block text-3xl font-black text-slate-800">1,250</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">إجمالي النقاط</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl">🏆</div>
          <div>
            <span className="block text-3xl font-black text-slate-800">#12</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ترتيبك في الولاية</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl">⚡</div>
          <div>
            <span className="block text-3xl font-black text-slate-800">5 أيام</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">سلسلة المذاكرة</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chapter Mastery Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <span className="text-indigo-600">📊</span> الإتقان حسب المحاور (%)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chapterData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Tajawal'
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                  {chapterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Activity Trend */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
            <span className="text-purple-600">📈</span> نشاطك الأسبوعي (نقاط)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyActivity} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Tajawal'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorPoints)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Badges and Achievements */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-8">الأوسمة المحققة 🏅</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: '🦁', title: 'البطل الصاعد', desc: 'أول 100 نقطة' },
              { icon: '📐', title: 'مهندس طالس', desc: 'إكمال وحدة الهندسة' },
              { icon: '⚡', title: 'البرق', desc: 'حل 10 تمارين متتالية' },
              { icon: '📚', title: 'المجتهد', desc: 'دراسة لـ 7 أيام' },
              { icon: '🧪', title: 'العبقري', desc: 'درجة كاملة في PGCD' },
              { icon: '🔓', title: 'المستكشف', desc: 'فتح جميع الدروس' },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-help">
                <div className="w-20 h-20 bg-white/10 rounded-[1.5rem] border border-white/10 flex items-center justify-center text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {badge.icon}
                </div>
                <h4 className="font-bold text-sm text-white">{badge.title}</h4>
                <p className="text-[10px] text-white/40 mt-1">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
