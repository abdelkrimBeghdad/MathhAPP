
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'خريطة الرحلة', icon: '🗺️' },
    { id: AppView.CHAT, label: 'الأستاذ ذكي', icon: '🤖' },
    { id: AppView.PLAYGROUND, label: 'المختبر الهندسي', icon: '🌀' },
    { id: AppView.FLASHCARDS, label: 'تحدي البطاقات', icon: '🃏' },
    { id: AppView.EXAMS, label: 'محاكي BEM', icon: '⏱️' },
    { id: AppView.PROGRESS, label: 'إحصائياتي', icon: '📊' },
  ];

  return (
    <aside className="w-64 h-screen glass-morphism border-l border-slate-200 hidden md:flex flex-col sticky top-0 z-40">
      <div className="p-8">
        <div className="flex items-center justify-center gap-2 mb-1">
           <div className="w-8 h-8 math-gradient rounded-lg flex items-center justify-center text-white font-black shadow-lg">∑</div>
           <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            MathDz
          </h1>
        </div>
        <p className="text-[10px] text-slate-400 font-black text-center tracking-widest">v2.0 GAMIFIED</p>
      </div>

      {/* Hero Avatar Section */}
      <div className="px-6 mb-8 text-center">
         <div className="relative inline-block group cursor-pointer" onClick={() => setView(AppView.PROGRESS)}>
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full p-1 shadow-xl">
               <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl overflow-hidden">
                  🧔‍♂️
               </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center text-[10px] text-white font-black">
               Lvl 5
            </div>
         </div>
         <h4 className="mt-4 font-black text-slate-800 text-sm">أمين المتفوق</h4>
         <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter bg-indigo-50 inline-block px-3 py-1 rounded-full mt-1">صياد الكسور 🎯</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
              currentView === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2">
        <div className="bg-slate-900 p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
             <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-indigo-300 font-black uppercase">التقدم للمستوى 6</span>
                <span className="text-[10px] text-white font-black">1250/1500 XP</span>
             </div>
             <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
               <div className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full w-[83%] transition-all duration-1000"></div>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
