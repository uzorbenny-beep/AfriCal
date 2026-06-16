import React, { useState } from "react";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Share2, 
  Sparkles, 
  PhoneOff, 
  Clock, 
  Database,
  Brain,
  List,
  Mail,
  Copy,
  Plus
} from "lucide-react";
import { ActiveCall, Workspace } from "../types";

interface MeetingViewProps {
  activeCall: ActiveCall | null;
  activeWorkspace: Workspace;
  soundIntensity: number;
  isDataSavingMode: boolean;
  onStartCall: (type: "audio" | "video") => void;
  onEndCall: () => void;
  onEndCallAndSummarize: () => void;
  onSimulateSpeech: (speaker: string, text: string) => void;
}

export default function MeetingView({
  activeCall,
  activeWorkspace,
  soundIntensity,
  isDataSavingMode,
  onStartCall,
  onEndCall,
  onEndCallAndSummarize,
  onSimulateSpeech
}: MeetingViewProps) {
  
  const [screenSharing, setScreenSharing] = useState(false);
  const [meetingReaction, setMeetingReaction] = useState<string | null>(null);

  const triggerReaction = (icon: string) => {
    setMeetingReaction(icon);
    setTimeout(() => setMeetingReaction(null), 2500);
  };

  return (
    <div className="space-y-6" id="meeting-main-canvas">
      
      {/* Header Info */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-display flex items-center gap-1.5">
            <Video className="w-5 h-5 text-orange-500 animate-pulse" />
            HD Meetings & Intelligent Video Conference Hall
          </h3>
          <p className="text-xs text-gray-400 font-light mt-0.5">Collaborative layout designed for mixed-bandwidth teams in Sub-Saharan Africa.</p>
        </div>

        <div className="flex gap-2">
          <span className="text-xs bg-white/5 border border-white/5 p-2 rounded-xl text-gray-300 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-orange-400" />
            Comp Ratio: {isDataSavingMode ? "91% (Saves 2.8 MB/m)" : "Baseline"}
          </span>
        </div>
      </div>

      {activeCall ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Large Column: Participant camera feed streams */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="bg-black border border-white/10 rounded-3xl overflow-hidden relative min-h-[340px] flex flex-col justify-between p-4">
              
              {/* Meeting Meta floating bar */}
              <div className="flex items-center justify-between z-10">
                <span className="bg-black/60 border border-white/10 p-1.5 px-3 rounded-full text-[10px] text-white font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  Lobby Room: {activeWorkspace.name}
                </span>

                <span className="bg-orange-600 font-bold text-black text-[9px] font-mono px-2.5 py-1 rounded">
                  {isDataSavingMode ? "LOW QUANT COMPRESSION" : "HD BALANCED"}
                </span>
              </div>

              {/* Floating Active reaction element */}
              {meetingReaction && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="bg-orange-500 text-black font-display font-medium px-6 py-3 rounded-2xl text-2xl animate-bounce shadow-xl">
                    {meetingReaction}
                  </div>
                </div>
              )}

              {/* Streams Container */}
              <div className="flex-1 flex items-center justify-center my-4">
                {isDataSavingMode ? (
                  /* Shuts down high-payload video streams to save driver cell bills */
                  <div className="text-center space-y-3 p-6 bg-orange-950/20 rounded-2xl border border-orange-500/20 max-w-sm">
                    <VideoOff className="w-8 h-8 text-orange-500 mx-auto" />
                    <div className="space-y-1">
                      <h5 className="text-xs font-bold text-white">Low Bandwidth Mode Suspended Video</h5>
                      <p className="text-[10px] text-orange-300/80 leading-normal font-light">
                        To prioritize lag-free audio alignment under Apapa port telecom loads, camera streams are pixelated. Total bandwidth dropped to average 18 kbit/s.
                      </p>
                    </div>
                    
                    <div className="flex gap-2 justify-center pt-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <div className="h-2 w-2 rounded-full bg-orange-400 animate-ping"></div>
                    </div>
                  </div>
                ) : (
                  /* Standard high-quality video frames grid */
                  <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                    <div className="bg-neutral-900 aspect-video rounded-2xl relative overflow-hidden border border-white/5">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=220" className="w-full h-full object-cover opacity-60" />
                      <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono">Amara N.</span>
                    </div>
                    <div className="bg-neutral-900 aspect-video rounded-2xl relative overflow-hidden border border-white/5">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=220" className="w-full h-full object-cover opacity-60" />
                      <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono">Baba-ola J.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Toolbar controls */}
              <div className="bg-neutral-900/90 border border-white/10 rounded-2xl p-2.5 flex items-center justify-between gap-4 max-w-md mx-auto w-full z-10">
                <div className="flex gap-2">
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300">
                    <Video className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                  {["👍", "🔥", "🤝", "🙌"].map((reactObj) => (
                    <button
                      key={reactObj}
                      onClick={() => triggerReaction(reactObj)}
                      className="hover:bg-white/10 p-1 px-2 rounded-lg text-xs"
                    >
                      {reactObj}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setScreenSharing(!screenSharing)}
                    className={`p-2 rounded-xl text-xs font-semibold ${
                      screenSharing ? "bg-orange-600 text-black" : "bg-white/5 text-gray-300"
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={onEndCall}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-xl text-white"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Simulated Voice interactions */}
            <div className="flex items-center justify-between gap-3 bg-white/[0.01] border border-white/5 p-3 rounded-2xl text-xs">
              <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">Operational Dispatch Mimick:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onSimulateSpeech("Amara N.", "We just secured customs clearance for truck 1 in Swahili region.")}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1 rounded-lg border border-white/5 text-[10px]"
                >
                  Amara Speaks Clearance
                </button>
                <button
                  onClick={() => onSimulateSpeech("Baba-ola J.", "Excellent! Notify driver Kofi to depart Apapa warehouse immediately.")}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1 rounded-lg border border-white/5 text-[10px]"
                >
                  Baba-Ola Directs Kofi
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: AI Assistant Meeting Companion Sidebar */}
          <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 flex flex-col justify-between h-[420px]">
            
            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              
              <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                <Brain className="w-5 h-5 text-orange-500 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Cognitive Meeting Assistant</h4>
                  <p className="text-[10px] text-gray-500 font-light">Compiles active decisons and alerts live.</p>
                </div>
              </div>

              {/* Decisions list block */}
              <div className="space-y-3">
                <span className="text-[9px] uppercase font-bold text-orange-400 tracking-wider block font-mono">Captured Actions & Decisions</span>
                
                <div className="space-y-2">
                  <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs font-light">
                    <span className="font-semibold text-emerald-400 block text-[10px] uppercase font-mono">Resolved</span>
                    All container transits loaded through Lagos port to trigger Data Savings default settings on AfriCall VoIP handsets.
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 text-xs font-light">
                    <span className="font-semibold text-orange-500 block text-[10px] uppercase font-mono">Pending Audit</span>
                    Drivers on the road to send daily voice notes in Swahili or Yoruba for auto-translation to Apapa operations log.
                  </div>
                </div>
              </div>

              {/* Spoken captional dialogs feed */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Live Conference Speech Log</span>
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                  {activeCall.transcripts.map((t, idx) => (
                    <div key={idx} className="bg-white/[0.01] p-2 rounded-xl text-[10px] leading-relaxed border border-white/5">
                      <span className="font-semibold text-orange-400">{t.speaker}: </span>
                      <span className="text-gray-300">{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Complete compile control button */}
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={onEndCallAndSummarize}
                className="w-full bg-orange-600 hover:bg-orange-700 text-black text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-orange-600/15 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-black" /> End & Generate Executive Minutes
              </button>
            </div>

          </div>

        </div>
      ) : (
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]">
          <div className="h-16 w-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400">
            <Video className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">No Active Video Meeting</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-normal font-light">
              Create a lag-compressed multi-regional room grid instantly to align teams face-to-face.
            </p>
          </div>
          <button
            onClick={() => onStartCall("video")}
            className="bg-orange-600 hover:bg-orange-700 text-black text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-orange-600/10 transition-all font-sans cursor-pointer"
          >
            Launch Collaborative HD Meeting Room
          </button>
        </div>
      )}

    </div>
  );
}
