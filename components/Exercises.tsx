
import React, { useState, useEffect } from 'react';
import { EXERCISES, CHAPTERS } from '../constants';
import { Exercise } from '../types';
import { generateCustomExercise } from '../services/geminiService';
import MathText from './MathText';

const Exercises: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedChapterId) {
      const filtered = selectedChapterId === 'all' 
        ? [...EXERCISES].sort(() => Math.random() - 0.5)
        : EXERCISES.filter(ex => ex.chapterId === selectedChapterId);
      setCurrentExercises(filtered);
      setCurrentIndex(0);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  }, [selectedChapterId]);

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null || !currentExercises[currentIndex]) return;
    setSelectedOption(idx);
    if (idx === currentExercises[currentIndex].correctAnswer) {
      setScore(prev => prev + 10);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIndex < currentExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      handleGenerateAI();
    }
  };

  const handleGenerateAI = async () => {
    const chapter = CHAPTERS.find(c => c.id === selectedChapterId) || CHAPTERS[0];
    setIsLoading(true);
    try {
      const newEx = await generateCustomExercise(chapter.title);
      const exerciseWithId: Exercise = {
        ...newEx,
        id: Date.now().toString(),
        chapterId: selectedChapterId || 'ai'
      };
      setCurrentExercises(prev => [...prev, exerciseWithId]);
      setCurrentIndex(currentExercises.length);
      setSelectedOption(null);
      setShowExplanation(false);
    } catch (error) {
      alert("حدث خطأ أثناء توليد التمرين.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedChapterId) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 text-right">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-slate-800">اختر موضوع التحدي 🎯</h2>
          <p className="text-slate-500">اختر الوحدة التي تريد التدرب عليها اليوم وسيقوم الأستاذ ذكي بتحديك!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setSelectedChapterId(chapter.id)}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center space-y-3"
            >
              <div className={`${chapter.color} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform`}>
                {chapter.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{chapter.title}</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">ابدأ التحدي</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentEx = currentExercises[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 text-right">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <button onClick={() => setSelectedChapterId(null)} className="text-slate-400 hover:text-indigo-600 flex items-center gap-1 font-bold text-sm">
          تغيير الموضوع ⬅️
        </button>
        <div className="flex gap-4 items-center">
          <div className="bg-indigo-50 px-4 py-1 rounded-full text-indigo-700 font-bold">{score} 🌟</div>
        </div>
      </div>

      <div className="glass-morphism rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-indigo-600">الأستاذ ذكي يجهز لك تحدياً جديداً...</p>
          </div>
        )}

        {currentEx ? (
          <>
            <div className="mb-10 text-center">
               <MathText text={currentEx.question} className="text-2xl font-bold text-slate-800 leading-relaxed" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {currentEx.options.map((option, idx) => (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => handleAnswer(idx)}
                  className={`p-6 rounded-2xl border-2 text-right transition-all font-bold text-lg group relative flex items-center justify-end ${
                    selectedOption === null 
                      ? 'border-slate-100 hover:border-indigo-400 hover:bg-indigo-50' 
                      : idx === currentEx.correctAnswer 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                        : selectedOption === idx 
                          ? 'border-red-500 bg-red-50 text-red-800' 
                          : 'border-slate-100 opacity-50'
                  }`}
                >
                  <MathText text={option} className="flex-1" />
                  <span className={`inline-block w-8 h-8 rounded-full text-center leading-8 mr-4 text-sm ${
                    selectedOption === null ? 'bg-slate-100 text-slate-500' : 
                    idx === currentEx.correctAnswer ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-10 p-8 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-[2rem] shadow-inner">
                <div className="flex items-center gap-3 mb-4 justify-end">
                  <h4 className="font-bold text-indigo-900 text-xl">تصحيح الأستاذ ذكي:</h4>
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <MathText text={currentEx.explanation} className="text-indigo-800 leading-relaxed text-lg mb-8" />
                <button onClick={nextQuestion} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 shadow-lg">
                  التمرين التالي ➡️
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-800">انتهت التمارين!</h3>
            <button onClick={handleGenerateAI} className="mt-6 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold">ولد لي تمارين جديدة ✨</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;
