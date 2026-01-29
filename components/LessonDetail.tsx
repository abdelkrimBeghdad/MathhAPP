
import React, { useState, useEffect } from 'react';
import { Chapter } from '../types';
import MathVisualizer from './MathVisualizer';
import MathText from './MathText';

interface LessonDetailProps {
  chapter: Chapter;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ chapter, onBack }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [userSolution, setUserSolution] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' | 'neutral' } | null>(null);
  const [showFullSolution, setShowFullSolution] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  const visibleLessons = chapter.detailedContent.filter(les => les.isVisible !== false);
  const currentLesson = visibleLessons[activeSection];

  // Reset interactive state when moving between lessons
  useEffect(() => {
    setUserSolution('');
    setFeedback(null);
    setShowFullSolution(false);
    setAttemptsLeft(3);
  }, [activeSection]);

  const handleNext = () => {
    if (activeSection < visibleLessons.length - 1) {
      setActiveSection(activeSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  const handlePrev = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();

  const handleCorrection = () => {
    if (!userSolution.trim() || attemptsLeft <= 0 || feedback?.type === 'success') return;
    
    const expected = normalize(currentLesson.example?.interactiveAnswer || "");
    const provided = normalize(userSolution);

    if (provided === expected) {
      setFeedback({ 
        text: "أحسنت يا بطل! إجابتك صحيحة تماماً. استمر في هذا التألق 🌟", 
        type: 'success' 
      });
      setShowFullSolution(true);
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      
      if (newAttempts > 0) {
        setFeedback({ 
          text: `تحتاج لمراجعة بسيطة. تأكد من خطواتك! بقيت لك ${newAttempts} محاولات.`, 
          type: 'error' 
        });
      } else {
        setFeedback({ 
          text: "انتهت المحاولات! لا بأس، تعلم من الحل النموذجي بالأسفل وحاول في المورد القادم.", 
          type: 'error' 
        });
        setShowFullSolution(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 relative overflow-x-hidden">
      {/* Dynamic Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <button onClick={onBack} className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2 font-black text-sm">
          <span>خريطة المواد</span>
          <span>⬅️</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="font-black text-slate-900 text-sm md:text-base">{chapter.title}</h2>
          <div className="flex gap-1 mt-1">
            {visibleLessons.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === activeSection ? 'w-6 bg-indigo-600' : i < activeSection ? 'w-2 bg-emerald-400' : 'w-2 bg-slate-200'}`}></div>
            ))}
          </div>
        </div>
        <div className={`${chapter.color} w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-lg`}>
          {chapter.icon}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-0 mt-8 space-y-8 text-right">
        {/* Current Lesson Card */}
        <div key={activeSection} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] border border-slate-50 overflow-hidden">
            
            {/* Header Area */}
            <div className="p-10 md:p-14 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
              <div className="space-y-3 text-right">
                <div className="flex items-center gap-3 justify-end">
                   <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">المورد المعرفي {activeSection + 1}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {currentLesson.subtitle}
                </h3>
              </div>
              <div className="text-6xl md:text-7xl opacity-20 grayscale hover:grayscale-0 transition-all cursor-default">
                {chapter.icon}
              </div>
            </div>

            <div className="p-10 md:p-14 space-y-14">
              {/* 1. Explanation Text */}
              <div className="relative">
                <div className="absolute -right-6 top-0 w-1.5 h-full bg-indigo-600 rounded-full opacity-30"></div>
                <MathText 
                  text={currentLesson.explanation} 
                  className="text-slate-700 text-2xl md:text-3xl leading-[1.8] font-bold tracking-tight pr-2" 
                />
              </div>

              {/* 2. Enhanced Summary (الحوصلة) Card */}
              {currentLesson.summary && (
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 to-indigo-200 rounded-[3.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="relative bg-white rounded-[3rem] border-2 border-amber-100 overflow-hidden shadow-2xl shadow-amber-900/5">
                    <div className="h-2 w-full bg-gradient-to-l from-amber-400 to-indigo-500"></div>
                    
                    <div className="p-10 md:p-12 space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-amber-100/50 animate-bounce-slow">
                              🎯
                            </div>
                            <div>
                               <h4 className="font-black text-amber-900 text-2xl">زبدة المورد</h4>
                               <p className="text-amber-600 text-[10px] font-black uppercase tracking-widest">خلاصة الدرس النهائية</p>
                            </div>
                         </div>
                      </div>

                      <div className="bg-slate-50/80 rounded-[2.5rem] p-8 md:p-10 border border-slate-100/50">
                        <MathText 
                          text={currentLesson.summary} 
                          className="text-slate-800 text-xl md:text-2xl font-black leading-[1.8]" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Lab Visualizer */}
              {currentLesson.visualization && (
                <div className="py-8 bg-slate-900 rounded-[3.5rem] p-4 md:p-10 shadow-inner overflow-hidden border-8 border-slate-800/50">
                  <div className="mb-6 flex items-center justify-between px-4">
                    <span className="text-indigo-400 font-black text-[10px] uppercase tracking-widest">مختبر التفاعل البصري</span>
                  </div>
                  <MathVisualizer type={currentLesson.visualization} colorClass={chapter.color} />
                </div>
              )}

              {/* 4. Tafa'oli Interactive Example Card - NO AI VERSION, 3 ATTEMPTS */}
              {currentLesson.example && (
                <div className="bg-slate-50 rounded-[3.5rem] p-10 md:p-14 border border-slate-200 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-600/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="flex items-center gap-5 mb-10 justify-end">
                    <div className="text-right">
                       <h4 className="font-black text-indigo-600 text-3xl italic tracking-tighter">جرب حلك!</h4>
                       <div className="flex items-center gap-2 justify-end mt-1">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${attemptsLeft > 1 ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600 animate-pulse'}`}>
                            المحاولات المتبقية: {attemptsLeft}
                          </span>
                       </div>
                    </div>
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-md flex items-center justify-center text-3xl border border-indigo-50">✍️</div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group-hover:border-indigo-100 transition-colors text-right">
                      <div className="flex items-center gap-2 mb-4 justify-end text-slate-400">
                         <p className="text-[10px] font-black uppercase tracking-widest">المطلوب منك</p>
                         <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      </div>
                      <MathText text={currentLesson.example.problem} className="text-slate-800 text-2xl font-black leading-relaxed" />
                    </div>
                    
                    <div className="relative">
                      <input
                        type="text"
                        disabled={attemptsLeft <= 0 || feedback?.type === 'success'}
                        value={userSolution}
                        onChange={(e) => setUserSolution(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCorrection()}
                        placeholder={attemptsLeft <= 0 ? "استنفدت المحاولات" : "أدخل الناتج النهائي هنا..."}
                        className={`w-full p-8 rounded-[2.5rem] border-4 font-black text-3xl text-center outline-none transition-all shadow-sm ${
                          attemptsLeft <= 0 || feedback?.type === 'success'
                            ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white border-slate-100 focus:border-indigo-400 focus:shadow-2xl'
                        }`}
                      />
                      <button
                        onClick={handleCorrection}
                        disabled={attemptsLeft <= 0 || feedback?.type === 'success' || !userSolution.trim()}
                        className={`mt-6 w-full py-5 rounded-[2rem] font-black text-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                          attemptsLeft <= 0 || feedback?.type === 'success'
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                         <span>{attemptsLeft <= 0 ? 'المحاولات انتهت' : 'تحقق من النتيجة'}</span>
                         <span>🛡️</span>
                      </button>
                    </div>

                    {feedback && (
                      <div className={`p-8 rounded-[3rem] border-2 animate-in slide-in-from-top-4 duration-500 text-center ${feedback.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-rose-50 border-rose-100 text-rose-900'}`}>
                        <p className="text-xl font-black">{feedback.text}</p>
                      </div>
                    )}

                    {showFullSolution && (
                      <div className="bg-indigo-50/50 p-10 rounded-[3rem] border-2 border-indigo-100 animate-in fade-in duration-500">
                         <div className="flex items-center gap-2 mb-6 justify-end text-indigo-600">
                            <p className="text-sm font-black uppercase tracking-widest">خطوات الحل الكاملة</p>
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                         </div>
                         <MathText text={currentLesson.example.solution} className="text-indigo-900 text-lg md:text-xl font-bold leading-relaxed" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="px-10 py-10 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <button 
                onClick={handlePrev}
                disabled={activeSection === 0}
                className={`w-full md:w-auto px-10 py-5 rounded-[2.5rem] font-black transition-all flex items-center justify-center gap-3 ${activeSection === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-600 hover:text-indigo-600 border border-slate-200 shadow-sm active:scale-95'}`}
              >
                <span>➡️</span>
                <span>المورد السابق</span>
              </button>

              <div className="hidden md:flex gap-3">
                 {visibleLessons.map((_, i) => (
                   <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeSection ? 'bg-indigo-600 scale-125' : 'bg-slate-300'}`}></div>
                 ))}
              </div>

              <button 
                onClick={handleNext}
                className="w-full md:w-auto px-16 py-5 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 active:scale-95 group"
              >
                <span>{activeSection === visibleLessons.length - 1 ? 'أنهيت المقطع 🎉' : 'المورد التالي'}</span>
                <span className="group-hover:translate-x-[-4px] transition-transform">{activeSection === visibleLessons.length - 1 ? '🎓' : '⬅️'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
