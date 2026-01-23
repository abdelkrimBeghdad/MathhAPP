
import React, { useState } from 'react';

const InteractivePlayground: React.FC = () => {
  const [pointM, setPointM] = useState({ x: 150, y: 150 });
  const [isDragging, setIsDragging] = useState(false);

  // Constants for Thales Triangle
  const A = { x: 50, y: 250 };
  const B = { x: 350, y: 250 };
  const C = { x: 350, y: 50 };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Constraint: M must stay on AB
    if (x >= 50 && x <= 350) {
      setPointM({ x, y: 250 });
    }
  };

  // Calculate N based on M (Parallelism M-N // B-C)
  // ratio = AM / AB = AN / AC
  const ratio = (pointM.x - A.x) / (B.x - A.x);
  const pointN = {
    x: A.x + (C.x - A.x) * ratio,
    y: A.y + (C.y - A.y) * ratio
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
        <div className="text-right mb-10">
          <h2 className="text-3xl font-black text-slate-800">🌀 مختبر طالس التفاعلي</h2>
          <p className="text-slate-500 font-bold mt-2">اسحب النقطة الزرقاء M ولاحظ كيف تظل النسب متساوية دائماً!</p>
        </div>

        <div className="relative aspect-video bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-200 overflow-hidden">
          <svg 
            viewBox="0 0 400 300" 
            className="w-full h-full cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {/* Main Triangle ABC */}
            <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} fill="none" stroke="#cbd5e1" strokeWidth="2" />
            
            {/* Parallel Line MN */}
            <line x1={pointM.x} y1={pointM.y} x2={pointN.x} y2={pointN.y} stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
            
            {/* Labels */}
            <text x={A.x-20} y={A.y+10} className="text-xs font-black fill-slate-800">A</text>
            <text x={B.x+10} y={B.y+10} className="text-xs font-black fill-slate-800">B</text>
            <text x={C.x+10} y={C.y-10} className="text-xs font-black fill-slate-800">C</text>
            
            <text x={pointM.x} y={pointM.y+25} className="text-xs font-black fill-indigo-600">M</text>
            <text x={pointN.x-20} y={pointN.y-10} className="text-xs font-black fill-indigo-600">N</text>

            {/* Draggable Point M */}
            <circle 
              cx={pointM.x} cy={pointM.y} r="10" 
              fill="#4f46e5" 
              className="cursor-pointer hover:scale-125 transition-transform"
              onMouseDown={() => setIsDragging(true)}
            />
            <circle cx={pointN.x} cy={pointN.y} r="6" fill="#7c3aed" />
          </svg>

          {/* Real-time Math Panel */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 space-y-4 min-w-[200px]">
             <div className="text-center border-b pb-2">
                <span className="text-[10px] font-black text-indigo-600 uppercase">النسبة الحالية</span>
                <div className="text-2xl font-black text-slate-800">{(ratio * 10).toFixed(2)}</div>
             </div>
             <div className="space-y-1 text-right">
                <div className="flex justify-between gap-4 text-xs font-bold">
                   <span className="text-indigo-600">{(pointM.x - A.x).toFixed(0)}</span>
                   <span className="text-slate-400">AM =</span>
                </div>
                <div className="flex justify-between gap-4 text-xs font-bold">
                   <span className="text-indigo-600">{(B.x - A.x).toFixed(0)}</span>
                   <span className="text-slate-400">AB =</span>
                </div>
             </div>
             <div className="pt-2 text-center text-xs font-black text-emerald-500 bg-emerald-50 rounded-xl p-2">
                AM / AB = AN / AC
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePlayground;
