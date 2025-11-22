import React from 'react';
import { LayerInfo } from '../types';

interface DetailPanelProps {
  layer: LayerInfo | null;
  onViewPhysicalViz?: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ layer, onViewPhysicalViz }) => {
  if (!layer) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white/50 rounded-xl p-8 text-slate-400 border-2 border-dashed border-slate-300">
        <span className="text-4xl mb-4">👈</span>
        <p className="text-lg">点击左侧 OSI 模型查看每一层的详情</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-slate-100">
      <div className={`p-6 ${layer.color} text-white`}>
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                    {layer.id}. {layer.name}
                </h2>
                <p className="text-lg opacity-90">{layer.enName}</p>
            </div>
            <div className="text-5xl drop-shadow-md">{layer.icon}</div>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        {/* Summary Section */}
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-indigo-500">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-1">总结</h3>
          <p className="text-xl font-medium text-slate-800">"{layer.summary}"</p>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">功能描述</h3>
          <p className="text-slate-700 leading-relaxed">{layer.description}</p>
        </div>

        {/* Protocols/Keywords */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">常见协议 / 关键词</h3>
          <div className="flex flex-wrap gap-2">
            {layer.protocols.map((p) => (
              <span key={p} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Layer 1 Special Action Button */}
        {layer.id === 1 && onViewPhysicalViz && (
            <div className="mt-6 pt-6 border-t border-slate-100">
                <button 
                    onClick={onViewPhysicalViz}
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.01]"
                >
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                    <div className="relative flex items-center justify-between">
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-lg">👁️ 进入物理层“可视化”流程</span>
                            <span className="text-xs text-slate-300 font-light">查看信号如何从比特流变成电磁波</span>
                        </div>
                        <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default DetailPanel;