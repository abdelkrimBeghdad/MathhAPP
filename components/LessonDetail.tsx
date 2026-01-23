
import React, { useEffect, useState } from 'react';
import { Chapter } from '../types';
import MathVisualizer from './MathVisualizer';
import MathText from './MathText';

interface LessonDetailProps {
  chapter: Chapter;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ chapter, onBack }) => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Header */}
      <div className={`${chapter.color} h-64 md:h-80 relative overflow-hidden flex items-end p-6 md:p-12 text-white`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4 text-right">
            <button 
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2 rounded-xl text-sm font-black transition-all mb-4 border border-white/20"
            >
              ➡️ العودة للمنهاج الرسمي
            </button>
            <div className="flex items-center gap-6 justify-end">
              <div className="text-right">
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{chapter.title}</h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl font-bold">{chapter.description}</p>
              </div>
              <div className="text-7xl bg-white/20 p-5 rounded-[2.5rem] backdrop-blur-lg shadow-2xl border border-white/10">
                {chapter.icon}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
              <h3 className="font-black text-slate-800 mb-6 text-lg border-b pb-4">📍 مسار الموارد</h3>
              <div className="space-y-1 relative">
                {chapter.detailedContent.map((section, idx) => (
                  <button
                    key={idx}
                    className={`w-full text-right py-4 pr-4 text-sm font-bold transition-all border-r-4 ${activeSection === idx ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50 rounded-l-xl' : 'text-slate-400 border-slate-100'}`}
                  >
                    {section.subtitle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-16">
          {chapter.detailedContent.map((section, idx) => (
            <section key={idx} className="lesson-section scroll-mt-24">
              <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-10 flex items-start justify-between border-b border-slate-50 bg-slate-50/50">
                  <div className="text-right space-y-2">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase shadow-lg ${chapter.color}`}>
                      المورد رقم {idx + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800">{section.subtitle}</h3>
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-12 text-right">
                  {/* Explanation */}
                  <div className="bg-slate-50 p-8 rounded-[2rem] border-r-8 border-indigo-500">
                    <MathText text={section.explanation} className="prose max-w-none text-slate-700 text-lg" />
                  </div>

                  {/* Common Mistakes (NEW) */}
                  {section.commonMistakes && section.commonMistakes.length > 0 && (
                    <div className="space-y-6">
                       <div className="flex items-center gap-3 justify-end text-rose-500">
                          <h4 className="font-black text-xl">⚠️ احذر الفخ (أخطاء شائعة)</h4>
                          <span className="text-2xl">🚧</span>
                       </div>
                       {section.commonMistakes.map((mistake, mIdx) => (
                         <div key={mIdx} className="bg-rose-50 p-8 rounded-[2rem] border border-rose-100 space-y-4">
                            <div className="flex justify-between items-center border-b border-rose-200 pb-3">
                               <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">تنبيه ذكي</span>
                               <h5 className="font-black text-rose-800">{mistake.title}</h5>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-white/50 p-4 rounded-2xl">
                                  <p className="text-xs font-black text-rose-400 mb-1">الخطأ المتكرر ❌</p>
                                  <p className="font-bold text-slate-700">{mistake.mistake}</p>
                               </div>
                               <div className="bg-emerald-50 p-4 rounded-2xl">
                                  <p className="text-xs font-black text-emerald-500 mb-1">الإصلاح الصحيح ✅</p>
                                  <p className="font-bold text-slate-700">{mistake.correction}</p>
                               </div>
                            </div>
                            <div className="bg-indigo-600 text-white p-4 rounded-2xl flex items-center gap-4">
                               <span className="text-2xl">💡</span>
                               <p className="text-sm font-bold">نصيحة الأستاذ: {mistake.tip}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}

                  {section.visualization && (
                    <MathVisualizer type={section.visualization} colorClass={chapter.color} />
                  )}

                  {section.example && (
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative">
                       <h5 className="font-black text-indigo-400 mb-6 text-right border-b border-white/10 pb-4">مثال تطبيقي شامل</h5>
                       <MathText text={section.example.problem} className="text-white text-xl font-bold mb-6" />
                       <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                          <p className="text-emerald-400 font-black mb-2">خطوات الحل:</p>
                          <MathText text={section.example.solution} className="text-indigo-100 font-medium" />
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
