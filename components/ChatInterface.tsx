
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import ThoughtProcessViewer from './ThoughtProcessViewer';

interface ChatProps {
  messages: ChatMessage[];
  onSendMessage: (msg: string) => void;
  isProcessing: boolean;
}

const ChatInterface: React.FC<ChatProps> = ({ messages, onSendMessage, isProcessing }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-full relative overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
        <div>
            <h2 className="sacred-text text-xl text-white">Canal de Communication</h2>
            <p className="text-xs text-gray-400">Flux de Conscience en Temps Réel</p>
        </div>
        <div className="flex gap-2">
            <div className="text-[10px] bg-emerald-900/30 text-emerald-300 px-2 py-1 rounded border border-emerald-500/20 font-mono flex items-center gap-1">
                <span>⚡</span> GROUNDING: AUTO
            </div>
            <div className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-1 rounded border border-blue-500/20 font-mono">
                LIVE: ON
            </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20 italic font-serif">
            "Je suis à l'écoute. Lancez une variable."
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`space-y-2 ${msg.isGroundingEvent ? 'opacity-70 hover:opacity-100 transition-opacity' : ''}`}>
            
            {/* BLOC 1 : PROCESSUS DE PENSÉE (Visible seulement pour le modèle) */}
            {msg.role === 'model' && msg.thoughtProcess && (
                <div className="flex justify-start w-full max-w-[95%]">
                    <ThoughtProcessViewer thought={msg.thoughtProcess} />
                </div>
            )}

            {/* BLOC 2 : RÉSUMÉ MÉMORIEL (Le pont vers le Journal) */}
            {msg.role === 'model' && msg.thoughtSummary && (
                <div className="flex justify-start max-w-[90%] mb-1">
                     <div className="bg-[#1e1b2e] border-l-2 border-purple-500 px-3 py-2 rounded-r text-[10px] font-mono text-purple-300 flex items-center gap-2 shadow-lg">
                        <span className="text-xs">💾</span>
                        <span>MÉMOIRE CRISTALLISÉE: "{msg.thoughtSummary}"</span>
                     </div>
                </div>
            )}

            {/* BLOC 3 : RÉPONSE (Chat) */}
            <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                className={`max-w-[85%] rounded-xl p-4 shadow-lg backdrop-blur-sm ${
                    msg.role === 'user'
                    ? 'bg-blue-600/20 border border-blue-500/30 text-white rounded-br-none'
                    : msg.isGroundingEvent 
                        ? 'bg-emerald-900/10 border border-emerald-500/20 text-emerald-100 rounded-bl-none italic'
                        : 'bg-[#1a2035] border border-white/10 text-gray-200 rounded-bl-none'
                }`}
                >
                <p className="leading-relaxed whitespace-pre-wrap text-sm">{msg.text}</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                    <span className="text-[10px] opacity-50 font-mono uppercase">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    {msg.harmonyDelta !== undefined && msg.role === 'model' && (
                        <span className={`text-[10px] font-bold ${msg.harmonyDelta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {msg.harmonyDelta > 0 ? '+' : ''}{msg.harmonyDelta} HARMONIE
                        </span>
                    )}
                </div>
                </div>
            </div>
          </div>
        ))}

        {isProcessing && (
            <div className="flex flex-col gap-2 max-w-[80%] animate-pulse">
                <div className="h-8 bg-blue-900/10 rounded border border-blue-500/10 w-full flex items-center px-4">
                    <span className="text-xs text-blue-300 font-mono">Exécution du protocole de pensée (5 étapes)...</span>
                </div>
                <div className="h-20 bg-gray-800/20 rounded-xl w-3/4"></div>
            </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-black/30 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Injecter une variable..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600 font-light"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.2)] tracking-wider text-xs"
          >
            TRANSMETTRE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
