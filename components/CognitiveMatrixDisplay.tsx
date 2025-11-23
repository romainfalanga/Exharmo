
import React, { useState } from 'react';
import { ExpansionEntity, CognitiveMatrix } from '../types';

interface MatrixProps {
  entity: ExpansionEntity | null;
  loading: boolean;
}

const CognitiveMatrixDisplay: React.FC<MatrixProps> = ({ entity, loading }) => {
  const [activeView, setActiveView] = useState<'GENERAL' | 'JEWISH' | 'CHRISTIAN' | 'MUSLIM'>('GENERAL');

  if (loading) {
    return (
      <div className="glass-panel h-full flex flex-col items-center justify-center p-8 rounded-2xl animate-pulse gap-6">
        <div className="universe-loader w-24 h-24 rounded-full border-4 border-t-transparent animate-spin border-blue-500/50"></div>
        <div className="text-center space-y-2">
            <div className="sacred-text text-xl text-blue-200">Consultation du Conseil...</div>
            <div className="font-mono text-xs text-blue-500/50">Synthèse Juive-Chrétienne-Musulmane en cours</div>
        </div>
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="glass-panel h-full flex flex-col items-center justify-center p-8 rounded-2xl text-center">
        <div className="text-gray-600 mb-6 text-6xl opacity-20 animate-pulse">⚛</div>
        <h2 className="sacred-text text-2xl text-white mb-3">Vide Cosmique</h2>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">Initiez le Big Bang pour voir la structure.</p>
      </div>
    );
  }

  // Sélection de la matrice à afficher selon l'onglet actif
  let currentMatrix: CognitiveMatrix;
  let themeColor = "";
  let icon = "";

  switch (activeView) {
    case 'JEWISH':
        currentMatrix = entity.religiousSubstructures?.jewish || entity.matrix;
        themeColor = "text-blue-400";
        icon = "✡️";
        break;
    case 'CHRISTIAN':
        currentMatrix = entity.religiousSubstructures?.christian || entity.matrix;
        themeColor = "text-purple-400";
        icon = "✝️";
        break;
    case 'MUSLIM':
        currentMatrix = entity.religiousSubstructures?.muslim || entity.matrix;
        themeColor = "text-emerald-400";
        icon = "☪️";
        break;
    default:
        currentMatrix = entity.matrix;
        themeColor = "text-amber-400";
        icon = "⚛️";
  }

  const { universe } = entity;
  const visualParams = universe?.visualParams || { geometry: 'SPHERE', color: '#ffffff', pulseSpeed: 'NORMAL', entropyLevel: 10 };
  const pulseDuration = visualParams.pulseSpeed === 'FAST' ? '0.5s' : '1.5s';
  const images = currentMatrix.images || { portraitDescription: "", mindMapDescription: "", trajectoryDescription: "" };
  
  const getVisualUrl = (desc: string, type: string) => {
      const seed = (desc?.length || 0) + type.length + entity.createdAt + activeView.length; 
      return `https://picsum.photos/seed/${seed}/600/400?grayscale&blur=1`;
  };

  return (
    <div className="glass-panel rounded-2xl h-full flex flex-col bg-[#050510] overflow-hidden relative">
       
       {/* HEADER SELECTOR - NAVIGATION DANS LES POUPÉES RUSSES */}
       <div className="flex border-b border-white/10 bg-black/40">
           {[
               { id: 'GENERAL', label: 'SYNTHÈSE', icon: '⚛️' },
               { id: 'JEWISH', label: 'JUDAÏSME', icon: '✡️' },
               { id: 'CHRISTIAN', label: 'CHRISTIANISME', icon: '✝️' },
               { id: 'MUSLIM', label: 'ISLAM', icon: '☪️' }
           ].map(tab => (
               <button
                   key={tab.id}
                   onClick={() => setActiveView(tab.id as any)}
                   className={`flex-1 py-3 text-[10px] font-bold tracking-widest transition-all uppercase flex flex-col items-center gap-1 ${
                       activeView === tab.id 
                       ? 'bg-white/10 text-white border-b-2 border-blue-500' 
                       : 'text-gray-600 hover:text-gray-300 hover:bg-white/5'
                   }`}
               >
                   <span className="text-sm filter grayscale hover:grayscale-0 transition-all">{tab.icon}</span>
                   <span>{tab.label}</span>
               </button>
           ))}
       </div>

       <div className="overflow-y-auto flex-1 relative">
            
            {/* BACKGROUND ANIMATION */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
            
            {/* VISUAL CORE */}
            <div className="relative h-40 w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-b from-black to-transparent">
                <div 
                    className={`rounded-full blur-xl transition-all duration-1000`}
                    style={{
                        width: '80px', height: '80px',
                        backgroundColor: activeView === 'GENERAL' ? visualParams.color : activeView === 'JEWISH' ? '#3b82f6' : activeView === 'CHRISTIAN' ? '#a855f7' : '#10b981',
                        boxShadow: `0 0 60px 20px ${activeView === 'GENERAL' ? visualParams.color : activeView === 'JEWISH' ? '#3b82f6' : activeView === 'CHRISTIAN' ? '#a855f7' : '#10b981'}`,
                        animation: `pulse ${pulseDuration} infinite ease-in-out`,
                        opacity: 0.8
                    }}
                />
                <div className="absolute bottom-2 right-4 text-[10px] font-mono text-gray-600 uppercase">
                    {activeView === 'GENERAL' ? 'Harmonie Globale' : `Expansion ${activeView}`}
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* IDENTITY BLOCK */}
                <div>
                    <h2 className={`sacred-text text-2xl leading-none mb-1 ${themeColor} flex items-center gap-2`}>
                        {icon} {activeView === 'GENERAL' ? entity.name : `Expansion ${activeView}`}
                    </h2>
                    
                    <div className="mt-2 p-2 bg-white/5 border-l-2 border-white/20 rounded-r">
                        <div className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Livre & Source Sacrée</div>
                        <div className="text-sm text-gray-200 font-serif italic">{currentMatrix.religiousBook}</div>
                    </div>

                    <div className="relative py-6 text-center">
                        <span className="text-4xl text-white/5 absolute top-0 left-0 font-serif">"</span>
                        <div className="text-lg font-serif text-white/90 italic leading-relaxed px-6">
                            {currentMatrix.phraseDuJour}
                        </div>
                        <span className="text-4xl text-white/5 absolute bottom-0 right-0 font-serif">"</span>
                    </div>
                </div>

                {/* VALUES LIST */}
                <div>
                    <h3 className="text-gray-600 uppercase text-[10px] mb-3 tracking-[0.2em] font-bold">Valeurs Piliers</h3>
                    <div className="flex flex-wrap gap-2">
                        {currentMatrix.values && currentMatrix.values.map((val, idx) => (
                            <span key={idx} className={`text-[10px] px-2 py-1 rounded border ${
                                activeView === 'JEWISH' ? 'border-blue-500/30 text-blue-300 bg-blue-900/20' :
                                activeView === 'CHRISTIAN' ? 'border-purple-500/30 text-purple-300 bg-purple-900/20' :
                                activeView === 'MUSLIM' ? 'border-emerald-500/30 text-emerald-300 bg-emerald-900/20' :
                                'border-amber-500/30 text-amber-300 bg-amber-900/20'
                            }`}>
                                {val}
                            </span>
                        ))}
                    </div>
                </div>

                {/* HARMONY PARAGRAPH */}
                {currentMatrix.harmonyParagraph && (
                    <div className="bg-[#10101a] p-4 rounded-lg border border-white/5 shadow-lg">
                        <h3 className={`${themeColor} uppercase text-[10px] mb-2 tracking-[0.2em] font-bold`}>
                            Essence Harmonique
                        </h3>
                        <p className="text-gray-400 text-xs font-serif leading-loose text-justify">
                            {currentMatrix.harmonyParagraph}
                        </p>
                    </div>
                )}

                {/* SYNTHESIS */}
                <div className="border-l-2 border-white/10 pl-4 py-1">
                    <h3 className="text-gray-600 uppercase text-[10px] mb-2 tracking-[0.2em] font-bold">État de Conscience</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{currentMatrix.synthesis}</p>
                </div>

                {/* VISUALIZATIONS */}
                <div className="grid grid-cols-2 gap-3">
                     <div className="bg-black rounded-lg overflow-hidden relative group aspect-square">
                         <img src={getVisualUrl(images.portraitDescription, 'face')} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                         <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black p-2 pt-6">
                             <div className="text-[9px] uppercase text-gray-400">Portrait Intérieur</div>
                         </div>
                     </div>
                     <div className="bg-black rounded-lg overflow-hidden relative group aspect-square">
                         <img src={getVisualUrl(images.mindMapDescription, 'map')} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                         <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black p-2 pt-6">
                             <div className="text-[9px] uppercase text-gray-400">Mind Map</div>
                         </div>
                     </div>
                </div>
            </div>
       </div>
    </div>
  );
};

export default CognitiveMatrixDisplay;
