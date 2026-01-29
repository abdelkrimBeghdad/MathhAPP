
import React from 'react';

interface MathTextProps {
  text: string;
  className?: string;
}

const MathText: React.FC<MathTextProps> = ({ text, className = "" }) => {
  // Regex patterns
  const fractionRegex = /([\w√π\(\)\+\-\*]+)\s*\/\s*([\w√π\(\)\+\-\*]+)/g;
  const rootRegex = /√(\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)|[\wπ]+)/g;
  const colorRegex = /\{#(\w+):([^}]+)\}/g;

  const colorMap: Record<string, string> = {
    blue: '#2563eb',
    red: '#dc2626',
    green: '#16a34a',
    orange: '#ea580c',
    indigo: '#4f46e5',
    purple: '#9333ea',
    slate: '#475569'
  };

  const renderRoot = (content: string, key: string) => {
    const radicand = content.startsWith('(') && content.endsWith(')') 
      ? content.slice(1, -1) 
      : content;
      
    return (
      <span key={key} className="math-root" dir="ltr">
        <svg className="math-root-tick" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', width: '0.8em', verticalAlign: 'middle' }}>
          <path 
            d="M1 13.5L4.5 21L11 2" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className="math-radicand" style={{ borderTop: '2px solid currentColor', paddingRight: '2px' }}>{processContent(radicand)}</span>
      </span>
    );
  };

  const processContent = (str: string): React.ReactNode[] => {
    if (!str) return [];
    
    // First, handle colors
    const colorParts = str.split(colorRegex);
    const result: React.ReactNode[] = [];

    for (let c = 0; c < colorParts.length; c++) {
      if (c % 3 === 0) {
        // Normal text, process roots and fractions
        const textSegment = colorParts[c];
        const rootParts = textSegment.split(rootRegex);
        
        for (let i = 0; i < rootParts.length; i++) {
          if (i % 2 === 0) {
            const subParts = rootParts[i].split(fractionRegex);
            for (let j = 0; j < subParts.length; j++) {
              if (j % 3 === 0) {
                if (subParts[j]) {
                  const formattedText = subParts[j]
                    .replace(/\*/g, ' × ')
                    .replace(/\+/g, ' + ')
                    .replace(/-/g, ' - ')
                    .replace(/=/g, ' = ');
                  result.push(<span key={`txt-${c}-${i}-${j}`}>{formattedText}</span>);
                }
              } else if (j % 3 === 1) {
                const num = subParts[j];
                const den = subParts[j + 1];
                result.push(
                  <span key={`frac-${c}-${i}-${j}`} className="math-fraction">
                    <span className="num">{processContent(num)}</span>
                    <span className="frac-line"></span>
                    <span className="den">{processContent(den)}</span>
                  </span>
                );
                j++;
              }
            }
          } else {
            result.push(renderRoot(rootParts[i], `root-${c}-${i}`));
          }
        }
      } else if (c % 3 === 1) {
        // This is the color name
        const colorName = colorParts[c];
        const colorText = colorParts[c + 1];
        result.push(
          <span key={`color-${c}`} style={{ color: colorMap[colorName] || colorName }}>
            {processContent(colorText)}
          </span>
        );
        c++; // Skip the text part as we used it
      }
    }
    return result;
  };

  const lines = text.split('\n');

  return (
    <div className={className}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        const isStandaloneFormula = trimmed.includes('=') && (trimmed.includes('(') || trimmed.includes('²') || /[\w]/.test(trimmed));

        if (isStandaloneFormula) {
          return (
            <div 
              key={idx} 
              className="my-6 py-5 px-8 bg-slate-50 rounded-[2rem] text-center border-y-2 border-indigo-100/50 scale-105 transition-transform shadow-sm"
              dir="ltr"
            >
              <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tighter inline-block">
                {processContent(trimmed)}
              </span>
            </div>
          );
        }

        return (
          <div key={idx} className={idx < lines.length - 1 ? "mb-2" : ""}>
            {processContent(line)}
          </div>
        );
      })}
    </div>
  );
};

export default MathText;
