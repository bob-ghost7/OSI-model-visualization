import React, { useState } from 'react';
import { ENGINEERING_LAYERS } from '../constants';
import { EngineeringLayerInfo } from '../types';

const EngineeringView: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">工程里的“三层网络”</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
                现实网络工程不按七层搞，太啰嗦。工程师口中的“三层”通常指物理层、链路层和网络层。
                这是构建局域网和广域网的基石。
            </p>
        </div>

        <div className="space-y-0 relative">
            {/* Vertical Line Connector (Stack Backbone) */}
            <div className="absolute left-8 md:left-1/2 top-6 bottom-6 w-1.5 bg-slate-200 -z-10 transform md:-translate-x-1/2 rounded-full"></div>

            {ENGINEERING_LAYERS.map((layer, index) => (
                <div key={layer.level} className="relative">
                    
                    {/* Connector Arrow between layers */}
                    {index > 0 && (
                        <div className="h-12 flex justify-center items-center">
                            <div className="bg-slate-100 border border-slate-300 text-slate-400 text-[10px] px-2 py-1 rounded-full shadow-sm z-0 flex items-center gap-1">
                                <span>Encapsulation</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                            </div>
                        </div>
                    )}

                    <div 
                        className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 group ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                        onMouseEnter={() => setHoveredId(layer.level)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {/* Visual Icon/Badge */}
                        <div className="flex-shrink-0 relative group-hover:-translate-y-1 transition-transform duration-300">
                            <div className={`
                                w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-3xl shadow-lg z-10 relative border-4 border-white
                                ${layer.color} transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105
                            `}>
                                {layer.level}
                            </div>
                            {/* Ping animation ring */}
                            {hoveredId === layer.level && (
                                <span className={`absolute top-0 left-0 w-full h-full rounded-full ${layer.color} opacity-50 animate-ping`}></span>
                            )}
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 w-full md:w-auto pb-4">
                            <div className={`
                                bg-white p-6 rounded-xl shadow-md border-l-8 transition-all duration-300 relative overflow-hidden
                                ${hoveredId === layer.level ? 'shadow-xl translate-x-0 md:translate-x-2 ring-1 ring-slate-200' : ''}
                            `} style={{ borderLeftColor: layer.color.replace('bg-', 'var(--tw-colors-') }}> 
                                
                                {/* Background Decoration */}
                                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-5 ${layer.color}`}></div>

                                <div className="flex justify-between items-start mb-3 relative z-10">
                                    <h3 className="text-xl font-bold text-slate-800">{layer.name}</h3>
                                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-mono border border-slate-200">{layer.device}</span>
                                </div>
                                
                                <p className="text-slate-600 mb-4 relative z-10">{layer.description}</p>

                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {layer.concepts.map(c => (
                                        <span key={c} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-500 group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-100 shadow-sm">
            <h3 className="text-xl font-bold text-indigo-800 mb-6 text-center flex items-center justify-center gap-2">
                <span>🧠</span>
                核心精炼总结
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                    <div className="text-indigo-600 font-bold text-lg mb-2">1-3 层：网络基础</div>
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">硬件 + 路由</div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        <span className="font-semibold text-slate-800">物理层</span> 负责信号；<br/>
                        <span className="font-semibold text-slate-800">链路层</span> 负责局域网/MAC；<br/>
                        <span className="font-semibold text-slate-800">网络层</span> 负责路由/IP。
                    </p>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-100">
                    <div className="text-amber-600 font-bold text-lg mb-2">4 层：端到端大脑</div>
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">可靠 vs 快速</div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        <span className="font-semibold text-slate-800">TCP</span>：要可靠、有序、无丢包；<br/>
                        <span className="font-semibold text-slate-800">UDP</span>：要快速、轻量、不保证到达。
                    </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100">
                    <div className="text-rose-600 font-bold text-lg mb-2">5-7 层：应用逻辑</div>
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">软件层</div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        <span className="font-semibold text-slate-800">会话层</span>：维持连接；<br/>
                        <span className="font-semibold text-slate-800">表示层</span>：格式转换/加密；<br/>
                        <span className="font-semibold text-slate-800">应用层</span>：Web、DNS 等直接服务。
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EngineeringView;