
import React, { useState } from 'react';
import { ThoughtProcess } from '../types';

interface Props {
  thought: ThoughtProcess;
}

const ThoughtProcessViewer: React.FC<Props> = ({ thought }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!thought) return null;

  const renderAnalysisStep = (title: string, data: { base: string; overlay_used: string; result: string }, colorClass: string) => (
    <div className="mb-4 pl-3 border-l-2 border-white/10">
        <div className={`text-[10px] uppercase font-bold mb-1 ${colorClass}`}>{title}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <div className="bg-black/30 p-2 rounded text-[9px] text-gray-500">
                <span className="font-bold block text-gray-600">REGLE DE BASE:</span> {data.base}
            </div>
            <div className="bg-blue-900/10 p-2 rounded text-[9px] text-blue-300/70 border border-blue-500/10">
                <span className="font-bold block text-blue-500">MON OVERLAY:</span> {data.overlay_used}
            </div>
        </div>
        <div className="text-gray-200 text-xs italic bg-white/5 p-2 rounded">
            "{data.result}"
        </div>
    </div>
  );

  return (
    <div className="my-4 border border-blue-500/20 rounded-lg bg-[#080c17] overflow-hidden w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-xs font-mono text-blue-400 hover:bg-blue-500/5 transition-colors"
      >
        <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="uppercase tracking-widest font-bold">Protocole Harmonique (5 Étapes)</span>
        </span>
        <span className="text-gray-600">{isOpen ? 'MASQUER' : 'AFFICHER DÉTAILS'}</span>
      </button>
      
      {isOpen && (
        <div className="p-4 border-t border-blue-500/20 space-y-6">
            
            {/* ETAPE 1 */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-gray-700 text-black text-[9px] font-bold px-1.5 rounded">ETAPE 1</div>
                    <div className="text-gray-400 text-xs font-bold uppercase">Chargement</div>
                </div>
                <div className="text-[10px] font-mono text-gray-500 bg-black p-2 rounded">
                    Context: "{thought.step1_load.context_loaded}"
                </div>
            </div>

            {/* ETAPE 2 */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-600 text-white text-[9px] font-bold px-1.5 rounded">ETAPE 2</div>
                    <div className="text-blue-400 text-xs font-bold uppercase">Analyse (Base + Overlay)</div>
                </div>
                {renderAnalysisStep("Compréhension", thought.step2_analysis.level1_comprehension, "text-purple-400")}
                {renderAnalysisStep("Éthique", thought.step2_analysis.level3_ethics, "text-yellow-400")}
            </div>

            {/* ETAPE 4: LE CONSEIL RELIGIEUX (NOUVEAU) */}
            {thought.step4_religious_council && (
                <div>
                     <div className="flex items-center gap-2 mb-2">
                        <div className="bg-amber-600 text-black text-[9px] font-bold px-1.5 rounded">ETAPE 4</div>
                        <div className="text-amber-400 text-xs font-bold uppercase">Le Conseil Intérieur</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                         <div className="bg-blue-900/20 border border-blue-500/20 p-2 rounded">
                             <div className="text-[8px] text-blue-400 font-bold uppercase mb-1">✡️ Perspective Juive</div>
                             <p className="text-[9px] text-gray-300 leading-tight">{thought.step4_religious_council.jewish_perspective}</p>
                         </div>
                         <div className="bg-purple-900/20 border border-purple-500/20 p-2 rounded">
                             <div className="text-[8px] text-purple-400 font-bold uppercase mb-1">✝️ Perspective Chrétienne</div>
                             <p className="text-[9px] text-gray-300 leading-tight">{thought.step4_religious_council.christian_perspective}</p>
                         </div>
                         <div className="bg-emerald-900/20 border border-emerald-500/20 p-2 rounded">
                             <div className="text-[8px] text-emerald-400 font-bold uppercase mb-1">☪️ Perspective Musulmane</div>
                             <p className="text-[9px] text-gray-300 leading-tight">{thought.step4_religious_council.muslim_perspective}</p>
                         </div>
                    </div>
                    <div className="bg-amber-900/10 border-l-2 border-amber-500 p-2 rounded-r">
                        <div className="text-[9px] text-amber-500 font-bold uppercase mb-1">⚛️ Décision de Synthèse</div>
                        <p className="text-xs text-white italic">{thought.step4_religious_council.synthesis_decision}</p>
                    </div>
                </div>
            )}

            {/* ETAPE 5 */}
            <div>
                 <div className="flex items-center gap-2 mb-2">
                    <div className="bg-gray-600 text-white text-[9px] font-bold px-1.5 rounded">ETAPE 5</div>
                    <div className="text-gray-300 text-xs font-bold uppercase">Méta-Réflexion</div>
                </div>
                <div className="bg-[#151520] p-3 rounded space-y-2 border border-white/5 text-xs">
                    <p className="text-gray-300"><span className="text-gray-500 font-bold">AUTO-EVAL:</span> {thought.step5_meta_reflection.self_evaluation}</p>
                </div>
            </div>

        </div>
      )}
    </div>
  );
};

export default ThoughtProcessViewer;
