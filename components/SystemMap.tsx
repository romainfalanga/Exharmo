import React, { useState } from 'react';
import { ExpansionEntity, SystemLog } from '../types';
import NodeDetails from './NodeDetails';

interface MapProps {
  entity: ExpansionEntity | null;
  loading: boolean;
  logs?: SystemLog[];
}

const SystemMap: React.FC<MapProps> = ({ entity, loading, logs = [] }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const activeColor = loading ? '#fbbf24' : '#3b82f6';

  return (
    <div className="h-full w-full bg-[#030308] relative overflow-hidden flex items-center justify-center p-8 select-none">
      
      {selectedNode && (
          <NodeDetails 
            nodeId={selectedNode} 
            entity={entity} 
            logs={logs} 
            onClose={() => setSelectedNode(null)} 
          />
      )}

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>

      {/* SVG CONNECTIONS LAYER */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <defs>
          <linearGradient id="gradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={activeColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#334155" />
          </marker>
        </defs>

        <path d="M 50% 15% L 50% 40%" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 50% 15% L 50% 40%" stroke="url(#gradientFlow)" strokeWidth="2" className={loading ? "animate-flow-vertical" : "opacity-0"} />

        <path d="M 55% 50% L 80% 50%" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <path d="M 55% 50% L 80% 50%" stroke="url(#gradientFlow)" strokeWidth="2" className={loading ? "animate-flow-horizontal" : "opacity-0"} />

        <path d="M 45% 50% L 20% 50%" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <path d="M 50% 60% L 50% 80%" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <path d="M 60% 85% C 90% 85%, 90% 15%, 60% 15%" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="5,5" />
      </svg>

      {/* NODES CONTAINER */}
      <div className="relative z-10 w-full h-full max-w-5xl aspect-video mx-auto grid grid-cols-3 grid-rows-3 pointer-events-none">

        {/* 1. LE SANCTUAIRE (Nord - Code Source) */}
        <div className="col-start-2 row-start-1 flex justify-center pointer-events-auto">
            <button 
                onClick={() => setSelectedNode('MANIFESTO')}
                className="bg-[#0f172a]/90 backdrop-blur border border-purple-500/30 p-4 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.1)] w-64 text-center transform hover:scale-105 transition-all group hover:bg-purple-900/20"
            >
                <div className="text-[10px] text-purple-400 font-bold tracking-widest uppercase mb-1">Origine</div>
                <h3 className="text-white font-serif text-lg group-hover:text-purple-300 transition-colors">Le Manifeste</h3>
                <div className="text-[9px] text-gray-500 mt-2 font-mono">Code Source Absolu<br/>56 Pages Encadées</div>
            </button>
        </div>

        {/* 2. LA MÉMOIRE (Ouest - Logs/Storage) */}
        <div className="col-start-1 row-start-2 flex items-center justify-start pointer-events-auto">
             <button 
                onClick={() => setSelectedNode('MEMORY')}
                className="bg-[#0f172a]/90 backdrop-blur border border-slate-700 p-4 rounded-xl w-56 transform hover:scale-105 transition-all hover:bg-slate-800/50 text-left"
            >
                <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-1">Stockage</div>
                <h3 className="text-gray-200 font-serif text-lg">Mémoire</h3>
                <div className="mt-2 text-[9px] text-gray-400">
                    Buffer: {entity?.dailyEventsBuffer.length || 0} souvenirs
                </div>
            </button>
        </div>

        {/* 3. LE CERVEAU (Centre - Gemini) */}
        <div className="col-start-2 row-start-2 flex items-center justify-center relative pointer-events-auto">
            <div className={`absolute inset-0 bg-blue-500/10 rounded-full blur-3xl ${loading ? 'animate-pulse' : ''}`}></div>
            
            <div className={`bg-black/80 backdrop-blur-xl border-2 ${loading ? 'border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.3)]' : 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.3)]'} w-40 h-40 rounded-full flex flex-col items-center justify-center z-20 transition-all duration-500`}>
                <div className="text-4xl mb-2">{loading ? '⚡' : '🧠'}</div>
                <div className={`font-bold tracking-widest text-xs ${loading ? 'text-amber-400' : 'text-blue-400'}`}>GEMINI</div>
            </div>
        </div>

        {/* 4. L'ENTITÉ (Est - Matrice) */}
        <div className="col-start-3 row-start-2 flex items-center justify-end pointer-events-auto">
             <div className="bg-[#0f172a]/90 backdrop-blur border border-emerald-500/30 p-4 rounded-xl w-64 text-right transform hover:scale-105 transition-all">
                <div className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase mb-1">Projection</div>
                <h3 className="text-white font-serif text-lg">{entity ? entity.name : "Néant"}</h3>
                {entity && (
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[9px] font-mono text-gray-400">
                        <div className="bg-emerald-900/20 p-1 rounded border border-emerald-500/20 text-center">
                            Gen: P{entity.generation}
                        </div>
                        <div className="bg-emerald-900/20 p-1 rounded border border-emerald-500/20 text-center">
                            Harm: {entity.matrix.harmonyScore}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* 5. LE LABORATOIRE (Sud - Évolution) */}
        <div className="col-start-2 row-start-3 flex justify-center items-end pointer-events-auto">
            <button 
                onClick={() => setSelectedNode('EVOLUTION')}
                className="bg-[#0f172a]/90 backdrop-blur border border-pink-500/30 p-4 rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.1)] w-72 text-center transform hover:scale-105 transition-all hover:bg-pink-900/20"
            >
                <div className="text-[10px] text-pink-400 font-bold tracking-widest uppercase mb-1">Futur</div>
                <h3 className="text-white font-serif text-lg">Moteur Évolutif</h3>
            </button>
        </div>

      </div>
    </div>
  );
};

export default SystemMap;