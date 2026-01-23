
import React, { useState } from 'react';
import { AppView, Chapter } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import Exercises from './components/Exercises';
import LessonDetail from './components/LessonDetail';
import ProgressView from './components/ProgressView';
import { CHAPTERS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  const openLesson = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setCurrentView(AppView.LESSON_DETAIL);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard setView={setCurrentView} onSelectChapter={openLesson} />;
      case AppView.CHAT:
        return <ChatBot />;
      case AppView.EXERCISES:
        return <Exercises />;
      case AppView.LESSON_DETAIL:
        return selectedChapter ? (
          <LessonDetail 
            chapter={selectedChapter} 
            onBack={() => setCurrentView(AppView.DASHBOARD)} 
          />
        ) : null;
      case AppView.PROGRESS:
        return <ProgressView />;
      case AppView.FORMULAS:
        return (
          <div className="p-8 glass-morphism rounded-3xl">
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">📜 بنك القوانين والملخصات</h2>
             <div className="space-y-4">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 border-r-4 border-r-indigo-500">
                  <h3 className="font-bold text-lg mb-2">خاصية طالس</h3>
                  <p className="text-slate-600 leading-relaxed italic">"إذا كان مستقيمان متقاطعان يقطعهما مستقيمان متوازيان، فإن نسب الأطوال في المثلثين المتشكلين متساوية..."</p>
                  <div className="mt-4 text-indigo-600 font-mono font-bold text-center bg-indigo-50 p-3 rounded-lg">AM / AB = AN / AC = MN / BC</div>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 border-r-4 border-r-purple-500">
                  <h3 className="font-bold text-lg mb-2">المتطابقات الشهيرة</h3>
                  <ul className="space-y-2 font-mono font-bold text-indigo-600">
                    <li>(a + b)² = a² + 2ab + b²</li>
                    <li>(a - b)² = a² - 2ab + b²</li>
                    <li>(a - b)(a + b) = a² - b²</li>
                  </ul>
                </div>
             </div>
          </div>
        );
      default:
        return <Dashboard setView={setCurrentView} onSelectChapter={openLesson} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 p-4 md:p-10 lg:p-14 overflow-y-auto max-w-[1400px] mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-8 p-4 glass-morphism rounded-2xl shadow-sm">
          <h1 className="text-xl font-black text-indigo-600">MathDz</h1>
          <div className="flex gap-4">
             <button onClick={() => setCurrentView(AppView.DASHBOARD)}>🏠</button>
             <button onClick={() => setCurrentView(AppView.CHAT)}>🤖</button>
             <button onClick={() => setCurrentView(AppView.EXERCISES)}>📝</button>
          </div>
        </div>

        {renderView()}
      </main>

      {/* Quick Action Button for Mobile Chat */}
      <button 
        onClick={() => setCurrentView(AppView.CHAT)}
        className="md:hidden fixed bottom-6 left-6 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl z-50 hover:scale-110 transition-transform active:scale-95"
      >
        🤖
      </button>
    </div>
  );
};

export default App;
