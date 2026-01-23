
import React from 'react';

interface MathTextProps {
  text: string;
  className?: string;
}

const MathText: React.FC<MathTextProps> = ({ text, className = "" }) => {
  // Regex patterns
  // Improved fraction regex to allow spaces and more characters around the slash
  const fractionRegex = /([\w√π\(\)\+\-\*]+)\s*\/\s*([\w√π\(\)\+\-\*]+)/g;
  const rootRegex = /√(\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)|[\wπ]+)/g;

  // Function to render root elements with SVG Tick
  const renderRoot = (content: string, key: string) => {
    const radicand = content.startsWith('(') && content.endsWith(')') 
      ? content.slice(1, -1) 
      : content;
      
    return (
      <span key={key} className="math-root" dir="ltr">
        <svg className="math-root-tick" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M1 13.5L4.5 21L11 2" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span className="math-radicand">{processContent(radicand)}</span>
      </span>
    );
  };

  // Process text to find roots and fractions
  const processContent = (str: string): React.ReactNode[] => {
    if (!str) return [];
    
    const parts = str.split(rootRegex);
    const result: React.ReactNode[] = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Plain text parts - might contain fractions
        const subParts = parts[i].split(fractionRegex);
        for (let j = 0; j < subParts.length; j++) {
          if (j % 3 === 0) {
            if (subParts[j]) {
              // Replace common math operators with better looking symbols for text parts
              const formattedText = subParts[j]
                .replace(/\*/g, ' × ')
                .replace(/\+/g, ' + ')
                .replace(/-/g, ' - ')
                .replace(/=/g, ' = ');
              result.push(<span key={`txt-${i}-${j}`}>{formattedText}</span>);
            }
          } else if (j % 3 === 1) {
            const num = subParts[j];
            const den = subParts[j + 1];
            result.push(
              <span key={`frac-${i}-${j}`} className="math-fraction">
                <span className="num">{processContent(num)}</span>
                <span className="frac-line"></span>
                <span className="den">{processContent(den)}</span>
              </span>
            );
            j++;
          }
        }
      } else {
        // Root parts
        result.push(renderRoot(parts[i], `root-${i}`));
      }
    }
    return result;
  };

  return (
    <div className={className}>
      {processContent(text)}
    </div>
  );
};

export default MathText;
