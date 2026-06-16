import React, { useState } from "react";
import { 
  Sliders, 
  Sparkles, 
  Play, 
  Send, 
  Volume2, 
  VolumeX, 
  Info, 
  Database, 
  Plus, 
  Trash,
  Settings,
  HelpCircle,
  Brain
} from "lucide-react";
import { Workspace } from "../types";

interface AgentBuilderViewProps {
  activeWorkspace: Workspace;
  receptionistHistory: Array<{ sender: "user" | "receptionist"; text: string }>;
  isReceptionistThinking: boolean;
  onAskAIReceptionist: (text: string) => void;
  speakTextRef: (text: string) => void;
}

export default function AgentBuilderView({
  activeWorkspace,
  receptionistHistory,
  isReceptionistThinking,
  onAskAIReceptionist,
  speakTextRef
}: AgentBuilderViewProps) {
  
  const [testInputText, setTestInputText] = useState("");
  const [selectedVoiceGender, setSelectedVoiceGender] = useState("Female (Warm African Accent)");
  const [crmIntegrationMode, setCrmIntegrationMode] = useState("Salesforce & local Paystack log");
  const [voiceSpokenLanguage, setVoiceSpokenLanguage] = useState("Yoruba (Nigeria)");

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInputText.trim()) return;
    onAskAIReceptionist(testInputText);
    setTestInputText("");
  };

  const handleQuickPresetInquiry = (text: string) => {
    setTestInputText(text);
  };

  return (
    <div className="space-y-6" id="agent-builder-main-view">
      
      {/* Overview Banner */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Sliders className="w-5 h-5 text-orange-500 animate-pulse" />
            Interactive Agent Builder & VoIP Voice Synthesizers
          </h3>
          <p className="text-xs text-gray-400 font-light mt-0.5">Configure professional, conversational AI receptionists that handle, route, and schedule clients 24/7.</p>
        </div>
        
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-2.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider">
          Node Engine: Active 1.0
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Visual flowchart mapping connected nodes */}
        <div className="lg:col-span-2 bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Connected Automation Pipeline Flow</span>
            <button className="text-[10px] text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add workspace node
            </button>
          </div>

          {/* Connected visual blocks chain */}
          <div className="space-y-4 relative">
            {/* Visual connector line background */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-orange-500 to-purple-500/40 -z-10 pointer-events-none"></div>

            {/* Node 1: Customer Intake */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 flex items-start gap-3.5">
              <span className="h-6 w-6 mt-1 rounded-full bg-orange-600 text-black text-xs font-bold font-mono flex items-center justify-center shrink-0 shadow-lg shadow-orange-600/10">1</span>
              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold text-gray-500 font-mono">WORKSPACE TRIGGER INTEGRATION</span>
                <h5 className="text-xs font-bold text-white">Direct Phone Call / Apapa Customer Intake Channel</h5>
                <p className="text-[11px] text-gray-400 leading-normal font-light">Routes incoming business VoIP lines directly into the Aliko Logistics receptionist gateway.</p>
              </div>
            </div>

            {/* Node 2: Language translation node */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 flex items-start gap-3.5">
              <span className="h-6 w-6 mt-1 rounded-full bg-orange-500 text-black text-xs font-bold font-mono flex items-center justify-center shrink-0">2</span>
              <div className="space-y-2 flex-1">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-gray-500 font-mono">DIALECT & COGNITIVE MODEL CONFIG</span>
                  <h5 className="text-xs font-bold text-white">AI Language Config & Speech Settings</h5>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Target Tone Dialect</label>
                    <select
                      value={voiceSpokenLanguage}
                      onChange={(e) => setVoiceSpokenLanguage(e.target.value)}
                      className="w-full bg-black border border-white/10 p-2 text-[11px] rounded-lg text-slate-250 cursor-pointer"
                    >
                      <option value="Yoruba (Nigeria)" className="bg-neutral-950">Yoruba (Nigeria)</option>
                      <option value="Hausa (Nigeria/West Africa)" className="bg-neutral-950">Hausa (WA)</option>
                      <option value="Igbo (Nigeria)" className="bg-neutral-950">Igbo (Igboland)</option>
                      <option value="Swahili (Kenya/East Africa)" className="bg-neutral-950">Swahili (EA)</option>
                      <option value="French (West Africa/Congo)" className="bg-neutral-950">French (West)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Synthetic Speech Gender</label>
                    <select
                      value={selectedVoiceGender}
                      onChange={(e) => setSelectedVoiceGender(e.target.value)}
                      className="w-full bg-black border border-white/10 p-2 text-[11px] rounded-lg text-slate-250 cursor-pointer"
                    >
                      <option value="Female (Warm African Accent)">Female (Warm African)</option>
                      <option value="Male (Professional Nairobi Pitch)">Male (Nairobi Pitch)</option>
                      <option value="Neutral (Direct Dispatch Voice)">Neutral (Dispatch)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Node 3: CRM update Node */}
            <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 flex items-start gap-3.5">
              <span className="h-6 w-6 mt-1 rounded-full bg-purple-600 text-black text-xs font-bold font-mono flex items-center justify-center shrink-0">3</span>
              <div className="space-y-2 flex-1">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-gray-500 font-mono">AUTOMATED WORKFLOW ACTION</span>
                  <h5 className="text-xs font-bold text-white">CRM Integrations & Paystack logs updates</h5>
                </div>
                
                <select
                  value={crmIntegrationMode}
                  onChange={(e) => setCrmIntegrationMode(e.target.value)}
                  className="w-full bg-black border border-white/10 p-2 text-[11px] rounded-lg text-slate-300 cursor-pointer"
                >
                  <option value="Salesforce & local Paystack log">Salesforce & Alapere dispatch log</option>
                  <option value="Hubspot Hub">Hubspot ERP network</option>
                  <option value="Google Sheets Sync only">Direct Google Sheets ledger updates</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: AI testing simulator panel */}
        <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-orange-400">
                <Brain className="w-4 h-4 text-orange-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">AI Receptionist Testing simulator</h4>
              </div>
              <p className="text-[10px] text-gray-500 font-light">Interact with the agent live using the speech synthesiser below.</p>
            </div>

            {/* Testing dialogue logs screen container */}
            <div className="border border-white/5 rounded-2xl bg-black/40 p-3.5 space-y-3 max-h-[180px] overflow-y-auto flex-1 my-2">
              {receptionistHistory.map((h, idx) => {
                const isUser = h.sender === "user";
                return (
                  <div key={idx} className={`flex items-start gap-2 ${isUser ? "justify-end" : ""}`}>
                    {!isUser && (
                      <div className="h-5 w-5 bg-orange-500 text-black text-[9px] font-bold rounded flex items-center justify-center shrink-0">AI</div>
                    )}
                    <div className={`p-3 rounded-xl text-[11px] leading-relaxed max-w-[85%] ${
                      isUser 
                        ? "bg-white/5 border border-white/10 text-slate-100 rounded-tr-none" 
                        : "bg-white/[0.01] border border-white/5 text-slate-300 rounded-tl-none"
                    }`}>
                      <p className="font-light">{h.text}</p>
                      {!isUser && (
                        <button
                          onClick={() => speakTextRef(h.text)}
                          className="mt-2 text-[9px] text-orange-400 hover:text-orange-300 bg-orange-500/10 px-1.5 py-0.5 rounded flex items-center gap-1 border border-orange-500/20 font-mono font-bold"
                        >
                          <Play className="w-2.5 h-2.5" /> SPEAK SYNTHETIC MEMO
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {isReceptionistThinking && (
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 italic p-1">
                  <div className="w-1 h-1 rounded-full bg-gray-500 animate-ping"></div>
                  <span>Agent is retrieving response...</span>
                </div>
              )}
            </div>

            {/* Presets query shortcuts */}
            <div className="space-y-1 bg-black/20 p-2.5 rounded-xl border border-white/5">
              <span className="text-[8px] uppercase tracking-wider text-gray-500 block font-mono">TEST DIALOG PRESSURES</span>
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => handleQuickPresetInquiry("Who are you, and what are your operating hours in Lagos?")}
                  className="text-[9px] bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-0.5 rounded border border-white/5"
                >
                  [Lagos hours?]
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPresetInquiry("Book cargo loading for driver Kofi tomorrow.")}
                  className="text-[9px] bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-0.5 rounded border border-white/5"
                >
                  [Book Kofi check-in]
                </button>
              </div>
            </div>

          </div>

          <form onSubmit={handleSimulateSubmit} className="flex gap-2 bg-neutral-950 p-2.5 rounded-xl border border-white/10">
            <input
              type="text"
              placeholder="Speak or write custom client query..."
              value={testInputText}
              onChange={(e) => setTestInputText(e.target.value)}
              className="flex-1 bg-transparent border-0 ring-0 focus:ring-0 text-xs text-white"
            />
            <button
              type="submit"
              disabled={isReceptionistThinking || !testInputText.trim()}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-black text-xs font-bold px-3 py-1.5 rounded-xl flex items-center justify-center gap-1"
            >
              <Send className="w-3.5 h-3.5" /> Dial
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
