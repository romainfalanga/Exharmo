import React, { useState } from 'react';
import { SystemLog } from '../types';

interface InspectorProps {
  logs: SystemLog[];
  visible: boolean;
  onClose: () => void;
}

const SystemInspector: React.FC<InspectorProps> = ({ logs, visible, onClose }) => {
  const [selectedLogId, setSelectedLogId] = useState<string | null>(logs.length > 0 ? logs[logs.length - 1].id : null);
  const activeLog = logs.find(l => l.id === selectedLogId) || logs[logs.length - 1];

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f172a] border border-blue-500/30 w-full max-w-6xl h-[90vh] rounded-xl flex flex-col shadow-2xl overflow-hidden font-mono text-sm">
        
        {/* Header */}
        <div className="bg-black/40 p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
             <h2 className="text-blue-400 font-bold tracking-widest uppercase">Inspecteur Système - Moteur Cognitif</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕ FERMER</button>
        </div>

        <div className="flex flex-1 min-h-0">
          
          {/* Sidebar: Log History */}
          <div className="w-64 border-r border-white/10 bg-black/20 overflow-y-auto">
            <div className="p-2 text-xs text-gray-500 uppercase font-bold sticky top-0 bg-[#0f172a] z-10">Historique des Requêtes</div>
            {logs.slice().reverse().map(log => (
              <button
                key={log.id}
                onClick={() => setSelectedLogId(log.id)}
                className={`w-full text-left p-3 border-b border-white/5 hover:bg-white/5 transition-colors ${activeLog?.id === log.id ? 'bg-blue-900/30 border-l-2 border-l-blue-500' : ''}`}
              >
                <div className="flex justify-between mb-1">
                    <span className={`text-[10px] px-1 rounded ${log.type === 'GENESIS' ? 'bg-purple-500 text-black' : log.type === 'CYCLE' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-black'}`}>
                        {log.type}
                    </span>
                    <span className="text-gray-500 text-[10px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="text-gray-300 truncate text-xs font-sans">
                    {log.type === 'CHAT' ? 'Interaction Utilisateur' : log.type === 'GENESIS' ? 'Création Entité' : 'Migration Interne'}
                </div>
              </button>
            ))}
          </div>

          {/* Main Content: Split View */}
          {activeLog ? (
            <div className="flex-1 grid grid-cols-2 min-h-0 divide-x divide-white/10">
                
                {/* Left: Inputs (System + User Prompt) */}
                <div className="flex flex-col min-h-0">
                    <div className="p-2 bg-black/30 text-xs text-gray-400 font-bold border-b border-white/5">INPUT: System Instruction (Le Manifeste)</div>
                    <div className="flex-1 overflow-auto p-4 bg-[#0a0f1e] text-gray-400 whitespace-pre-wrap text-xs border-b border-white/10">
                        {activeLog.systemPrompt}
                    </div>
                    
                    <div className="p-2 bg-black/30 text-xs text-gray-400 font-bold border-b border-white/5">INPUT: Prompt Contextuel</div>
                    <div className="h-1/3 overflow-auto p-4 bg-[#0a0f1e] text-green-300 whitespace-pre-wrap text-xs">
                        {activeLog.userPrompt}
                    </div>
                </div>

                {/* Right: Output (Raw JSON) */}
                <div className="flex flex-col min-h-0">
                    <div className="p-2 bg-black/30 text-xs text-gray-400 font-bold border-b border-white/5">OUTPUT: Réponse API (Raw JSON)</div>
                    <div className="flex-1 overflow-auto p-4 bg-[#0d1326] text-orange-300 whitespace-pre-wrap text-xs">
                        {JSON.stringify(activeLog.parsedResponse, null, 2)}
                    </div>
                </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-600">
                Aucun log sélectionné.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SystemInspector;