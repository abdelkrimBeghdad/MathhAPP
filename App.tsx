
import React, { useState } from 'react';
import { AppView, Chapter } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import Exercises from './components/Exercises';
import LessonDetail from './components/LessonDetail';
import ProgressView from './components/ProgressView';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ExamsSimulator from './components/ExamsSimulator';
import InteractivePlayground from './components/InteractivePlayground';
import Flashcards from './components/Flashcards';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const openLesson = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setCurrentView(AppView.LESSON_DETAIL);
  };

  const handleAdminRequest = () => {
    if (isAdminAuthenticated) {
      setCurrentView(AppView.ADMIN);
    } else {
      setShowAdminLogin(true);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomePage onStart={() => setCurrentView(AppView.DASHBOARD)} onAdminClick={handleAdminRequest} />;
      case AppView.DASHBOARD:
        return <Dashboard setView={setCurrentView} onSelectChapter={openLesson} />;
      case AppView.CHAT:
        return <ChatBot />;
      case AppView.EXERCISES:
        return <Exercises />;
      case AppView.EXAMS:
        return <ExamsSimulator />;
      case AppView.PLAYGROUND:
        return <InteractivePlayground />;
      case AppView.FLASHCARDS:
        return <Flashcards />;
      case AppView.ADMIN:
        return <AdminDashboard />;
      case AppView.LESSON_DETAIL:
        return selectedChapter ? (
          <LessonDetail 
            chapter={selectedChapter} 
            onBack={() => setCurrentView(AppView.DASHBOARD)} 
          />
        ) : null;
      case AppView.PROGRESS:
        return <ProgressView />;
      default:
        return <Dashboard setView={setCurrentView} onSelectChapter={openLesson} />;
    }
  };

  const showSidebar = currentView !== AppView.HOME;

  return (
    <div className="min-h-screen flex bg-slate-50 font-['Tajawal']">
      {showSidebar && <Sidebar currentView={currentView} setView={setCurrentView} />}
      <main className={`flex-1 ${showSidebar ? 'p-4 md:p-10 lg:p-14 overflow-y-auto max-w-[1400px] mx-auto' : ''}`}>
        {renderView()}
      </main>
      {showAdminLogin && (
        <AdminLogin 
          onLoginSuccess={() => { setIsAdminAuthenticated(true); setShowAdminLogin(false); setCurrentView(AppView.ADMIN); }}
          onCancel={() => setShowAdminLogin(false)}
        />
      )}
    </div>
  );
};

export default App;
