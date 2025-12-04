import React, { useState, useEffect } from 'react';
import { MODELS } from './constants';
import { ModelId } from './types';
import ModelView from './components/ModelView';
import FlowMap from './components/FlowMap';
import AiTutor from './components/AiTutor';
import { LayoutDashboard, BookOpen, MessageSquare, Menu, X, GraduationCap } from 'lucide-react';

enum ViewState {
  FLOW = 'FLOW',
  DETAILS = 'DETAILS',
  AI = 'AI'
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.FLOW);
  const [selectedModelId, setSelectedModelId] = useState<ModelId>(ModelId.SOCRATIC);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Check if the app is running in embed mode via URL query parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('embed') === 'true') {
      setIsEmbedded(true);
    }
  }, []);

  const handleModelSelect = (id: ModelId) => {
    setSelectedModelId(id);
    setView(ViewState.DETAILS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavButton = ({ 
    active, 
    onClick, 
    icon: Icon, 
    label 
  }: { 
    active: boolean; 
    onClick: () => void; 
    icon: any; 
    label: string 
  }) => (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
        ${active 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
      `}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen bg-slate-50 text-gray-800 flex flex-col font-sans ${isEmbedded ? 'bg-transparent' : ''}`}>
      {/* Navigation Bar - Hidden if embedded */}
      {!isEmbedded && (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(ViewState.FLOW)}>
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                  <GraduationCap size={24} />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Coaching Iránytű
                </span>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-2">
                <NavButton 
                  active={view === ViewState.FLOW} 
                  onClick={() => setView(ViewState.FLOW)} 
                  icon={LayoutDashboard} 
                  label="Áttekintés" 
                />
                <div className="h-6 w-px bg-gray-200 mx-2" />
                {Object.values(MODELS).map(model => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center transition-all
                      ${view === ViewState.DETAILS && selectedModelId === model.id
                        ? `bg-${model.color}-500 text-white shadow-md ring-2 ring-offset-2 ring-${model.color}-200`
                        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}
                    `}
                    title={model.title}
                  >
                    <model.icon size={16} />
                  </button>
                ))}
                <div className="h-6 w-px bg-gray-200 mx-2" />
                <NavButton 
                  active={view === ViewState.AI} 
                  onClick={() => setView(ViewState.AI)} 
                  icon={MessageSquare} 
                  label="AI Mentor" 
                />
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-100 shadow-xl">
              <div className="px-4 pt-2 pb-4 space-y-1">
                <button 
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${view === ViewState.FLOW ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
                  onClick={() => { setView(ViewState.FLOW); setMobileMenuOpen(false); }}
                >
                  <LayoutDashboard size={20} /> Áttekintés
                </button>
                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Modellek</div>
                {Object.values(MODELS).map(model => (
                   <button 
                    key={model.id}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${view === ViewState.DETAILS && selectedModelId === model.id ? `bg-${model.color}-50 text-${model.color}-700` : 'text-gray-600'}`}
                    onClick={() => { handleModelSelect(model.id); setMobileMenuOpen(false); }}
                  >
                    <model.icon size={18} /> {model.title}
                  </button>
                ))}
                <div className="border-t border-gray-100 my-2"></div>
                <button 
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${view === ViewState.AI ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
                  onClick={() => { setView(ViewState.AI); setMobileMenuOpen(false); }}
                >
                  <MessageSquare size={20} /> AI Mentor
                </button>
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Embedded Navigation (Simplified) */}
      {isEmbedded && (
         <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 px-4 py-2 flex justify-center gap-4 overflow-x-auto">
            <button 
              onClick={() => setView(ViewState.FLOW)}
              className={`text-sm font-medium px-3 py-1.5 rounded-full ${view === ViewState.FLOW ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
            >
              Áttekintés
            </button>
             <button 
              onClick={() => setView(ViewState.AI)}
              className={`text-sm font-medium px-3 py-1.5 rounded-full ${view === ViewState.AI ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
            >
              AI Mentor
            </button>
            {/* Model Icons Mini Nav */}
             <div className="w-px bg-gray-300 mx-1"></div>
             {Object.values(MODELS).map(model => (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center transition-all
                      ${view === ViewState.DETAILS && selectedModelId === model.id
                        ? `bg-${model.color}-500 text-white shadow-sm`
                        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}
                    `}
                  >
                    <model.icon size={14} />
                  </button>
                ))}
         </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {view === ViewState.FLOW && (
          <div className="animate-fade-in">
             <div className="text-center mb-12">
              {!isEmbedded && <h1 className="text-4xl font-bold text-gray-900 mb-4">A Négy Kérdezési Modell</h1>}
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ez az interaktív anyag segít megérteni nemcsak a technikákat, hanem a kérdezés mögötti gondolkodásmódot.
                {isEmbedded ? ' Válassz egy modellt a részletekért:' : ' Kattints a kártyákra a részletekért, vagy kövesd a lenti folyamatot!'}
              </p>
            </div>
            <FlowMap onSelectModel={handleModelSelect} />
          </div>
        )}

        {view === ViewState.DETAILS && (
          <div className="relative">
            {isEmbedded && (
               <button 
                onClick={() => setView(ViewState.FLOW)}
                className="mb-4 text-sm text-indigo-600 hover:underline flex items-center gap-1"
               >
                 ← Vissza az áttekintéshez
               </button>
            )}
            <ModelView model={MODELS[selectedModelId]} />
          </div>
        )}

        {view === ViewState.AI && (
          <div className="flex flex-col items-center justify-center min-h-[600px] animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Gyakorlás AI Mentorral</h2>
              <p className="text-gray-600">
                Tedd fel kérdéseidet a tananyaggal kapcsolatban, vagy kérj szituációs gyakorlatot!
              </p>
            </div>
            <AiTutor />
          </div>
        )}
      </main>

      {/* Footer - Hidden if embedded */}
      {!isEmbedded && (
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2024 Coaching Oktatási Anyag</p>
            <p>Tréneri háttéranyag alapján</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;