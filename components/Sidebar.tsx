
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'الرئيسية', icon: '🏠' },
    { id: AppView.CHAT, label: 'الأستاذ ذكي', icon: '🤖' },
    { id: AppView.EXAMS, label: 'محاكي BEM', icon: '⏱️' },
    { id: AppView.EXERCISES, label: 'تمارين تفاعلية', icon: '📝' },
    { id: AppView.FORMULAS, label: 'بنك القوانين', icon: '📜' },
    { id: AppView.PROGRESS, label: 'مستواي التعليمي', icon: '📊' },
  ];

  return (
    <aside className="w-64 h-screen glass-morphism border-l border-slate-200 hidden md:flex flex-col sticky top-0 z-40">
      <div className="p-8">
        <div className="flex items-center justify-center gap-2 mb-1">
           <div className="w-8 h-8 math-gradient rounded-lg flex items-center justify-center text-white font-black shadow-lg">∑</div>
           <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            MathDz
          </h1>
          <span className="text-emerald-500 animate-pulse text-[10px]">LIVE</span>
        </div>
        <p className="text-[10px] text-slate-400 font-bold text-center tracking-tighter">BEM 2024 PREP</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              currentView === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1'
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2">
        <button
          onClick={() => setView(AppView.ADMIN)}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-[10px] transition-all border border-transparent ${
            currentView === AppView.ADMIN ? 'bg-slate-900 text-white' : 'text-slate-400 hover:border-slate-200'
          }`}
        >
          <span>🔐</span>
          <span className="font-black uppercase tracking-widest">الإدارة</span>
        </button>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
             <p className="text-[10px] text-indigo-100 font-black mb-1">نقاطك الحالية</p>
             <div className="flex items-end gap-1 mb-2">
                <span className="text-2xl font-black text-white">1250</span>
                <span className="text-[10px] text-white/60 font-bold pb-1">XP</span>
             </div>
             <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
               <div className="bg-white h-full w-3/4 transition-all duration-1000"></div>
             </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
