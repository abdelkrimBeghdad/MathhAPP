
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.lesson-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          setActiveSection(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
              <h3 className="font-black text-slate-800 mb-6 text-lg border-b pb-4">📍 مسار الموارد المعرفية</h3>
              <div className="space-y-1 relative">
                <div className="absolute right-[11px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
                {chapter.detailedContent.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`w-full text-right py-4 pr-8 relative text-sm transition-all flex items-center group ${
                      activeSection === idx ? 'text-indigo-600 font-black' : 'text-slate-400 font-bold'
                    }`}
                  >
                    <div className={`absolute right-0 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 transition-colors ${
                      activeSection === idx ? 'bg-indigo-600' : 'bg-slate-200 group-hover:bg-indigo-200'
                    }`}></div>
                    {section.subtitle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-16">
          {chapter.detailedContent.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="lesson-section scroll-mt-24">
              <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-10 flex items-start justify-between border-b border-slate-50 bg-slate-50/50">
                  <div className="text-right space-y-2">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase shadow-lg ${chapter.color}`}>
                      المورد المعرفي رقم {idx + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800">{section.subtitle}</h3>
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-12 text-right">
                  {/* Explanation Section */}
                  <div className="space-y-6">
                     <div className="flex items-center gap-3 justify-end text-indigo-600">
                        <h4 className="font-black text-xl">💡 شرح المورد (حوصلة)</h4>
                        <span className="text-2xl">📘</span>
                     </div>
                     <div className="bg-slate-50 p-8 rounded-[2rem] border-r-8 border-indigo-500 shadow-inner">
                        <MathText text={section.explanation} className="prose max-w-none text-slate-700 leading-loose text-lg font-medium" />
                     </div>
                  </div>

                  {section.visualization && (
                    <MathVisualizer type={section.visualization} colorClass={chapter.color} />
                  )}

                  {/* Example & Solution Section */}
                  {section.example && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                      <div className="flex items-center gap-3 justify-end text-emerald-600">
                        <h4 className="font-black text-xl">📝 تطبيق وإعادة استثمار</h4>
                        <span className="text-2xl">✍️</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white border-2 border-emerald-100 p-8 rounded-[2rem] shadow-sm relative overflow-hidden group">
                           <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                           <h5 className="font-black text-emerald-700 mb-4 flex items-center gap-2 justify-end">
                              <span>السؤال / الوضعية</span>
                              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                           </h5>
                           <MathText text={section.example.problem} className="text-slate-800 text-xl font-bold leading-relaxed" />
                        </div>

                        <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl relative">
                           <div className="absolute top-4 left-6 flex gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></span>
                           </div>
                           <h5 className="font-black text-indigo-400 mb-6 flex items-center gap-2 justify-end border-b border-white/10 pb-4">
                              <span>الحل النموذجي المقترح</span>
                              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                           </h5>
                           <MathText text={section.example.solution} className="text-indigo-50 text-xl leading-loose font-bold" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Footer of lesson card */}
                <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
                   <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">نهاية المورد المعرفي - برافو يا بطل! 👏</p>
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
