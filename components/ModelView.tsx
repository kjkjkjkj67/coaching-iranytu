import React, { useState } from 'react';
import { CoachingModelData } from '../types';
import { User, Eye, Target, MessageCircle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ModelViewProps {
  model: CoachingModelData;
}

const ModelView: React.FC<ModelViewProps> = ({ model }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'practice'>('details');

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className={`bg-gradient-to-r from-${model.color}-50 to-white p-8 rounded-3xl mb-8 border border-${model.color}-100`}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`p-4 bg-${model.color}-100 rounded-2xl text-${model.color}-600 shadow-inner`}>
            <model.icon size={48} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 mb-2`}>{model.title}</h1>
            <p className={`text-xl text-${model.color}-600 font-medium`}>{model.subtitle}</p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white/60 rounded-xl border border-white/50">
          <p className="text-lg text-gray-700 italic">"{model.essence}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Coach Belső Működése */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <Eye className={`text-${model.color}-500`} />
            <h3 className="font-bold text-lg">A Coach Belső Működése</h3>
          </div>
          <ul className="space-y-3">
            {model.coachState.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                <div className={`min-w-1.5 h-1.5 mt-2 rounded-full bg-${model.color}-400`} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: Mire Való? */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <Target className={`text-${model.color}-500`} />
            <h3 className="font-bold text-lg">Mire Való?</h3>
          </div>
          <ul className="space-y-3">
            {model.utility.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                 <div className={`min-w-1.5 h-1.5 mt-2 rounded-full bg-${model.color}-400`} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Mit él át a Kliens? */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <User className={`text-${model.color}-500`} />
            <h3 className="font-bold text-lg">Mit él át a Kliens?</h3>
          </div>
          <ul className="space-y-3">
            {model.clientExperience.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                 <div className={`min-w-1.5 h-1.5 mt-2 rounded-full bg-${model.color}-400`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Focus Area: Typical Quote & Best Use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`bg-${model.color}-600 text-white p-8 rounded-3xl relative overflow-hidden group`}>
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/2 -translate-y-1/2">
            <MessageCircle size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Tipikus Mondat</h3>
            <p className="text-2xl md:text-3xl font-serif italic leading-tight">
              {model.typicalQuote}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden">
           <div className="absolute bottom-0 right-0 p-8 opacity-10">
            <CheckCircle2 size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Mikor a legjobb választás?</h3>
            <p className="text-lg md:text-xl text-gray-200">
              {model.bestUsedWhen}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelView;