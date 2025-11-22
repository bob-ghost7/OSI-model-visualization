import React from 'react';
import { TcpLayerInfo } from '../types';

interface TcpLayerBlockProps {
  layer: TcpLayerInfo;
  totalOsiHeight: number; // In row units
  isDimmed?: boolean;
  isHighlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const TcpLayerBlock: React.FC<TcpLayerBlockProps> = ({ 
  layer, 
  isDimmed = false,
  isHighlighted = false,
  onMouseEnter,
  onMouseLeave
}) => {
  // Calculate span based on number of OSI layers mapped
  const span = layer.osiMapping.length;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        flex flex-col justify-center items-center p-4 rounded-lg text-white text-center shadow-md transition-all duration-300
        ${layer.color}
        ${isDimmed ? 'opacity-30 grayscale scale-95 blur-[1px]' : 'opacity-100'}
        ${isHighlighted ? 'scale-[1.03] shadow-xl ring-2 ring-offset-2 ring-emerald-400 z-10' : 'hover:scale-[1.02]'}
      `}
      style={{
        gridRow: `span ${span}`, // CSS Grid magic to span multiple rows
      }}
    >
      <h3 className="font-bold text-xl">{layer.name}</h3>
      
      {/* Visual Mapping Indicators */}
      <div className="flex gap-1 mt-1 mb-1">
        {layer.osiMapping.map(m => (
            <span key={m} className={`
                text-[10px] px-1.5 rounded-sm font-mono
                ${isHighlighted ? 'bg-white text-slate-800 font-bold' : 'bg-white/20 text-white'}
            `}>
                {m}
            </span>
        ))}
      </div>

      <p className={`text-xs mt-1 px-2 opacity-90 leading-relaxed hidden md:block transition-opacity ${isHighlighted ? 'opacity-100' : 'opacity-80'}`}>
        {layer.description}
      </p>
      
      {isHighlighted && (
         <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      )}
    </div>
  );
};

export default TcpLayerBlock;