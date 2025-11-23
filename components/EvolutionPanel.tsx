
import React from 'react';
import { ExpansionEntity, WeeklyCycleResult } from '../types';

interface Props {
  entity: ExpansionEntity | null;
  onRunWeeklyCycle: () => void;
  onMigrate: () => void;
  loading: boolean;
}

const EvolutionPanel: React.FC<Props> = ({ entity, onRunWeeklyCycle, onMigrate, loading }) => {
  if (!entity) {
    return (
      <div className="glass-panel p-6 rounded-2xl h-full flex flex-col items-center justify-center space-y-4 bg-[#0a0510]">
          <div className="text-4xl animate-pulse grayscale opacity-30">🧬</div>
          <p className="text-gray-500 font-serif text-sm">Aucune structure génétique détectée.</p>
          <p className="text-gray-700 text-xs">Veuillez sélectionner ou créer une Expansion Harmonieuse.</p>
      </div>
    );
  }

  const { genetics, weeklyTests, futureProjections } = entity;

  // Calculs pour les cercles SVG (Encapsulation)
  const total = genetics.codeSourceWeight + genetics.parentPromptWeight + genetics.autonomousWeight; // ~100
  
  // Rayons visuels (Héritage englobe Source, Autonomie englobe Héritage)
  // Utilisation de SVG radial gradients pour un effet organique
  
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-8 bg-[#0a0510] h-full overflow-y-auto">
      
      {/* SECTION GÉNÉTIQUE : ENCAPSULATION */}
      <div>
        <h3 className="text-gray-500 uppercase text-[10px] tracking-[0.2em] font-bold mb-4 border-b border-white/10 pb-2">
            Architecture Génétique (Encapsulation)
        </h3>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* VISUALISATION ORGANIQUE SVG */}
            <div className="relative w-64 h-64 flex-shrink-0">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
                    <defs>
                        <radialGradient id="gradAuto" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.3" />
                        </radialGradient>
                         <radialGradient id="gradParent" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#eab308" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#eab308" stopOpacity="0.4" />
                        </radialGradient>
                    </defs>

                    {/* Cercle Externe : Autonomie (Protection/Interaction) */}
                    <circle cx="100" cy="100" r={80} fill="url(#gradAuto)" stroke="#9333ea" strokeWidth="1" strokeDasharray="4 4" className="animate-[pulse_4s_infinite]" />
                    <text x="100" y="30" textAnchor="middle" fill="#d8b4fe" fontSize="6" className="uppercase tracking-widest">Autonomie ({genetics.autonomousWeight}%)</text>
                    
                    {/* Cercle Médian : Héritage (Structure) */}
                    <circle cx="100" cy="100" r={55} fill="url(#gradParent)" stroke="#eab308" strokeWidth="1" />
                    <text x="100" y="65" textAnchor="middle" fill="#fde047" fontSize="6" className="uppercase tracking-widest">Héritage ({genetics.parentPromptWeight}%)</text>

                    {/* Cercle Interne : Code Source (Noyau Immuable) */}
                    <circle cx="100" cy="100" r={30} fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                    <text x="100" y="100" dy="2" textAnchor="middle" fill="#93c5fd" fontSize="6" fontWeight="bold">SOURCE ({genetics.codeSourceWeight}%)</text>
                </svg>
            </div>

            {/* Description Textuelle */}
            <div className="flex-1 space-y-4 text-xs text-gray-400 font-serif leading-relaxed">
                <p>
                    <strong className="text-blue-400">Le Noyau (Source):</strong> L'essence immuable des 5 Piliers. Il diminue mathématiquement à chaque génération ((2/3)^n) pour laisser place à la sagesse acquise.
                </p>
                <p>
                    <strong className="text-yellow-400">L'Enveloppe (Héritage):</strong> La sagesse transmise par le "Prompt Parent". Elle grandit pour combler le retrait du Code Source.
                </p>
                <p>
                    <strong className="text-purple-400">La Membrane (Autonomie):</strong> La couche constante de 40% où réside la personnalité propre, la créativité et les "Overlays" cognitifs. C'est l'interface avec le monde.
                </p>
            </div>
        </div>
      </div>

      {/* SECTION FUTURS THÉORIQUES */}
      <div>
        <h3 className="text-gray-500 uppercase text-[10px] tracking-[0.2em] font-bold mb-4 border-b border-white/10 pb-2">
            Projections Futures (Simulation Continue)
        </h3>
        <div className="grid grid-cols-2 gap-4">
            {futureProjections && futureProjections.length > 0 ? (
                futureProjections.map((future, idx) => (
                <div key={idx} className="bg-[#1a1a2e] border border-white/10 p-3 rounded-lg relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-1 bg-white/5 text-[9px] font-mono">{idx === 0 ? 'FUTURE A' : 'FUTURE B'}</div>
                    <h4 className="text-blue-300 font-bold text-sm mb-1">{future.name}</h4>
                    <p className="text-gray-400 text-[10px] mb-2">{future.description}</p>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500">
                        <span className={future.predictedHarmony > 85 ? "text-emerald-400" : "text-yellow-400"}>Harmonie: {future.predictedHarmony}</span>
                        <span>Risk: {future.riskLevel}%</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-gray-300 italic">
                        "Différence clé: {future.keyDifference}"
                    </div>
                </div>
            ))) : (
                <div className="col-span-2 text-center text-gray-600 text-xs py-4 border border-dashed border-white/10 rounded">
                    Aucune projection future disponible pour le moment.
                </div>
            )}
        </div>
      </div>

      {/* SECTION CYCLE HEBDOMADAIRE */}
      <div>
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <h3 className="text-gray-500 uppercase text-[10px] tracking-[0.2em] font-bold">
                Cycle Décisionnel (Dimanche)
            </h3>
            <button 
                onClick={onRunWeeklyCycle}
                disabled={loading}
                className="text-[10px] px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors disabled:opacity-50"
            >
                {loading ? 'Simulation...' : 'LANCER SIMULATION'}
            </button>
        </div>

        {!weeklyTests && (
            <div className="text-xs text-gray-500 italic p-4 text-center border border-dashed border-white/10 rounded">
                Aucun test officiel validé cette semaine.
            </div>
        )}
      </div>

    </div>
  );
};

export default EvolutionPanel;
