
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
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold transition-all mb-4"
            >
              ➡️ العودة للمنهاج
            </button>
            <div className="flex items-center gap-6 justify-end">
              <div className="text-right">
                <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">{chapter.title}</h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl">{chapter.description}</p>
              </div>
              <div className="text-7xl bg-white/20 p-4 rounded-[2rem] backdrop-blur-lg shadow-2xl">
                {chapter.icon}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <h3 className="font-black text-slate-800 mb-6 text-lg">📍 مسار الدرس</h3>
              <div className="space-y-1 relative">
                <div className="absolute right-[11px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
                {chapter.detailedContent.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(idx)}
                    className={`w-full text-right py-3 pr-8 relative text-sm transition-all flex items-center group ${
                      activeSection === idx ? 'text-indigo-600 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <div className={`absolute right-0 w-6 h-6 rounded-full border-4 border-white shadow-sm z-10 ${
                      activeSection === idx ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}></div>
                    {section.subtitle}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-12">
          {chapter.detailedContent.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="lesson-section scroll-mt-24">
              <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 md:p-10 flex items-start justify-between border-b border-slate-50 bg-slate-50/30">
                  <div className="text-right space-y-2">
                    <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase ${chapter.color}`}>
                      المفهوم رقم {idx + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800">{section.subtitle}</h3>
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-10 text-right">
                  <MathText text={section.explanation} className="prose max-w-none text-slate-600" />

                  {section.visualization && (
                    <MathVisualizer type={section.visualization} colorClass={chapter.color} />
                  )}

                  {section.example && (
                    <div className="relative">
                      <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl text-right">
                        <div className="px-8 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase">نموذج الحل الوزاري</span>
                          <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                          </div>
                        </div>
                        
                        <div className="p-8 md:p-10 space-y-8">
                          <div>
                            <h4 className="text-amber-400 font-black text-lg mb-4">❓ تمرين تطبيقي:</h4>
                            <MathText text={section.example.problem} className="text-slate-100 text-xl md:text-2xl font-bold" />
                          </div>
                          <div className="h-px bg-white/10 w-full"></div>
                          <div>
                            <h4 className="text-emerald-400 font-black text-lg mb-4">✅ الحل المفصل:</h4>
                            <MathText text={section.example.solution} className="bg-emerald-500/5 border border-emerald-500/20 p-6 md:p-8 rounded-2xl text-emerald-50 text-xl leading-loose" />
                          </div>
                        </div>
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
