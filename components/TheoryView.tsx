import React, { useState } from 'react';
import { OSI_LAYERS, TCP_LAYERS } from '../constants';
import { LayerInfo } from '../types';
import LayerCard from './LayerCard';
import TcpLayerBlock from './TcpLayerBlock';
import DetailPanel from './DetailPanel';

interface TheoryViewProps {
    onViewPhysicalViz: () => void;
}

const TheoryView: React.FC<TheoryViewProps> = ({ onViewPhysicalViz }) => {
  const [selectedLayer, setSelectedLayer] = useState<LayerInfo | null>(null);
  
  // Hover states to track relationships
  const [hoveredOsiId, setHoveredOsiId] = useState<number | null>(null);
  const [hoveredTcpIndex, setHoveredTcpIndex] = useState<number | null>(null);

  // Logic to determine which layers are highlighted based on relationship
  const getHighlighedState = () => {
    if (hoveredOsiId !== null) {
        // If hovering an OSI layer, highlight it AND its parent TCP layer AND siblings in that group
        const tcpIndex = TCP_LAYERS.findIndex(t => t.osiMapping.includes(hoveredOsiId));
        if (tcpIndex !== -1) {
            return {
                activeOsiIds: TCP_LAYERS[tcpIndex].osiMapping,
                activeTcpIndex: tcpIndex
            };
        }
        return { activeOsiIds: [hoveredOsiId], activeTcpIndex: null };
    }

    if (hoveredTcpIndex !== null) {
        // If hovering a TCP layer, highlight it AND all its mapped OSI layers
        return {
            activeOsiIds: TCP_LAYERS[hoveredTcpIndex].osiMapping,
            activeTcpIndex: hoveredTcpIndex
        };
    }

    return { activeOsiIds: [], activeTcpIndex: null };
  };

  const { activeOsiIds, activeTcpIndex } = getHighlighedState();
  const isAnyHovered = hoveredOsiId !== null || hoveredTcpIndex !== null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[calc(100vh-140px)]">
      
      {/* Column 1: OSI Model (Interactive) */}
      <div className="lg:col-span-4 flex flex-col h-full relative">
        <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span className="bg-indigo-600 text-white px-2 py-1 rounded text-sm shadow-sm">理想</span>
          OSI 七层模型
        </h2>
        <div className="flex-1 grid grid-rows-7 gap-2 relative z-10">
          {OSI_LAYERS.map((layer) => {
            const isRelated = activeOsiIds.includes(layer.id);
            // If something is hovered, and this is NOT related/active, it is dimmed.
            const isDimmed = isAnyHovered && !isRelated;
            
            return (
                <LayerCard
                key={layer.id}
                layer={layer}
                isActive={selectedLayer?.id === layer.id}
                isRelated={isRelated}
                isDimmed={isDimmed}
                onClick={setSelectedLayer}
                onMouseEnter={() => setHoveredOsiId(layer.id)}
                onMouseLeave={() => setHoveredOsiId(null)}
                />
            );
          })}
        </div>
      </div>

      {/* Connector Visual (Desktop Only) */}
      <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative">
        {/* This area acts as a visual gap/connector. We could put SVG arrows here if needed, 
            but the highlight effect handles the relationship visualization cleanly. */}
            {isAnyHovered && (
                <div className="absolute inset-y-4 left-0 right-0 flex items-center justify-center pointer-events-none">
                    <div className="h-full w-0.5 border-l-2 border-dashed border-slate-300/50"></div>
                </div>
            )}
      </div>

      {/* Column 2: TCP/IP Model (Mapping) */}
      <div className="lg:col-span-2 flex flex-col h-full">
        <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span className="bg-emerald-600 text-white px-2 py-1 rounded text-sm shadow-sm">现实</span>
          TCP/IP 四层
        </h2>
        <div className="flex-1 grid grid-rows-7 gap-2">
          {TCP_LAYERS.map((tcpLayer, idx) => {
            const isActive = activeTcpIndex === idx;
            const isDimmed = isAnyHovered && !isActive;

            return (
                <TcpLayerBlock 
                    key={idx} 
                    layer={tcpLayer} 
                    totalOsiHeight={7}
                    isHighlighted={isActive}
                    isDimmed={isDimmed}
                    onMouseEnter={() => setHoveredTcpIndex(idx)}
                    onMouseLeave={() => setHoveredTcpIndex(null)}
                />
            );
          })}
        </div>
      </div>

      {/* Column 3: Details Panel */}
      <div className="lg:col-span-5 h-full min-h-[400px] flex flex-col">
        <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
            <span className="text-slate-400">📝</span>
            层级详解
        </h2>
        <div className="flex-1 overflow-hidden">
            <DetailPanel 
                layer={selectedLayer} 
                onViewPhysicalViz={onViewPhysicalViz}
            />
        </div>
      </div>
    </div>
  );
};

export default TheoryView;
