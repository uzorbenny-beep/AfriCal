import React from "react";
import { 
  TrendingUp, 
  Sparkles, 
  Users, 
  PhoneCall, 
  Video, 
  Send, 
  CheckCircle, 
  Calendar,
  ArrowRight,
  Brain
} from "lucide-react";
import { Workspace } from "../types";

interface DashboardViewProps {
  activeWorkspace: Workspace;
  loginSavingsMB: number;
  isDataSavingMode: boolean;
  onNavigateToTab: (tab: string) => void;
}

export default function DashboardView({
  activeWorkspace,
  loginSavingsMB,
  isDataSavingMode,
  onNavigateToTab
}: DashboardViewProps) {
  
  // Custom recommendations based on active workspace location
  const recommendations = [
    {
      id: "rec-1",
      title: "Apapa Cellular Compression Advisory",
      desc: "Network reports show 3G degradation near Lagos Port. We recommend keeping 'Data Saving Mode' active to guarantee dialer connectivity.",
      badge: "Network Insight",
      urgency: "high"
    },
    {
      id: "rec-2",
      title: "Real-time Swahili Lead Translation",
      desc: "We detected 2 team messages in Swahili. AfriCall auto-translated these instantly to avoid dispatch clearance delay.",
      badge: "AI Interpreter",
      urgency: "normal"
    },
    {
      id: "rec-3",
      title: "Voice-Agent Receptionist Routing",
      desc: "Aliko Logistics' AI Auto-Receptionist scheduled 12 truck check-ins offline today, saving 4 hours of live dispatch management.",
      badge: "SaaS automation",
      urgency: "success"
    }
  ];

  return (
    <div className="space-y-6" id="dashboard-main-container">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600/10 via-purple-600/5 to-transparent border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-orange-400">Team Alignment Live</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-display">
              Welcome Back to {activeWorkspace.name}
            </h2>
            <p className="text-xs text-gray-400 max-w-xl font-light">
              Operational hq tailored for <span className="text-orange-400 font-medium">{activeWorkspace.region}</span>. Your active communication pipelines are online with AI-assisted translation and data saving.
            </p>
          </div>
          <div className="bg-neutral-950/60 border border-white/5 rounded-xl px-4 py-3 shrink-0 flex items-center gap-3">
            <div className="text-left">
              <span className="text-[9px] uppercase font-bold text-gray-500 block">Apapa Airtime Saved</span>
              <span className="text-base font-bold text-orange-400 font-mono">
                {loginSavingsMB.toFixed(2)} MB
              </span>
            </div>
            <span className="text-white/10 text-xl">|</span>
            <div className="text-left">
              <span className="text-[9px] uppercase font-bold text-gray-500 block">DIAL RATIO</span>
              <span className="text-xs text-emerald-400 font-mono font-bold">98.4% Efficiency</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Total Calls */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2 relative" id="kpi-total-calls">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Calls</span>
            <span className="p-1 px-1.5 bg-orange-500/10 text-orange-400 rounded-md text-[9px] font-mono">VoIP</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white font-mono">1,482</span>
            <span className="text-[9px] text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> +12.4%
            </span>
          </div>
          <p className="text-[10px] text-gray-500 font-light">Average duration 4.2m</p>
        </div>

        {/* Meetings Held */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2 relative" id="kpi-meetings-held">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Meetings Held</span>
            <span className="p-1 px-1.5 bg-purple-500/10 text-purple-400 rounded-md text-[9px] font-mono">HD</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white font-mono">249</span>
            <span className="text-[9px] text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> +8.2%
            </span>
          </div>
          <p className="text-[10px] text-gray-500 font-light">All transcribed with AI</p>
        </div>

        {/* Active Users */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2 relative" id="kpi-active-users">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-sans">Active Users</span>
            <span className="p-1 px-1.5 bg-blue-500/10 text-blue-400 rounded-md text-[9px] font-mono">Live</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white font-mono">{activeWorkspace.membersCount}</span>
            <span className="text-[10px] text-gray-400 font-light">of total 40</span>
          </div>
          <p className="text-[10px] text-gray-500 font-light">Lagos dispatch network</p>
        </div>

        {/* Messages Sent */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2 relative" id="kpi-messages-sent">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Messages Sent</span>
            <span className="p-1 px-1.5 bg-emerald-500/10 text-emerald-400 rounded-md text-[9px] font-mono">SMS</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white font-mono">14,204</span>
            <span className="text-[9px] text-gray-400">92% translated</span>
          </div>
          <p className="text-[10px] text-gray-500 font-light">Seamless regional chats</p>
        </div>

        {/* AI Productivity Score */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2 relative" id="kpi-ai-productivity">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">AI Productivity</span>
            <span className="p-1 px-1.5 bg-amber-500/10 text-amber-400 rounded-md text-[9px] font-mono">Smart</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-orange-400 font-mono">92/100</span>
            <span className="text-[9px] text-emerald-400">Stable</span>
          </div>
          <p className="text-[10px] text-gray-500 font-light">Includes summaries & translations</p>
        </div>

      </div>

      {/* Main Stats Segment: Charts & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Pure-SVG Line Chart of team activity */}
        <div className="lg:col-span-2 bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block font-mono">BANDWIDTH CONSUMPTION COMPARE</span>
              <h4 className="text-sm font-bold text-white font-display mt-0.5">HQ Data Utilization (7-Day Metric)</h4>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] hover:text-white text-gray-400">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
                AfriCall Low-Bandwidth Mode
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] hover:text-white text-gray-400">
                <span className="w-2 h-2 rounded-full bg-gray-600 inline-block"></span>
                Standard HD Telecom Lines
              </span>
            </div>
          </div>

          {/* Pure Responsive SVG Sparkline Chart */}
          <div className="w-full h-44 bg-black/40 border border-white/5 rounded-xl p-2 relative flex items-center justify-center">
            <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="glow-orange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.02)" strokeDasharray="3,3" />

              {/* Standard high cost line */}
              <path 
                d="M 10 90 Q 90 20, 170 85 T 330 30 T 490 10" 
                fill="none" 
                stroke="#4b5563" 
                strokeWidth="1.5" 
                strokeDasharray="4,4"
              />

              {/* Data Saver compressed data path */}
              <path 
                d="M 10 110 Q 90 98, 170 108 T 330 101 T 490 103" 
                fill="url(#glow-orange)" 
                stroke="#ea580c" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />

              {/* Plot pointers */}
              <circle cx="10" cy="110" r="3" fill="#ea580c" />
              <circle cx="170" cy="108" r="3" fill="#ea580c" />
              <circle cx="330" cy="101" r="3" fill="#ea580c" />
              <circle cx="490" cy="103" r="3" fill="#ea580c" />
            </svg>
            <div className="absolute top-2 left-3 bg-neutral-950/80 px-2 py-0.5 rounded text-[9px] font-mono border border-white/5 text-gray-400">
              HD: 12.8 GB
            </div>
            <div className="absolute bottom-2 left-3 bg-orange-950/80 px-2 py-0.5 rounded text-[9px] font-mono border border-orange-500/20 text-orange-400">
              AfriCall: 1.1 GB (91% saved)
            </div>
            <div className="absolute bottom-1 right-2 text-[8px] text-gray-500 uppercase tracking-widest font-mono">MON - SUN HISTORICALS</div>
          </div>

          <div className="text-[11px] text-gray-400 font-light flex items-center gap-1.5 leading-relaxed bg-neutral-950 p-3 rounded-xl border border-white/5">
            <span className="p-1 bg-orange-500/10 text-orange-400 rounded font-bold font-mono">SAVINGS ADVICE</span>
            At active rates, your low-bandwidth voice compression saved approximately <span className="text-white font-semibold">14,200 NGN</span> of airtime costs per dispatcher route this week.
          </div>
        </div>

        {/* Right AI recommendations column */}
        <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-orange-400">
              <Brain className="w-4 h-4 text-orange-500 animate-pulse" />
              <h5 className="text-xs font-bold uppercase tracking-wider font-mono">Cognitive AI recommendations</h5>
            </div>
            <p className="text-[11px] text-gray-400 font-light">Realtime smart platform suggestions based on operations analytics.</p>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[180px] pr-1 py-1">
            {recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className="bg-neutral-950/50 p-3 rounded-xl border border-white/5 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[8px] uppercase font-bold p-0.5 px-2 rounded font-mono ${
                    rec.urgency === "high" 
                      ? "bg-red-500/10 text-red-400" 
                      : rec.urgency === "success" 
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-orange-500/10 text-orange-400"
                  }`}>
                    {rec.badge}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
                </div>
                <h6 className="font-semibold text-white mt-1 ">{rec.title}</h6>
                <p className="text-[10px] text-gray-400 leading-normal font-light">{rec.desc}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onNavigateToTab("ai-studio")}
            className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2.5 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition-colors mt-2"
          >
            Enter AI Intelligence Studio <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
          </button>
        </div>

      </div>

      {/* Quick shortcuts to Call, Messages & meeting rooms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-6">
        <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 relative flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest font-mono">QUICK LAUNCH COMPRESSED AUDIO</span>
            <p className="text-xs font-medium text-white">Start instant lag-free voice connection with drivers.</p>
          </div>
          <button 
            onClick={() => onNavigateToTab("voice-calls")}
            className="self-start text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
          >
            Open dialer keypad <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 relative flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest font-mono">REGIONAL AUTO-TRANSLATOR</span>
            <p className="text-xs font-medium text-white">Configure Igbo, Yoruba or Swahili instant dialogue routing.</p>
          </div>
          <button 
            onClick={() => onNavigateToTab("messaging")}
            className="self-start text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
          >
            Open channel chats <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-neutral-950 p-4 rounded-xl border border-white/5 relative flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest font-mono">AI VOICE RECEPTIONISTS</span>
            <p className="text-xs font-medium text-white">Automate user inquiry intake using customized synthesizers.</p>
          </div>
          <button 
            onClick={() => onNavigateToTab("agent-builder")}
            className="self-start text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
          >
            Launch agent builder <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
