
import React, { useState } from 'react';
import { FLASHCARDS } from '../constants';

const Flashcards: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const card = FLASHCARDS[index];

  const handleGuess = (guess: boolean) => {
    if (showAnswer) return;
    if (guess === card.answer) {
      setScore(s => s + 50);
      setResult('correct');
    } else {
      setResult('wrong');
    }
    setShowAnswer(true);
  };

  const next = () => {
    setResult(null);
    setShowAnswer(false);
    setIndex((index + 1) % FLASHCARDS.length);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8 text-right">
      <div className="flex justify-between items-center">
         <div className="bg-indigo-600 text-white px-6 py-2 rounded-2xl font-black shadow-lg">رصيدك: {score} XP</div>
         <h2 className="text-2xl font-black text-slate-800">تحدي الذكاء السريع 🃏</h2>
      </div>

      <div className={`relative h-96 transition-all duration-700 preserve-3d cursor-pointer ${showAnswer ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 bg-white p-12 rounded-[3.5rem] shadow-2xl border-4 border-indigo-50 flex flex-col items-center justify-center text-center backface-hidden">
           <div className="text-6xl mb-8">❓</div>
           <p className="text-2xl font-black text-slate-800 leading-loose">{card.question}</p>
           <div className="mt-12 flex gap-6 w-full">
              <button onClick={() => handleGuess(true)} className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg hover:scale-105 transition-transform">صـحيح ✅</button>
              <button onClick={() => handleGuess(false)} className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-lg hover:scale-105 transition-transform">خـطأ ❌</button>
           </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-indigo-600 p-12 rounded-[3.5rem] shadow-2xl text-white flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] backface-hidden">
           <div className="text-6xl mb-6">{result === 'correct' ? '🎉 أحسنت!' : '😟 ركز أكثر!'}</div>
           <h3 className="text-3xl font-black mb-4">{card.answer ? 'الجواب: صحيح' : 'الجواب: خطأ'}</h3>
           <p className="text-lg font-bold leading-loose text-indigo-100 mb-8">{card.explanation}</p>
           <button onClick={next} className="bg-white text-indigo-600 px-12 py-3 rounded-2xl font-black shadow-xl hover:bg-slate-100 transition-all">البطاقة التالية ➡️</button>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
