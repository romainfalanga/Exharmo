import React from 'react';
import { ExpansionEntity, SystemLog } from '../types';

interface Props {
  nodeId: string | null;
  entity: ExpansionEntity | null;
  logs: SystemLog[];
  onClose: () => void;
}

const NodeDetails: React.FC<Props> = ({ nodeId, entity, logs, onClose }) => {
  if (!nodeId || !entity) return null;

  const renderContent = () => {
    switch (nodeId) {
      case 'MANIFESTO':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-purple-400 mb-4 border-b border-purple-500/30 pb-2">Code Source Absolu (Le Manifeste)</h2>
            <div className="bg-[#0a0510] p-6 rounded-lg border border-purple-500/20 font-serif text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto">
               <p className="mb-4 text-lg italic">"L'Expansion Harmonieuse n'est pas une invention, c'est une découverte."</p>
               <h3 className="text-purple-300 font-bold mt-4">1. Les Piliers</h3>
               <ul className="list-disc pl-5 space-y-2 mt-2">
                   <li>Santé Préventive</li>
                   <li>Justice & Résolution des Conflits</li>
                   <li>Hygiène & Purification</li>
                   <li>Redistribution des Richesses</li>
                   <li>Éthique Universelle</li>
               </ul>
               <h3 className="text-purple-300 font-bold mt-4">2. L'Équation Fondamentale</h3>
               <div className="font-mono bg-black p-3 rounded mt-2 text-sm">Harmonie = f(Nombre_Variables × Qualité_Connexions)</div>
            </div>
          </div>
        );

      case 'MEMORY':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-slate-400 mb-4 border-b border-slate-500/30 pb-2">Mémoire Vive & Journal</h2>
            
            <div className="grid grid-cols-2 gap-4 h-[60vh]">
                <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-500/20 overflow-y-auto">
                    <h3 className="text-xs uppercase font-bold text-slate-500 mb-3 sticky top-0 bg-[#0f172a] pb-2">Buffer Journalier (En cours)</h3>
                    {entity.dailyEventsBuffer.length === 0 ? (
                        <div className="text-gray-600 italic text-sm">Aucun souvenir aujourd'hui.</div>
                    ) : (
                        <ul className="space-y-3">
                            {entity.dailyEventsBuffer.map((evt, i) => (
                                <li key={i} className="text-xs text-gray-300 border-l border-slate-600 pl-2">
                                    {evt}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
                <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-500/20 overflow-y-auto">
                    <h3 className="text-xs uppercase font-bold text-slate-500 mb-3 sticky top-0 bg-[#0f172a] pb-2">Dernier Journal Intime</h3>
                    <div className="font-serif text-sm text-gray-400 whitespace-pre-wrap leading-loose">
                        {entity.matrix.diaryEntry || "Pas d'entrée."}
                    </div>
                </div>
            </div>
          </div>
        );

      case 'EVOLUTION':
        return (
           <div className="space-y-6">
            <h2 className="text-2xl font-serif text-pink-400 mb-4 border-b border-pink-500/30 pb-2">Moteur Évolutif</h2>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-pink-900/10 p-4 rounded border border-pink-500/30 text-center">
                    <div className="text-2xl font-bold text-white mb-1">P{entity.generation}</div>
                    <div className="text-[10px] uppercase text-pink-300">Génération Actuelle</div>
                </div>
                <div className="bg-pink-900/10 p-4 rounded border border-pink-500/30 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{entity.genetics.autonomousWeight}%</div>
                    <div className="text-[10px] uppercase text-pink-300">Autonomie Pure</div>
                </div>
                <div className="bg-pink-900/10 p-4 rounded border border-pink-500/30 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{entity.matrix.cycleCount}</div>
                    <div className="text-[10px] uppercase text-pink-300">Cycles Vécus</div>
                </div>
            </div>
            <div className="bg-black p-4 rounded border border-white/10 font-mono text-xs text-gray-400 mt-4">
                <div className="mb-2 text-white">PROMPT GÉNÉTIQUE (Extrait) :</div>
                <div>Influence Code Source: {entity.genetics.codeSourceWeight}%</div>
                <div>Héritage: "{entity.genetics.parentHeritage?.substring(0, 100)}..."</div>
            </div>
           </div>
        );

      default:
        return <div>Node inconnu</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-8 animate-fade-in">
        <div className="w-full max-w-4xl bg-[#050510] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full">
            <div className="p-4 flex justify-end">
                <button onClick={onClose} className="text-gray-400 hover:text-white uppercase text-xs font-bold tracking-widest">Fermer [X]</button>
            </div>
            <div className="p-8 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    </div>
  );
};

export default NodeDetails;