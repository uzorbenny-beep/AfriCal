import React, { useState } from "react";
import { 
  TrendingUp, 
  BarChart, 
  Clock, 
  Smile, 
  Sparkles, 
  Database,
  ArrowRight,
  Brain,
  HelpCircle
} from "lucide-react";
import { Workspace } from "../types";

interface AnalyticsViewProps {
  activeWorkspace: Workspace;
}

export default function AnalyticsView({ activeWorkspace }: AnalyticsViewProps) {
  const [selectedRegion, setSelectedRegion] = useState("Lagos Checkpoints");
  
  // Custom heatmap days
  const activityDays = [
    { day: "Mon", hours: [20, 40, 60, 80, 50, 40, 90, 80] },
    { day: "Tue", hours: [30, 60, 80, 90, 70, 50, 80, 95] },
    { day: "Wed", hours: [50, 80, 90, 95, 80, 60, 90, 10] },
    { day: "Thu", hours: [40, 70, 90, 85, 75, 45, 85, 90] },
    { day: "Fri", hours: [60, 90, 95, 99, 90, 80, 95, 99] },
    { day: "Sat", hours: [10, 20, 30, 40, 20, 10, 30, 20] },
    { day: "Sun", hours: [5, 10, 15, 20, 10, 5, 10, 15] }
  ];

  return (
    <div className="space-y-6" id="analytics-main-view">
      
      {/* Banner */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <BarChart className="w-5 h-5 text-orange-500" />
            Executive KPIs & Apapa Fleet Analytics
          </h3>
          <p className="text-xs text-gray-400 font-light mt-0.5">Direct overview of customer satisfaction ratios, cellular dollar savings, and AI call summarizer statistics.</p>
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-black border border-white/10 text-orange-400 text-xs px-2.5 py-1.5 rounded-xl font-bold p-1 cursor-pointer"
        >
          <option value="Lagos Checkpoints">Apapa Main (NGN)</option>
          <option value="Nairobi Checkpoints">Nairobi Terminal (KES)</option>
          <option value="Joburg Checkpoints">Ubuntu Station (ZAR)</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        {/* CSAT Customer satisfaction ratio */}
        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-2">
          <span className="text-[9px] uppercase font-bold text-gray-500 block font-mono">CUSTOMER SATISFACTION INDEX</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white font-mono">4.82 / 5.0</span>
            <span className="text-[9px] text-emerald-400 flex items-center">
              <TrendingUp className="w-2.5 h-2.5" /> +1.2%
            </span>
          </div>
          <p className="text-[10px] text-gray-500">Based on Aliko AI post-call logs</p>
        </div>

        {/* AI Voice Agent Resolution factor */}
        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-2">
          <span className="text-[9px] uppercase font-bold text-gray-500 block font-mono">AI AUTO-RESOLUTION success</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white font-mono">84.2%</span>
            <span className="text-[9px] text-emerald-400 flex items-center">
              <TrendingUp className="w-2.5 h-2.5" /> +4.8%
            </span>
          </div>
          <p className="text-[10px] text-gray-500">Scheduled offline schedule checkins</p>
        </div>

        {/* Call airtime minutes conserved */}
        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-2">
          <span className="text-[9px] uppercase font-bold text-gray-500 block font-mono">NET TELEPHONY COST CONSERVED</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-orange-400 font-mono">189,200 ₦</span>
            <span className="text-[9px] text-emerald-400 flex items-center">Saved</span>
          </div>
          <p className="text-[10px] text-gray-500">Apapa cell driver data compression</p>
        </div>

        {/* Total meetings duration */}
        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-2">
          <span className="text-[9px] uppercase font-bold text-gray-500 block font-mono">AVERAGE ALIGNMENT LAG</span>
          <div className="text-xl font-semibold text-white font-mono">1.1 min</div>
          <p className="text-[10px] text-gray-500">Reduced from 9.4m using AI Studio</p>
        </div>

      </div>

      {/* Grid: 7-Day Communications Heatmap & Progress Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Heatmap Grid Panel */}
        <div className="lg:col-span-2 bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div>
              <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">LIVE HEAT DISTRIBUTION</span>
              <h4 className="text-xs font-bold text-white font-display mt-0.5">Hourly Terminal Call Density (Mon - Sun)</h4>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span>Low</span>
              <span className="h-2.5 w-2.5 rounded bg-orange-950/40"></span>
              <span className="h-2.5 w-2.5 rounded bg-orange-850/60"></span>
              <span className="h-2.5 w-2.5 rounded bg-orange-650"></span>
              <span className="h-2.5 w-2.5 rounded bg-orange-500 animate-pulse"></span>
              <span>High density</span>
            </div>
          </div>

          {/* Grid blocks layout */}
          <div className="space-y-2">
            {activityDays.map((ad, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-10 text-[10px] text-gray-500 font-bold font-mono text-left">{ad.day}</span>
                <div className="flex-1 grid grid-cols-8 gap-1.5">
                  {ad.hours.map((val, i) => {
                    let bgClass = "bg-orange-950/25";
                    if (val > 80) bgClass = "bg-orange-500 border border-orange-400/20";
                    else if (val > 50) bgClass = "bg-orange-650/80";
                    else if (val > 20) bgClass = "bg-orange-850/40";
                    
                    return (
                      <div 
                        key={i} 
                        className={`h-7.5 rounded-lg ${bgClass} transition-all hover:scale-105 cursor-pointer flex items-center justify-center text-[8px] font-mono font-bold text-black/50`}
                        title={`Day ${ad.day} Hour ${i}: ${val}% capacity`}
                      >
                        {val > 50 ? `${val}%` : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-[9px] text-gray-500 font-mono pt-1">
            <span className="pl-12">06:00 AM</span>
            <span>12:00 PM (Noon Peak)</span>
            <span>08:00 PM (Clearance Shift)</span>
          </div>
        </div>

        {/* Cognitive AI analytics highlights helper */}
        <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-orange-400">
              <Brain className="w-4 h-4 text-orange-500" />
              <h5 className="text-xs font-bold uppercase tracking-wider font-mono">Cognitive dispatch insights</h5>
            </div>
            <p className="text-[10px] text-gray-500 font-light">Derived directly from driver audio logs and transits records.</p>
          </div>

          <div className="space-y-4 flex-1 my-3 overflow-y-auto max-h-[160px] pr-1">
            <div>
              <div className="flex justify-between text-[11px] font-medium text-white mb-1">
                <span>Swahili Client Remittance Success</span>
                <span className="font-mono text-orange-400">92%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-600 h-full rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium text-white mb-1">
                <span>Nigerian Driver Voice Transcriptions accuracy</span>
                <span className="font-mono text-orange-400">96.8%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: "96.8%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-medium text-white mb-1">
                <span>Airtime Dollar overhead saving ratio</span>
                <span className="font-mono text-orange-400">89.4%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-600 h-full rounded-full" style={{ width: "89.4%" }}></div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-505 bg-black p-3 rounded-xl border border-white/5 leading-normal font-light">
            <span className="font-bold text-white">Advisory:</span> High peak activities noted around <span className="text-orange-400 font-semibold font-mono">Wednesday 12:00 PM</span>. Keeping AI receptionist backup limits active during this hour maintains dispatch order index.
          </p>
        </div>

      </div>

    </div>
  );
}
