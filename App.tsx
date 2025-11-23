
import React, { useEffect, useState, useRef } from 'react';
import { ExpansionEntity, ChatMessage, SystemLog } from './types';
import CognitiveMatrixDisplay from './components/CognitiveMatrixDisplay';
import ChatInterface from './components/ChatInterface';
import SystemInspector from './components/SystemInspector';
import EvolutionPanel from './components/EvolutionPanel';
import SystemMap from './components/SystemMap';
import { performGenesis, sendMessageToEntity, performWeeklyCycle, performMigration, performHourlyGrounding, generateHarmonyQRCode } from './services/geminiService';

const App: React.FC = () => {
  const [entities, setEntities] = useState<ExpansionEntity[]>([]);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [interactionLoading, setInteractionLoading] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [genesisModalOpen, setGenesisModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newInstructions, setNewInstructions] = useState('');

  const [activeTab, setActiveTab] = useState<'MATRIX' | 'EVOLUTION' | 'MAP'>('MATRIX');
  const [genesisStage, setGenesisStage] = useState<'IDLE' | 'COUNTDOWN' | 'BIG_BANG' | 'STABILIZATION'>('IDLE');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    try {
        const savedEntities = localStorage.getItem('expansion_entities');
        const savedLogs = localStorage.getItem('expansion_logs');
        
        if (savedEntities) {
            const parsed = JSON.parse(savedEntities);
            const patchedEntities = parsed.map((e: any) => ({
                ...e,
                matrix: {
                    ...(e.matrix || {}),
                    images: e.matrix?.images || {
                        portraitDescription: "Abstraction lumineuse",
                        mindMapDescription: "Réseau neuronal",
                        trajectoryDescription: "Trajectoire d'évolution"
                    }
                },
                // Patch pour les vieux formats qui n'ont pas les sous-structures
                religiousSubstructures: e.religiousSubstructures || {
                    jewish: { ...e.matrix, religiousBook: "Torah" },
                    christian: { ...e.matrix, religiousBook: "Bible" },
                    muslim: { ...e.matrix, religiousBook: "Coran" }
                }
            }));
            setEntities(patchedEntities);
            if (patchedEntities.length > 0 && !selectedEntityId) {
                setSelectedEntityId(patchedEntities[0].id);
            }
        }
        
        if (savedLogs) setSystemLogs(JSON.parse(savedLogs));
    } catch (error) {
        console.error("Storage Error", error);
        setEntities([]);
    }
  }, []);

  useEffect(() => {
    if (entities.length > 0) localStorage.setItem('expansion_entities', JSON.stringify(entities));
  }, [entities]);

  useEffect(() => {
    if (systemLogs.length > 0) localStorage.setItem('expansion_logs', JSON.stringify(systemLogs));
  }, [systemLogs]);

  useEffect(() => {
      let interval: NodeJS.Timeout;
      if (genesisStage === 'COUNTDOWN') {
          interval = setInterval(() => {
              setCountdown((prev) => {
                  if (prev <= 1) {
                      clearInterval(interval);
                      return 0;
                  }
                  return prev - 1;
              });
          }, 1000);
      }
      return () => clearInterval(interval);
  }, [genesisStage]);

  const addLog = (log: SystemLog) => {
    setSystemLogs(prev => [...prev, log]);
  };

  const handleGenesis = async () => {
    if (!newName.trim() || !newInstructions.trim()) return;
    
    setGenesisModalOpen(false);
    setGenesisStage('COUNTDOWN');
    setCountdown(10); 
    setLoading(true);

    try {
      const { entity, log } = await performGenesis(newName, newInstructions);
      
      const remainingTime = countdown * 1000;
      if (remainingTime > 0) {
          await new Promise(r => setTimeout(r, Math.max(0, remainingTime)));
      }

      setGenesisStage('BIG_BANG');
      setTimeout(() => {
        setEntities(prev => [entity, ...prev]);
        setSelectedEntityId(entity.id);
        addLog(log);
        setGenesisStage('STABILIZATION');
        setLoading(false);
        setTimeout(() => setGenesisStage('IDLE'), 2000);
      }, 2000);

    } catch (error) {
      console.error("Genesis failed", error);
      setGenesisStage('IDLE');
      setLoading(false);
      alert("Erreur de création.");
    }
  };

  const selectedEntity = entities.find(e => e.id === selectedEntityId) || null;

  const handleSendMessage = async (text: string) => {
    if (!selectedEntity) return;
    setInteractionLoading(true);
    try {
      const { entity, log } = await sendMessageToEntity(selectedEntity, text);
      updateEntity(entity);
      addLog(log);
    } catch (e) {
      console.error(e);
      alert("Erreur communication.");
    } finally {
      setInteractionLoading(false);
    }
  };

  const updateEntity = (updated: ExpansionEntity) => {
    setEntities(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const handleRunWeekly = async () => {
      if(!selectedEntity) return;
      setInteractionLoading(true);
      try {
          const { entity, log } = await performWeeklyCycle(selectedEntity);
          updateEntity(entity);
          addLog(log);
      } catch(e) { console.error(e); } finally { setInteractionLoading(false); }
  };

  const handleDoMigration = async () => {
      if(!selectedEntity) return;
      setInteractionLoading(true);
      try {
          const { entity, log } = await performMigration(selectedEntity);
          setEntities(prev => prev.map(e => e.id === selectedEntity.id ? entity : e));
          addLog(log);
      } catch(e) { console.error(e); } finally { setInteractionLoading(false); }
  };

  return (
    <div className="flex h-screen w-screen bg-[#020205] text-white overflow-hidden font-sans relative">
      
      {/* BIG BANG OVERLAY */}
      {genesisStage === 'COUNTDOWN' && (
          <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center">
              <div className="text-[10rem] font-bold text-white animate-pulse font-mono">{countdown}</div>
              <div className="text-blue-500 tracking-widest uppercase mt-4">Compression de la Singularité...</div>
          </div>
      )}
      {genesisStage === 'BIG_BANG' && (
          <div className="absolute inset-0 z-[100] bg-white animate-[fadeOut_2s_ease-out_forwards] pointer-events-none"></div>
      )}

      {/* MODAL GENESIS */}
      {genesisModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-[#0f172a] border border-blue-500/50 p-8 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                <h2 className="sacred-text text-2xl text-center mb-6 text-white">Nouvelle Expansion Trinitaire</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nom de l'Entité</label>
                        <input 
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-blue-500 outline-none font-serif text-lg"
                            placeholder="Ex: Expansion Alpha"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Mission Sacrée</label>
                        <textarea 
                            value={newInstructions}
                            onChange={e => setNewInstructions(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-blue-500 outline-none h-32 font-mono text-sm"
                            placeholder="Définis l'objectif de cette harmonisation..."
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button 
                            onClick={() => setGenesisModalOpen(false)}
                            className="flex-1 px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors text-xs uppercase font-bold"
                        >
                            Annuler
                        </button>
                        <button 
                            onClick={handleGenesis}
                            disabled={loading || !newName || !newInstructions}
                            className="flex-1 px-4 py-3 rounded bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs uppercase font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Création...' : 'INITIER BIG BANG'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-[#050510] border-r border-white/10 transition-all duration-300 flex flex-col overflow-hidden`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
           <h1 className="sacred-text text-lg text-blue-200">Expansion<br/>Harmonieuse</h1>
           <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-white">«</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <button 
                onClick={() => setGenesisModalOpen(true)}
                className="w-full py-3 border border-dashed border-blue-500/30 rounded-lg text-blue-400 text-xs hover:bg-blue-900/10 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 group"
            >
                <span className="group-hover:rotate-90 transition-transform duration-300">+</span> Nouvelle Genèse
            </button>

            {entities.map(entity => (
                <button
                    key={entity.id}
                    onClick={() => setSelectedEntityId(entity.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all border ${
                        selectedEntityId === entity.id 
                        ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                        : 'bg-[#0a0a12] border-white/5 hover:border-white/20'
                    }`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-serif text-sm text-gray-200">{entity.name}</span>
                        <span className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-500">P{entity.generation}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 truncate font-mono mb-1">
                        {entity.matrix.phraseDuJour || "En attente..."}
                    </div>
                    <div className="flex gap-1 text-[8px] opacity-50">
                        <span>✡️</span><span>✝️</span><span>☪️</span>
                    </div>
                </button>
            ))}
        </div>
        
        <div className="p-4 border-t border-white/10 text-[9px] text-center text-gray-600 font-mono">
            PROTOCOL v3.0 - TRINITARIAN CORE
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 z-40 bg-black/50 p-2 rounded text-white hover:bg-white/10">»</button>
        )}

        <div className="h-16 border-b border-white/10 bg-[#020205]/80 backdrop-blur flex items-center px-6 justify-between shrink-0">
             <div className="flex gap-6">
                 {['MATRIX', 'EVOLUTION', 'MAP'].map((tab) => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`text-xs font-bold tracking-[0.2em] uppercase py-2 border-b-2 transition-colors ${
                            activeTab === tab ? 'text-white border-blue-500' : 'text-gray-500 border-transparent hover:text-gray-300'
                        }`}
                     >
                         {tab === 'MATRIX' ? 'Matrice (Conseil)' : tab === 'EVOLUTION' ? 'Évolution' : 'Cartographie'}
                     </button>
                 ))}
             </div>

             <div className="flex items-center gap-3">
                 <button 
                    onClick={() => setInspectorOpen(true)}
                    className="text-[10px] bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded border border-white/10 text-gray-300 font-mono"
                 >
                    SYSTEM LOGS
                 </button>
             </div>
        </div>

        <div className="flex-1 p-6 overflow-hidden flex gap-6">
            {activeTab === 'MAP' ? (
                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                     <SystemMap entity={selectedEntity} loading={interactionLoading} logs={systemLogs} />
                </div>
            ) : (
                <>
                    <div className="w-1/2 h-full flex flex-col min-h-0">
                         {activeTab === 'MATRIX' ? (
                             <CognitiveMatrixDisplay entity={selectedEntity} loading={interactionLoading} />
                         ) : (
                             <EvolutionPanel 
                                entity={selectedEntity} 
                                onRunWeeklyCycle={handleRunWeekly} 
                                onMigrate={handleDoMigration}
                                loading={interactionLoading}
                             />
                         )}
                    </div>

                    <div className="w-1/2 h-full flex flex-col min-h-0">
                        <ChatInterface 
                            messages={selectedEntity?.chatHistory || []} 
                            onSendMessage={handleSendMessage}
                            isProcessing={interactionLoading}
                        />
                    </div>
                </>
            )}
        </div>
      </div>

      <SystemInspector 
        logs={systemLogs} 
        visible={inspectorOpen} 
        onClose={() => setInspectorOpen(false)} 
      />

    </div>
  );
};

export default App;
