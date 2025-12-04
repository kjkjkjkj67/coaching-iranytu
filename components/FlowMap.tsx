import React from 'react';
import { MODELS } from '../constants';
import { ModelId } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface FlowMapProps {
  onSelectModel: (id: ModelId) => void;
}

const FlowMap: React.FC<FlowMapProps> = ({ onSelectModel }) => {
  // Ordered array based on the sequence in the PDF (Page 4)
  const sequence = [ModelId.SOCRATIC, ModelId.MI, ModelId.SOLUTION, ModelId.GROW];

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">A Négy Modell Egymás Mellett</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          "A sorrend is számít." A tréneri folyamatban ez egy csodálatosan átlátható ívet alkot: 
          belső tisztázás → érzelmi rendezés → erőforrás → haladás.
        </p>
      </div>

      <div className="hidden md:flex justify-between items-stretch gap-4 relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2 rounded-full" />
        
        {sequence.map((id, index) => {
          const model = MODELS[id];
          const Icon = model.icon;
          const isLast = index === sequence.length - 1;

          return (
            <div key={id} className="flex-1 flex flex-col items-center group relative">
              <button
                onClick={() => onSelectModel(id)}
                className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 z-10
                  bg-white border-2 border-${model.color}-500 text-${model.color}-600 mb-4
                  hover:bg-${model.color}-50
                `}
              >
                <Icon size={32} strokeWidth={1.5} />
              </button>

              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 w-full h-full flex flex-col transition-all duration-300 hover:shadow-md cursor-pointer" onClick={() => onSelectModel(id)}>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {index + 1}. Lépés
                </div>
                <h3 className={`font-bold text-${model.color}-700 mb-2`}>{model.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {model.sequenceDescription}
                </p>
              </div>

              {!isLast && (
                <div className="absolute top-8 -right-[calc(1rem+2px)] transform -translate-y-1/2 z-0 hidden lg:block text-gray-300">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {sequence.map((id, index) => {
          const model = MODELS[id];
          const Icon = model.icon;
          return (
            <div key={id} className="flex flex-col items-center">
               <button
                onClick={() => onSelectModel(id)}
                className={`w-full bg-white p-4 rounded-xl shadow-sm border-l-4 border-${model.color}-500 flex items-center gap-4 active:scale-95 transition-transform`}
              >
                <div className={`p-3 rounded-full bg-${model.color}-50 text-${model.color}-600`}>
                  <Icon size={24} />
                </div>
                <div className="text-left flex-1">
                   <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {index + 1}. Lépés
                  </div>
                  <h3 className="font-bold text-gray-800">{model.title}</h3>
                  <p className="text-sm text-gray-500">{model.sequenceDescription}</p>
                </div>
                <ArrowRight className="text-gray-300" size={20} />
              </button>
              {index < sequence.length - 1 && (
                <ChevronDown className="text-gray-300 my-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowMap;