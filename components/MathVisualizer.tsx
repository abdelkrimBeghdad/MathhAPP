
import React, { useState, useEffect } from 'react';
import { VisualizationType } from '../types';

interface MathVisualizerProps {
  type: VisualizationType;
  colorClass: string;
}

const MathVisualizer: React.FC<MathVisualizerProps> = ({ type, colorClass }) => {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState(0);
  const [mode, setMode] = useState<'VISUAL' | 'CHALLENGE'>('VISUAL');
  const [userInput, setUserInput] = useState('');
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  // Lab Content Registry
  const labRegistry: Record<string, any> = {
    EXPANSION: [
      {
        title: "التوزيع البسيط",
        formula: ["3", "(", "x", "+", "5", ")"],
        steps: [
          { text: "3 * x = 3x", detail: "الخطوة الأولى: نوزع العدد الخارجي على الحد الأول.", highlight: [0, 2] },
          { text: "3 * 5 = 15", detail: "الخطوة الثانية: نوزع العدد الخارجي على الحد الثاني.", highlight: [0, 4] },
          { text: "3x + 15", detail: "النتيجة النهائية: نجمع الحدود (إذا كانت متشابهة).", highlight: [0, 1, 2, 3, 4, 5] }
        ],
        challenge: { question: "ما هو ناتج 3 * 5؟", answer: "15" }
      }
    ],
    PGCD_VISUAL: [
      {
        title: "خوارزمية الفوارق",
        formula: ["120", "-", "45", "=", "75"],
        steps: [
          { text: "120 - 45 = 75", detail: "نطرح الأصغر من الأكبر.", highlight: [0, 2] },
          { text: "75 - 45 = 30", detail: "نكرر العملية مع الناتج والعدد الأصغر.", highlight: [2, 4] },
          { text: "45 - 30 = 15", detail: "نستمر حتى نصل لفرق معدوم أو مكرر.", highlight: [0, 4] }
        ],
        challenge: { question: "ما هو الفرق بين 45 و 30؟", answer: "15" }
      }
    ]
  };

  const currentData = labRegistry[type]?.[level] || labRegistry.EXPANSION[0];
  const isLastStep = step === currentData.steps.length - 1;

  useEffect(() => {
    setStep(0);
    setUserInput('');
    setIsFeedbackVisible(false);
  }, [type, level, mode]);

  const handleNext = () => {
    if (isLastStep) {
      setStep(0);
    } else {
      setStep(s => s + 1);
    }
  };

  const checkChallenge = () => {
    if (userInput.trim() === currentData.challenge.answer) {
      setIsFeedbackVisible(true);
      setTimeout(() => {
        setMode('VISUAL');
        setStep(currentData.steps.length - 1);
      }, 1500);
    } else {
      alert("حاول مرة أخرى يا بطل!");
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Lab Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div className="flex bg-slate-200 p-1 rounded-2xl shadow-inner">
          <button 
            onClick={() => setMode('VISUAL')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${mode === 'VISUAL' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            المحاكاة المرئية
          </button>
          <button 
            onClick={() => setMode('CHALLENGE')}
            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${mode === 'CHALLENGE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            تحدي الإكمال
          </button>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm flex items-center gap-2">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider">نظام المعالجة نشط</span>
        </div>
      </div>

      {/* Main Lab Screen */}
      <div className="relative bg-slate-900 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl border-[8px] border-slate-800 lab-grid min-h-[400px] flex flex-col justify-center items-center">
        
        {/* Lab UI Elements */}
        <div className="absolute top-6 right-8 flex gap-1.5">
           <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
        </div>

        {mode === 'VISUAL' ? (
          <div className="w-full space-y-12 animate-in fade-in duration-500">
            {/* Improved Formula Bar - Single Line */}
            <div className="flex justify-center items-center flex-nowrap gap-0.5 md:gap-1 overflow-x-auto no-scrollbar py-6" dir="ltr">
              {currentData.formula.map((char: string, i: number) => {
                const isActive = currentData.steps[step].highlight.includes(i);
                const isOperator = ['+', '-', '*', '/', '(', ')', '='].includes(char);
                return (
                  <span 
                    key={i} 
                    className={`text-5xl md:text-7xl font-black transition-all duration-300 px-1 inline-block ${
                      isActive 
                        ? 'text-indigo-400 scale-110 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]' 
                        : 'text-white/30'
                    } ${isOperator ? 'font-light' : ''}`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Explanation Console */}
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500"></div>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-right">تحليل الأستاذ ذكي</p>
                <h4 className="text-xl md:text-2xl text-white font-bold leading-relaxed text-right">
                  {currentData.steps[step].detail}
                </h4>
              </div>
              
              <div className="text-center py-4">
                <span className="text-emerald-400 text-5xl md:text-6xl font-black drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] tracking-tighter" dir="ltr">
                  {currentData.steps[step].text}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg text-center space-y-8 animate-in zoom-in-95">
             <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
                <p className="text-indigo-300 text-lg font-bold mb-6">{currentData.challenge.question}</p>
                <div className="relative">
                  <input 
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="الحل.."
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-6 text-5xl font-black text-white text-center outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600"
                  />
                  {isFeedbackVisible && (
                    <div className="absolute inset-0 bg-emerald-500 rounded-2xl flex items-center justify-center animate-in fade-in zoom-in">
                       <span className="text-white text-2xl font-black">إجابة صحيحة! 🎉</span>
                    </div>
                  )}
                </div>
             </div>
             <button 
               onClick={checkChallenge}
               className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
             >
               تأكيد الحل 🛡️
             </button>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8">
           {mode === 'VISUAL' && (
             <button 
              onClick={handleNext}
              className={`px-12 py-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 ${isLastStep ? 'bg-indigo-600' : 'bg-emerald-600'}`}
             >
               <span>{isLastStep ? 'إعادة العرض' : 'الخطوة التالية'}</span>
               <span>{isLastStep ? '🔄' : '➡️'}</span>
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default MathVisualizer;
