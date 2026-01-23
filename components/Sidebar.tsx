
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
    { id: AppView.EXERCISES, label: 'تمارين تفاعلية', icon: '📝' },
    { id: AppView.FORMULAS, label: 'بنك القوانين', icon: '📜' },
    { id: AppView.PROGRESS, label: 'مستواي التعليمي', icon: '📊' },
  ];

  return (
    <aside className="w-64 h-screen glass-morphism border-l border-slate-200 hidden md:flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center justify-center gap-2 mb-1">
           <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            MathDz BEM
          </h1>
          <span className="text-emerald-500 animate-pulse" title="متصل بالخادم">☁️</span>
        </div>
        <p className="text-xs text-slate-500 text-center">رفيقك نحو التفوق</p>
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
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2">
        {/* Admin Link at the bottom */}
        <button
          onClick={() => setView(AppView.ADMIN)}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs transition-all ${
            currentView === AppView.ADMIN ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-100'
          }`}
        >
          <span>🔐</span>
          <span className="font-bold uppercase tracking-wider">لوحة الإدارة</span>
        </button>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-2xl border border-indigo-100">
          <div className="flex justify-between items-center mb-1">
             <p className="text-xs text-indigo-800 font-bold">نقاط التميز: 1250</p>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-3/4"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
