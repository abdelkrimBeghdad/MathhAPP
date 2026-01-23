
import React, { useState, useEffect } from 'react';
import { BEM_EXAMS } from '../constants';
import { MockExam, Exercise } from '../types';
import MathText from './MathText';

const ExamsSimulator: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<MockExam | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer: any;
    if (selectedExam && !isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && selectedExam) {
      setIsFinished(true);
    }
    return () => clearInterval(timer);
  }, [selectedExam, isFinished, timeLeft]);

  const startExam = (exam: MockExam) => {
    setSelectedExam(exam);
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
    setTimeLeft(exam.duration * 60);
    setSelectedOption(null);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelect = (idx: number) => {
    if (isFinished) return;
    const currentQ = selectedExam!.questions[currentIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
    setSelectedOption(idx);
  };

  const calculateScore = () => {
    if (!selectedExam) return 0;
    let correct = 0;
    selectedExam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / selectedExam.questions.length) * 20);
  };

  if (isFinished) {
    const score = calculateScore();
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in zoom-in-95 duration-500 text-right">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center space-y-8">
           <div className="text-8xl">🏆</div>
           <h2 className="text-4xl font-black text-slate-800">انتهى الامتحان!</h2>
           <div className="flex justify-center gap-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 min-w-[150px]">
                 <p className="text-slate-400 font-bold text-xs mb-2">العلامة المقدرة</p>
                 <p className={`text-5xl font-black ${score >= 10 ? 'text-emerald-500' : 'text-rose-500'}`}>{score}/20</p>
              </div>
           </div>
           <p className="text-slate-500 font-bold text-lg max-w-md mx-auto">
             {score >= 15 ? 'ممتاز جداً! أنت مستعد تماماً للشهادة.' : score >= 10 ? 'جيد، لكن يمكنك تحسين أدائك أكثر بالتدرب.' : 'تحتاج لمراجعة الدروس الأساسية، لا تستسلم!'}
           </p>
           <div className="pt-6 flex gap-4">
              <button 
                onClick={() => setSelectedExam(null)}
                className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all"
              >
                العودة للقائمة
              </button>
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-2xl font-black text-slate-800 mr-4">مراجعة الأخطاء مع الأستاذ ذكي 👨‍🏫</h3>
           {selectedExam?.questions.map((q, i) => (
             <div key={q.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                   <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-xs font-black">السؤال {i + 1}</span>
                   {answers[q.id] === q.correctAnswer ? 
                     <span className="text-emerald-500 font-black">✅ إجابة صحيحة</span> : 
                     <span className="text-rose-500 font-black">❌ إجابة خاطئة</span>}
                </div>
                <MathText text={q.question} className="font-bold text-lg text-slate-800" />
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                   <p className="text-indigo-900 font-black mb-2">شرح الأستاذ ذكي:</p>
                   <MathText text={q.explanation} className="text-indigo-700 text-sm leading-loose" />
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  if (!selectedExam) {
    return (
      <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500 text-right">
        <header className="space-y-4">
          <h2 className="text-4xl font-black text-slate-800">محاكي شهادة التعليم المتوسط ⏱️</h2>
          <p className="text-slate-500 text-lg font-bold">تدرب على مواضيع رسمية سابقة وعش أجواء الامتحان الحقيقي.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEM_EXAMS.map((exam) => (
            <div 
              key={exam.id}
              className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 hover:scale-[1.02] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">🎓</div>
                <h3 className="text-2xl font-black text-slate-800 leading-tight">{exam.title}</h3>
                <div className="flex gap-4">
                   <div className="bg-slate-50 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-500 uppercase">⏳ {exam.duration} دقيقة</div>
                   <div className="bg-indigo-50 px-3 py-1.5 rounded-xl text-[10px] font-black text-indigo-500 uppercase">{exam.questions.length} أسئلة</div>
                </div>
              </div>
              <button 
                onClick={() => startExam(exam)}
                className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                ابدأ المحاكاة 📝
              </button>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 flex items-center gap-6">
           <div className="text-5xl">💡</div>
           <div className="space-y-1">
              <h4 className="font-black text-amber-900">نصيحة الأستاذ ذكي:</h4>
              <p className="text-amber-800 text-sm font-medium">الامتحان لا يقيس ذكاءك فقط، بل يقيس قدرتك على إدارة الوقت والتركيز. ابدأ بالتمارين التي تتقنها جيداً!</p>
           </div>
        </div>
      </div>
    );
  }

  const currentQ = selectedExam.questions[currentIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-6 duration-500 text-right pb-20">
      <div className="sticky top-4 z-40 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className={`px-6 py-2 rounded-2xl font-black text-xl shadow-inner ${timeLeft < 300 ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-800'}`}>
               {formatTime(timeLeft)} ⏳
            </div>
            <h3 className="font-black text-slate-400 text-sm hidden md:block">{selectedExam.title}</h3>
         </div>
         <button 
           onClick={() => { if(confirm('هل أنت متأكد من إنهاء الامتحان؟')) setIsFinished(true) }}
           className="px-6 py-2 bg-rose-500 text-white rounded-xl font-black text-xs hover:bg-rose-600 transition-all shadow-lg shadow-rose-100"
         >
           إنهاء وتسليم الورقة 📄
         </button>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-50 relative">
         <div className="mb-12 flex justify-between items-center">
            <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-4 py-1.5 rounded-full uppercase tracking-widest">السؤال {currentIndex + 1} من {selectedExam.questions.length}</span>
            <div className="flex gap-1">
               {selectedExam.questions.map((_, i) => (
                 <div key={i} className={`w-8 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-indigo-600 w-12' : answers[selectedExam.questions[i].id] !== undefined ? 'bg-emerald-400' : 'bg-slate-100'}`}></div>
               ))}
            </div>
         </div>

         <div className="space-y-10 min-h-[300px]">
            <MathText text={currentQ.question} className="text-3xl font-black text-slate-800 leading-relaxed" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {currentQ.options.map((opt, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleSelect(idx)}
                   className={`p-6 rounded-[1.5rem] border-2 text-right transition-all font-bold text-lg flex items-center justify-between group ${
                     answers[currentQ.id] === idx 
                       ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-lg' 
                       : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600'
                   }`}
                 >
                   <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors ${answers[currentQ.id] === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>{idx + 1}</span>
                   <MathText text={opt} className="flex-1" />
                 </button>
               ))}
            </div>
         </div>

         <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between">
            <button 
               onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
               disabled={currentIndex === 0}
               className="px-8 py-3 rounded-xl font-black text-slate-400 hover:text-slate-600 disabled:opacity-30"
            >
               ⬅️ السؤال السابق
            </button>
            <button 
               onClick={() => {
                 if (currentIndex < selectedExam.questions.length - 1) {
                   setCurrentIndex(prev => prev + 1);
                   setSelectedOption(null);
                 } else {
                   setIsFinished(true);
                 }
               }}
               className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all"
            >
               {currentIndex === selectedExam.questions.length - 1 ? 'إنهاء الامتحان ✅' : 'السؤال التالي ➡️'}
            </button>
         </div>
      </div>
    </div>
  );
};

export default ExamsSimulator;
