import React from 'react';

interface PhysicalLayerVizProps {
  onBack: () => void;
}

const PhysicalLayerViz: React.FC<PhysicalLayerVizProps> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-slate-50 p-4 md:p-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-indigo-100"
      >
        <span>←</span> 返回理论视图
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">物理层“可视化”流程</h1>
          <p className="text-slate-500 text-lg">从比特流到电磁波，再回归比特流的奇妙旅程</p>
        </div>

        <div className="space-y-8 relative">
            {/* Connecting Line Background */}
            <div className="absolute left-8 md:left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-200 via-amber-300 to-emerald-200 -z-10 md:-translate-x-1/2 hidden md:block"></div>

            {/* 1. SENDER (Tx) */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden relative">
                <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span>📡</span> 发送端 (Tx)
                    </h2>
                    <span className="text-blue-100 text-sm font-mono">Digital → Analog</span>
                </div>
                
                <div className="p-6 md:p-10">
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 relative">
                        {/* Flow Line for Mobile */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -z-0 md:hidden"></div>

                        <Node title="比特流" icon="0101" start />
                        <Arrow />
                        <Node title="编码" sub="8b/10b / 64b/66b" />
                        <Arrow />
                        <Node title="调制映射" sub="QAM / PAM / PSK" />
                        <Arrow />
                        <Node title="DAC" sub="数模转换" highlight />
                        <Arrow />
                        <Node title="混频/驱动" sub="PA / 激光" />
                        <Arrow />
                        <div className="flex flex-col items-center z-10">
                             <div className="w-16 h-16 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shadow-lg border-4 border-white text-xs text-center leading-tight">
                                进入<br/>媒介
                             </div>
                        </div>
                    </div>
                    <p className="mt-6 text-slate-500 text-sm bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <span className="font-bold text-blue-700">核心逻辑：</span> 将计算机能理解的逻辑“0/1”转化为物理世界能传输的“波形/光脉冲”。
                    </p>
                </div>
            </div>

            {/* 2. CHANNEL (The Medium) */}
            <div className="relative py-8">
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                     <div className="w-full h-32 bg-amber-50/50 skew-y-1"></div>
                </div>
                
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-amber-200">
                        ⚡ 物理信道环境 (The Channel)
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['带宽限制', '衰减 (Attenuation)', '噪声 (Noise)', '多径效应', '色散 (Dispersion)', '串扰 (Crosstalk)', '频偏', '抖动 (Jitter)'].map((item, idx) => (
                            <div key={idx} className="bg-white p-3 rounded shadow-sm border-b-2 border-amber-300 text-slate-700 text-sm font-medium flex items-center justify-center h-12 hover:-translate-y-0.5 transition-transform cursor-help" title="信道损伤">
                                {item}
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-amber-700 font-medium">
                        信号在此阶段会发生畸变，变得“面目全非”。
                    </p>
                </div>
            </div>

            {/* 3. RECEIVER (Rx) */}
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden relative">
                <div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <span>📥</span> 接收端 (Rx)
                    </h2>
                    <span className="text-emerald-100 text-sm font-mono">Analog → Digital</span>
                </div>
                
                <div className="p-6 md:p-10">
                    <div className="flex flex-wrap gap-y-8 justify-center relative">
                        
                        {/* First Row */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
                             <div className="flex flex-col items-center z-10 mr-2">
                                <div className="w-14 h-14 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold border-4 border-white text-[10px] text-center leading-tight">
                                    来自<br/>媒介
                                </div>
                            </div>
                            <Arrow />
                            <Node title="LNA / TIA" sub="低噪放大" />
                            <Arrow />
                            <Node title="频率下变" sub="均衡 / 滤波" />
                            <Arrow />
                            <Node title="ADC" sub="模数转换" highlight />
                            <Arrow />
                            <Node title="CDR" sub="定时恢复" />
                        </div>

                        {/* Connector for visual flow wrapping (Desktop visually implied, logical only) */}
                        <div className="hidden md:flex w-full items-center justify-center opacity-30">
                            <span className="text-2xl">⬇️</span>
                        </div>

                        {/* Second Row */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
                             <Node title="符号判定" sub="判决" />
                             <Arrow />
                             <Node title="解映射" sub="Bits恢复" />
                             <Arrow />
                             <Node title="反编码" sub="去扰码" />
                             <Arrow />
                             <Node title="输出比特流" icon="1010" end />
                             <Arrow />
                             <div className="bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-lg px-3 py-2 text-xs text-emerald-700 font-bold">
                                上层校验<br/>(CRC)
                             </div>
                        </div>
                    </div>

                    <p className="mt-8 text-slate-500 text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-700">核心逻辑：</span> 在噪声中“猜”出原始信号，恢复出 0 和 1，并交给数据链路层。
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Node = ({ title, sub, icon, highlight, start, end }: { title: string, sub?: string, icon?: string, highlight?: boolean, start?: boolean, end?: boolean }) => {
    const bgColor = start ? 'bg-slate-800 text-white' : end ? 'bg-emerald-600 text-white' : highlight ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200';
    const textColor = start || end ? 'text-white' : highlight ? 'text-indigo-800' : 'text-slate-700';
    
    return (
        <div className={`
            relative flex flex-col items-center justify-center p-3 rounded-lg shadow-sm border min-w-[80px] md:min-w-[100px] h-20 md:h-24 transition-all hover:scale-105 z-10
            ${bgColor}
            ${start || end ? 'shadow-md ring-2 ring-offset-2 ring-transparent' : ''}
        `}>
            {icon && <div className="text-xs font-mono opacity-70 mb-1">{icon}</div>}
            <div className={`font-bold text-sm md:text-base text-center leading-tight ${textColor}`}>{title}</div>
            {sub && <div className={`text-[10px] md:text-xs mt-1 text-center ${start || end ? 'text-slate-200' : 'text-slate-400'}`}>{sub}</div>}
        </div>
    );
}

const Arrow = () => (
    <div className="text-slate-300 mx-1 font-bold text-xl hidden md:block">→</div>
);

export default PhysicalLayerViz;