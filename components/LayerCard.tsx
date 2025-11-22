import React from 'react';
import { LayerInfo } from '../types';

interface LayerCardProps {
  layer: LayerInfo;
  onClick: (layer: LayerInfo) => void;
  isActive: boolean;
  isDimmed?: boolean;
  isRelated?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const LayerCard: React.FC<LayerCardProps> = ({ 
  layer, 
  onClick, 
  isActive, 
  isDimmed = false, 
  isRelated = false,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      onClick={() => onClick(layer)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-300 border
        ${isActive ? 'scale-105 shadow-xl z-20 ring-2 ring-offset-2 ring-indigo-500' : ''}
        ${isRelated && !isActive ? 'scale-102 shadow-lg z-10 ring-2 ring-offset-1 ring-indigo-300' : ''}
        ${isDimmed ? 'opacity-30 grayscale scale-95 blur-[1px]' : 'opacity-100'}
        ${!isActive && !isDimmed && !isRelated ? 'hover:scale-102 hover:shadow-md opacity-90 hover:opacity-100' : ''}
        ${layer.color} text-white border-transparent
      `}
      style={{ minHeight: '80px' }}
    >
      <div className="flex items-center gap-4">
        <span className={`text-2xl font-bold w-8 ${isRelated || isActive ? 'opacity-100' : 'opacity-50'}`}>{layer.id}</span>
        <div className="flex flex-col">
          <span className="text-lg font-bold">{layer.name}</span>
          <span className="text-xs uppercase opacity-80 tracking-wider">{layer.enName}</span>
        </div>
      </div>
      <div className="text-3xl">{layer.icon}</div>
      
      {/* Relationship Indicator Dot */}
      {isRelated && (
        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      )}
    </div>
  );
};

export default LayerCard;