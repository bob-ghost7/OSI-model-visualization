import React, { useState } from 'react';
import TheoryView from './components/TheoryView';
import EngineeringView from './components/EngineeringView';
import PhysicalLayerViz from './components/PhysicalLayerViz';

type ViewState = 'theory' | 'engineering' | 'physical-viz';

const App: React.FC = () => {
  // Using a single view state allows full page transitions
  const [currentView, setCurrentView] = useState<ViewState>('theory');

  // Navigation helpers
  const navigateTo = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigateTo('theory')}
            >
              <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-indigo-200 shadow-lg">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">NetLayers</h1>
                <p className="text-xs text-slate-500">网络七层模型 vs 现实世界</p>
              </div>
            </div>
            
            {/* Desktop Tabs (Only visible when not in detailed visualization mode) */}
            {currentView !== 'physical-viz' && (
                <nav className="hidden md:flex space-x-8">
                <button
                    onClick={() => navigateTo('theory')}
                    className={`
                    px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${currentView === 'theory' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}
                    `}
                >
                    🌐 OSI vs TCP/IP (理论)
                </button>
                <button
                    onClick={() => navigateTo('engineering')}
                    className={`
                    px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${currentView === 'engineering' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}
                    `}
                >
                    🏗️ 三层网络 (工程)
                </button>
                </nav>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Tabs (Only visible when not in detailed visualization mode) */}
      {currentView !== 'physical-viz' && (
        <div className="md:hidden bg-white border-b border-slate-200 sticky top-16 z-40">
            <div className="grid grid-cols-2">
                <button
                    onClick={() => navigateTo('theory')}
                    className={`p-3 text-center text-sm font-semibold ${currentView === 'theory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
                >
                    OSI 理论
                </button>
                <button
                    onClick={() => navigateTo('engineering')}
                    className={`p-3 text-center text-sm font-semibold ${currentView === 'engineering' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
                >
                    三层工程
                </button>
            </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'theory' && (
            <TheoryView onViewPhysicalViz={() => navigateTo('physical-viz')} />
        )}
        {currentView === 'engineering' && <EngineeringView />}
        {currentView === 'physical-viz' && (
            <PhysicalLayerViz onBack={() => navigateTo('theory')} />
        )}
      </main>
    </div>
  );
};

export default App;
