
import React, { useState } from 'react';
import { VisualizationType } from '../types';

interface MathVisualizerProps {
  type: VisualizationType;
  colorClass: string;
}

const MathVisualizer: React.FC<MathVisualizerProps> = ({ type, colorClass }) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const renderThales = () => (
    <div className="relative w-full aspect-video bg-white rounded-3xl border border-slate-100 shadow-inner flex items-center justify-center overflow-hidden group">
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-md">
        {/* Intersecting Lines */}
        <line x1="50" y1="250" x2="350" y2="50" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="50" y1="250" x2="350" y2="250" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Parallel Lines */}
        <line 
          x1="150" y1="250" x2="200" y2="150" 
          stroke={hoveredPart === 'small' || hoveredPart === 'parallel' ? '#4f46e5' : '#94a3b8'} 
          strokeWidth="3" 
          className="transition-colors duration-300"
          onMouseEnter={() => setHoveredPart('parallel')}
          onMouseLeave={() => setHoveredPart(null)}
        />
        <line 
          x1="250" y1="250" x2="325" y2="67" 
          stroke={hoveredPart === 'large' || hoveredPart === 'parallel' ? '#4f46e5' : '#94a3b8'} 
          strokeWidth="3"
          className="transition-colors duration-300"
          onMouseEnter={() => setHoveredPart('parallel')}
          onMouseLeave={() => setHoveredPart(null)}
        />

        {/* Points */}
        <circle cx="50" cy="250" r="5" fill="#1e293b" /> {/* A */}
        <text x="40" y="270" className="text-sm font-bold fill-slate-800">A</text>
        
        <circle cx="150" cy="250" r="4" fill="#4f46e5" /> {/* B */}
        <text x="145" y="270" className="text-sm font-bold fill-indigo-600">B</text>
        
        <circle cx="250" cy="250" r="4" fill="#4f46e5" /> {/* C */}
        <text x="245" y="270" className="text-sm font-bold fill-indigo-600">C</text>
        
        <circle cx="200" cy="150" r="4" fill="#4f46e5" /> {/* M */}
        <text x="210" y="155" className="text-sm font-bold fill-indigo-600">M</text>
        
        <circle cx="325" cy="67" r="4" fill="#4f46e5" /> {/* N */}
        <text x="335" y="72" className="text-sm font-bold fill-indigo-600">N</text>

        {/* Labels for interactive ratios */}
        <g 
          className="cursor-pointer" 
          onMouseEnter={() => setHoveredPart('small')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <path d="M 55 255 L 145 255" stroke="#4f46e5" strokeWidth="2" opacity={hoveredPart === 'small' ? 1 : 0.2} />
          <text x="90" y="245" className={`text-[10px] font-bold fill-indigo-600 transition-opacity ${hoveredPart === 'small' ? 'opacity-100' : 'opacity-0'}`}>AB</text>
        </g>
        
        <g 
          className="cursor-pointer" 
          onMouseEnter={() => setHoveredPart('large')}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <path d="M 55 265 L 245 265" stroke="#7c3aed" strokeWidth="2" opacity={hoveredPart === 'large' ? 1 : 0.2} />
          <text x="140" y="280" className={`text-[10px] font-bold fill-purple-600 transition-opacity ${hoveredPart === 'large' ? 'opacity-100' : 'opacity-0'}`}>AC</text>
        </g>
      </svg>
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-100 flex justify-between">
         <span>مرر فوق الأضلاع لرؤية النسب</span>
         <span className="text-indigo-600">AB / AC = AM / AN = BM / CN</span>
      </div>
    </div>
  );

  const renderTrigo = () => (
    <div className="relative w-full aspect-video bg-white rounded-3xl border border-slate-100 shadow-inner flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-md">
        {/* Triangle */}
        <path 
          d="M 100 250 L 300 250 L 300 100 Z" 
          fill="none" 
          stroke="#cbd5e1" 
          strokeWidth="3" 
        />
        
        {/* Right Angle Square */}
        <path d="M 285 250 L 285 235 L 300 235" fill="none" stroke="#94a3b8" strokeWidth="2" />
        
        {/* Hypotenuse */}
        <path 
          d="M 100 250 L 300 100" 
          stroke={hoveredPart === 'hypotenuse' ? '#4f46e5' : '#94a3b8'} 
          strokeWidth="5" 
          className="cursor-pointer transition-colors duration-300"
          onMouseEnter={() => setHoveredPart('hypotenuse')}
          onMouseLeave={() => setHoveredPart(null)}
        />
        
        {/* Opposite Side */}
        <path 
          d="M 300 100 L 300 250" 
          stroke={hoveredPart === 'opposite' ? '#7c3aed' : '#94a3b8'} 
          strokeWidth="5" 
          className="cursor-pointer transition-colors duration-300"
          onMouseEnter={() => setHoveredPart('opposite')}
          onMouseLeave={() => setHoveredPart(null)}
        />
        
        {/* Adjacent Side */}
        <path 
          d="M 100 250 L 300 250" 
          stroke={hoveredPart === 'adjacent' ? '#10b981' : '#94a3b8'} 
          strokeWidth="5" 
          className="cursor-pointer transition-colors duration-300"
          onMouseEnter={() => setHoveredPart('adjacent')}
          onMouseLeave={() => setHoveredPart(null)}
        />

        {/* Angle Alpha */}
        <path d="M 140 250 A 40 40 0 0 0 132 225" fill="none" stroke="#4f46e5" strokeWidth="2" />
        <text x="145" y="240" className="text-sm font-bold fill-indigo-600">α</text>

        {/* Labels */}
        <text x="180" y="160" transform="rotate(-37, 180, 160)" className={`text-sm font-black fill-indigo-600 transition-opacity ${hoveredPart === 'hypotenuse' ? 'opacity-100' : 'opacity-20'}`}>الوتر</text>
        <text x="315" y="180" className={`text-sm font-black fill-purple-600 transition-opacity ${hoveredPart === 'opposite' ? 'opacity-100' : 'opacity-20'}`}>المقابل</text>
        <text x="180" y="280" className={`text-sm font-black fill-emerald-600 transition-opacity ${hoveredPart === 'adjacent' ? 'opacity-100' : 'opacity-20'}`}>المجاور</text>
      </svg>
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-100 shadow-sm space-y-2">
        <div className={`text-xs font-bold transition-all ${hoveredPart === 'hypotenuse' ? 'text-indigo-600 scale-105' : 'text-slate-400'}`}>الوتر: أطول ضلع</div>
        <div className={`text-xs font-bold transition-all ${hoveredPart === 'opposite' ? 'text-purple-600 scale-105' : 'text-slate-400'}`}>المقابل: الضلع المواجه للزاوية</div>
        <div className={`text-xs font-bold transition-all ${hoveredPart === 'adjacent' ? 'text-emerald-600 scale-105' : 'text-slate-400'}`}>المجاور: الضلع الملاصق للزاوية</div>
      </div>
    </div>
  );

  const renderVisual = () => {
    switch(type) {
      case 'THALES': return renderThales();
      case 'TRIGONOMETRY': return renderTrigo();
      default: return null;
    }
  };

  return (
    <div className="my-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2 h-6 rounded-full ${colorClass}`}></div>
        <h4 className="font-black text-slate-800">توضيح بصري تفاعلي:</h4>
      </div>
      {renderVisual()}
    </div>
  );
};

export default MathVisualizer;
