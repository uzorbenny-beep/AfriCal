import React, { useState } from "react";
import { 
  Settings, 
  Users, 
  Database, 
  HelpCircle, 
  Grid, 
  CheckCircle, 
  Plus, 
  Trash,
  Sun,
  Moon
} from "lucide-react";
import { Workspace } from "../types";

interface SettingsViewProps {
  activeWorkspace: Workspace;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onUpdateWorkspaceDetails: (name: string, region: string, currency: string) => void;
}

export default function SettingsView({
  activeWorkspace,
  isDarkMode,
  onToggleDarkMode,
  onUpdateWorkspaceDetails
}: SettingsViewProps) {
  
  const [wsName, setWsName] = useState(activeWorkspace.name);
  const [wsRegion, setWsRegion] = useState(activeWorkspace.region);
  const [wsCurrency, setWsCurrency] = useState(activeWorkspace.currency);
  const [apiSecret, setApiSecret] = useState("••••••••••••••••••••••••••••••••");
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  // Initial mockup team roster
  const [teamRoster, setTeamRoster] = useState([
    { name: "Baba-ola J.", role: "Head of Logistics", phone: "+234 803 111 029", state: "Active" },
    { name: "Amara N.", role: "Operations Coordinator", phone: "+234 812 092 381", state: "Active" },
    { name: "Kofi A.", role: "Lead Dispatch Driver", phone: "+254 722 999 102", state: "Active" }
  ]);

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Dispatch Driver");
  const [newMemberPhone, setNewMemberPhone] = useState("");

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWorkspaceDetails(wsName, wsRegion, wsCurrency);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2500);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberPhone.trim()) return;
    setTeamRoster(prev => [
      ...prev,
      {
        name: newMemberName,
        role: newMemberRole,
        phone: newMemberPhone,
        state: "Active"
      }
    ]);
    setNewMemberName("");
    setNewMemberPhone("");
  };

  const handleKickMember = (name: string) => {
    setTeamRoster(prev => prev.filter(m => m.name !== name));
  };

  return (
    <div className="space-y-6" id="settings-main-view">
      
      {/* Banner */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-500" />
            Workspace Parameters & Dialers Profiles
          </h3>
          <p className="text-xs text-gray-400 font-light mt-0.5">Control billing currency, regional drivers list, API integrations and custom look-and-feel configurations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Double section: Profile fields & Theme selector */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main workspace information form */}
          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Workspace Details</span>
            
            {isSavedAlert && (
              <div id="settings-save-success-banner" className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Parameters saved successfully!
              </div>
            )}

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Company Branch Name</label>
                <input
                  type="text"
                  required
                  value={wsName}
                  onChange={(e) => setWsName(e.target.value)}
                  className="w-full bg-black border border-white/10 p-2.5 rounded-xl text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Operating Region / City</label>
                  <input
                    type="text"
                    required
                    value={wsRegion}
                    onChange={(e) => setWsRegion(e.target.value)}
                    className="w-full bg-black border border-white/10 p-2.5 rounded-xl text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Billing Currency Sign</label>
                  <input
                    type="text"
                    required
                    value={wsCurrency}
                    onChange={(e) => setWsCurrency(e.target.value)}
                    className="w-full bg-black border border-white/10 p-2.5 rounded-xl text-slate-150"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-black text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-orange-600/10 cursor-pointer"
              >
                Save Workspace Parameters
              </button>
            </form>
          </div>

          {/* Theme customizer segment */}
          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Workspace Look & Feel Theme Selector</span>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { if (!isDarkMode) onToggleDarkMode(); }}
                className={`p-4 rounded-xl border text-left space-y-2 transition-all ${
                  isDarkMode 
                    ? "bg-slate-950/60 border-orange-500 text-white" 
                    : "bg-black/10 border-white/5 text-gray-400 hover:border-white/10"
                }`}
              >
                <Moon className="w-5 h-5 text-orange-500" />
                <div>
                  <h5 className="text-xs font-bold">Sophisticated Dark Theme</h5>
                  <p className="text-[10px] text-gray-400 font-light mt-0.5">Primary dark mode. High-contrast blacks and orange glowing sliders.</p>
                </div>
              </button>

              <button 
                onClick={() => { if (isDarkMode) onToggleDarkMode(); }}
                className={`p-4 rounded-xl border text-left space-y-2 transition-all ${
                  !isDarkMode 
                    ? "bg-white border-orange-600 text-neutral-900 shadow-sm" 
                    : "bg-black/10 border-white/5 text-gray-400 hover:border-white/10"
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
                <div>
                  <h5 className="text-xs font-bold">Elegance Light Theme</h5>
                  <p className="text-[10px] text-gray-400 font-light mt-0.5">Soft light canvas. Crisp blacks and warm amber/purple highlights.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Team member roster */}
          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Workspace Team Members & Drivers</span>
            
            <div className="space-y-3">
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {teamRoster.map((m) => (
                  <div key={m.name} className="bg-neutral-950/60 p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <h6 className="font-semibold text-white">{m.name}</h6>
                      <p className="text-[10px] text-gray-400 font-light">{m.role} • {m.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-mono">{m.state}</span>
                      <button
                        onClick={() => handleKickMember(m.name)}
                        className="text-red-400 hover:text-red-300 text-[10px] uppercase font-bold font-mono"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add member inline form */}
              <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                <input
                  type="text"
                  required
                  placeholder="Member Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="bg-black border border-white/10 p-2.5 rounded-xl text-slate-100"
                />
                <input
                  type="text"
                  required
                  placeholder="Primary Phone"
                  value={newMemberPhone}
                  onChange={(e) => setNewMemberPhone(e.target.value)}
                  className="bg-black border border-white/10 p-2.5 rounded-xl text-slate-100"
                />
                <button
                  type="submit"
                  className="bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold py-2.5 border border-white/10 cursor-pointer text-xs"
                >
                  Invite to AfriCall
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Right section: System properties & billing profiles */}
        <div className="space-y-6">
          
          {/* API Keys segment */}
          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">System API Credentials</span>
            
            <div className="space-y-3 text-xs leading-normal font-light">
              <p className="text-[11px] text-gray-400">External endpoints secure validation keys, auto-provisioned by the AI server.</p>
              
              <div className="bg-black p-3 rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase font-mono text-gray-500">SECRET CREDENTIALS</span>
                  <button
                    onClick={() => {
                      if (showApiSecret) {
                        setApiSecret("••••••••••••••••••••••••••••••••");
                      } else {
                        setApiSecret("AFRICALL_LIVE_SK_90829381_YORUBA");
                      }
                      setShowApiSecret(!showApiSecret);
                    }}
                    className="text-[9px] text-orange-400 hover:text-orange-300 font-mono font-bold"
                  >
                    {showApiSecret ? "HIDE" : "REVEAL"}
                  </button>
                </div>
                <pre className="text-[10px] text-white font-mono">{apiSecret}</pre>
              </div>

              <div className="text-[10px] text-gray-500 flex items-start gap-1 p-1 bg-white/[0.02] rounded-lg border border-white/5">
                <Database className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
                <span>Paystack webhook endpoint integrated at <code>/api/payment/remit</code> for instant transaction verification.</span>
              </div>
            </div>
          </div>

          {/* Billing profiles */}
          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Apapa Billing Profile</span>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Current Plan</span>
                <span className="font-bold text-white">Enterprise Fleet (Unlimited translation)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Next Paystack remittance</span>
                <span className="font-bold text-white">July 15, 2026</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-400">Subscribers Count</span>
                <span className="font-bold text-white">40 Sim-Cards routed</span>
              </div>

              <button className="w-full bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 py-2 rounded-xl font-bold transition-all text-xs text-gray-300 cursor-pointer">
                Manage Remittance logs
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
