import React, { useState, useEffect } from "react";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Sparkles, 
  Copy, 
  Play, 
  Sliders, 
  Globe, 
  Volume2, 
  AlertCircle,
  FileText
} from "lucide-react";
import { ActiveCall, Workspace } from "../types";

interface CallsViewProps {
  activeCall: ActiveCall | null;
  activeWorkspace: Workspace;
  soundIntensity: number;
  isDataSavingMode: boolean;
  onStartCall: (type: "audio" | "video") => void;
  onEndCall: () => void;
  onEndCallAndSummarize: () => void;
  onSimulateSpeech: (speaker: string, text: string) => void;
}

export default function CallsView({
  activeCall,
  activeWorkspace,
  soundIntensity,
  isDataSavingMode,
  onStartCall,
  onEndCall,
  onEndCallAndSummarize,
  onSimulateSpeech
}: CallsViewProps) {
  
  const [typedPhoneNumber, setTypedPhoneNumber] = useState("");
  const [callerName, setCallerName] = useState("External Fleet Driver");
  const [noiseCancellationOn, setNoiseCancellationOn] = useState(true);
  const [recordingCall, setRecordingCall] = useState(true);
  const [dialerStatus, setDialerStatus] = useState<"idle" | "calling" | "active">("idle");
  
  // Realtime call transcript translator dialect
  const [realtimeSpeechLang, setRealtimeSpeechLang] = useState("Swahili (Kenya/East Africa)");
  const [speechTranslations, setSpeechTranslations] = useState<{ [originalText: string]: string }>({});
  const [isTranslatingSpeechIndex, setIsTranslatingSpeechIndex] = useState<string | null>(null);

  // Auto-translate speech transcripts dynamically as they are appended
  useEffect(() => {
    if (activeCall && activeCall.transcripts.length > 0) {
      const lastTranscript = activeCall.transcripts[activeCall.transcripts.length - 1];
      const isAlreadyTranslated = !!speechTranslations[lastTranscript.text];
      
      if (!isAlreadyTranslated) {
        // Run background request to translate this line of dialer speech instantly
        const cleanLang = realtimeSpeechLang.split(" ")[0];
        setIsTranslatingSpeechIndex(lastTranscript.text);
        
        fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: lastTranscript.text,
            targetLanguage: realtimeSpeechLang,
            sourceLanguage: "English"
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.translatedText) {
            setSpeechTranslations(prev => ({
              ...prev,
              [lastTranscript.text]: data.translatedText
            }));
          }
        })
        .catch(err => {
          console.error("Speech realtime translation glitch", err);
          // Fallback simulation
          setSpeechTranslations(prev => ({
            ...prev,
            [lastTranscript.text]: `[Simulated ${cleanLang}]: ${lastTranscript.text} (translated)`
          }));
        })
        .finally(() => {
          setIsTranslatingSpeechIndex(null);
        });
      }
    }
  }, [activeCall?.transcripts, realtimeSpeechLang]);

  const handleKeyPress = (num: string) => {
    setTypedPhoneNumber(prev => prev + num);
  };

  const handleClear = () => {
    setTypedPhoneNumber("");
  };

  const executeManualDial = () => {
    if (!typedPhoneNumber) return;
    onStartCall("audio");
  };

  return (
    <div className="space-y-6" id="calls-main-view">
      
      {/* Banner */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-orange-500" />
            VoIP Dial Lounge & Real-time Translation Panel
          </h3>
          <p className="text-xs text-gray-400 font-light mt-0.5">Cellular bandwidth audio compressor optimized for remote logistics and drivers.</p>
        </div>
        
        <span className={`px-2.5 py-1 text-[9px] font-mono font-bold rounded-lg ${
          isDataSavingMode
            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
            : "bg-white/5 text-gray-400 border border-white/5"
        }`}>
          {isDataSavingMode ? "LOW DATA: VOICE PRIORITIZATION ACTIVE" : "BALANCED MODE"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dial Pad & Quick Contacts Column */}
        <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
          <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">ENTERPRISE ADAPTIVE TELEPHONY</span>
          
          {/* Display screen and numbers */}
          <div className="bg-black/60 p-3 rounded-xl border border-white/5 space-y-1">
            <input 
              type="text" 
              placeholder="+234 (0) 803 000 0000"
              value={typedPhoneNumber}
              onChange={(e) => setTypedPhoneNumber(e.target.value)}
              className="w-full bg-transparent border-0 ring-0 focus:ring-0 text-white font-mono text-base tracking-widest text-center"
            />
            <div className="text-[10px] text-gray-500 text-center font-light">
              Destination: {activeWorkspace.region} ({activeWorkspace.currency})
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleKeyPress(btn)}
                className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2.5 rounded-xl border border-white/5 transition-all transition-colors active:scale-95"
              >
                {btn}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={executeManualDial}
              disabled={!typedPhoneNumber}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:hover:bg-orange-600 text-black text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-600/10 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" /> Dial Route Line
            </button>
          </div>

          {/* Preset contacts shortcuts */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">PRESET DISPATCH TERMINALS</span>
            <div className="space-y-1">
              <button
                onClick={() => { setTypedPhoneNumber("+234 81 9091 1121"); setCallerName("Baba-ola Depot Dispatch"); }}
                className="w-full text-left p-2 hover:bg-white/5 text-gray-400 hover:text-white text-xs rounded-xl flex items-center justify-between border border-transparent hover:border-white/5 transition-all"
              >
                <span>🇳🇬 Baba-ola (Apapa Wharf)</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">Terminal 1</span>
              </button>
              <button
                onClick={() => { setTypedPhoneNumber("+254 722 0001 92"); setCallerName("Nairobi Farmer Center"); }}
                className="w-full text-left p-2 hover:bg-white/5 text-gray-400 hover:text-white text-xs rounded-xl flex items-center justify-between border border-transparent hover:border-white/5 transition-all"
              >
                <span>🇰🇪 Driver Kofi (Swahili)</span>
                <span className="text-[9px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded">Transit Log</span>
              </button>
            </div>
          </div>

        </div>

        {/* Central Live dialer panel / Call Controls */}
        <div className="lg:col-span-2 space-y-4">
          
          {activeCall ? (
            <div className="bg-gradient-to-br from-neutral-900/80 to-transparent border border-white/10 rounded-3xl p-5 space-y-4 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-44 h-44 bg-orange-600/5 rounded-full blur-2xl -z-10"></div>
              
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-2 pb-0.5 animate-pulse bg-orange-600 text-black text-[9px] font-bold rounded font-mono">
                    CONNECTED LINE (16kHz G.711)
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">
                    {callerName} ({activeCall.bandwidthMode})
                  </h4>
                </div>
                <div className="text-right text-xs">
                  <span className="text-gray-500 font-mono">DURATION: </span>
                  <span className="font-mono text-white">
                    {Math.floor(activeCall.durationSeconds / 60)}:{(activeCall.durationSeconds % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Sound visual Wave pattern */}
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center space-y-4 min-h-[160px]">
                
                {/* Voice sound equalizer lines */}
                <div className="h-12 flex items-center gap-1">
                  {[20, 40, 80, 50, 90, 30, 20, 60, 40, 10, 50, 70, 30, 80, 40].map((height, i) => {
                    const dynamicH = Math.max(10, height * (soundIntensity / 50));
                    return (
                      <div 
                        key={i} 
                        className="w-1.5 bg-orange-500 rounded-full transition-all duration-300"
                        style={{ height: `${dynamicH}%` }}
                      ></div>
                    );
                  })}
                </div>

                <div className="text-center">
                  <p className="text-xs font-medium text-gray-200">
                    Routing voice packages dynamically through cellular proxy.
                  </p>
                  <p className="text-[10px] text-orange-400 mt-1 font-mono">
                    Compressed throughput is operating at excellent 14 kbit/s. Accumulated savings: {activeCall.dataSavedMB.toFixed(2)} MB
                  </p>
                </div>
              </div>

              {/* Toggles bar */}
              <div className="flex items-center justify-between gap-4 flex-wrap bg-black/20 p-3 rounded-2xl border border-white/5 text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={noiseCancellationOn} 
                      onChange={() => setNoiseCancellationOn(!noiseCancellationOn)}
                      className="accent-orange-500 rounded"
                    />
                    <span>Noise Suppression</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={recordingCall} 
                      onChange={() => setRecordingCall(!recordingCall)}
                      className="accent-orange-500 rounded"
                    />
                    <span>AI Stream Tracker</span>
                  </label>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onSimulateSpeech("Driver Kofi", "Mo ti de port, clearance is fine now. Ready to transit.")}
                    className="text-[9px] bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-1 rounded-lg border border-white/5"
                  >
                    Kofi Speaks
                  </button>
                  <button
                    onClick={() => onSimulateSpeech("Apapa Depot", "Please verify Paystack ticket logs.")}
                    className="text-[9px] bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-1 rounded-lg border border-white/5"
                  >
                    Depot Speaks
                  </button>
                </div>
              </div>

              {/* Live transcriptions with Instant Call Speeches Translation Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Transcript feed */}
                <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 text-xs">
                  <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block mb-2 font-mono">Live Call Audio Feed</span>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                    {activeCall.transcripts.map((t, idx) => (
                      <div key={idx} className="bg-white/[0.02] p-2 rounded-xl border border-white/5 text-[11px]">
                        <span className="font-bold text-gray-300">{t.speaker}: </span>
                        <span>{t.text}</span>
                        <span className="block text-right text-[8px] text-gray-500 mt-0.5">{t.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Speech translation output */}
                <div className="bg-orange-950/10 p-3.5 rounded-2xl border border-orange-900/20 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] uppercase font-bold text-orange-400 tracking-wider block font-mono">Real-time AI Audio Translation</span>
                    <select
                      value={realtimeSpeechLang}
                      onChange={(e) => setRealtimeSpeechLang(e.target.value)}
                      className="bg-black/60 border border-orange-900/30 text-orange-400 text-[10px] px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      <option value="Yoruba (Nigeria)">Yoruba</option>
                      <option value="Hausa (Nigeria/West Africa)">Hausa</option>
                      <option value="Igbo (Nigeria)">Igbo</option>
                      <option value="Swahili (Kenya/East Africa)">Swahili</option>
                      <option value="French (West Africa/Congo)">French</option>
                    </select>
                  </div>

                  <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                    {activeCall.transcripts.map((t, idx) => {
                      const trans = speechTranslations[t.text];
                      return (
                        <div key={idx} className="bg-orange-500/[0.04] p-2 rounded-xl border border-orange-500/10 text-[11px] leading-normal">
                          <span className="font-bold text-orange-400">{t.speaker} Dialect: </span>
                          <span className="text-gray-300 italic">
                            {isTranslatingSpeechIndex === t.text ? "Translating audio..." : trans ? `"${trans}"` : `Pending audio payload...`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* End / Summarize Controls */}
              <div className="flex gap-3 justify-end pt-2 border-t border-white/5">
                <button
                  onClick={onEndCall}
                  className="bg-red-950/40 hover:bg-red-900/50 text-red-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-red-900/30 transition-colors"
                >
                  Terminate Call
                </button>
                <button
                  onClick={onEndCallAndSummarize}
                  className="bg-orange-600 hover:bg-orange-700 text-black text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-orange-600/10"
                >
                  <Sparkles className="w-4 h-4 text-black" /> End & Summarize with Gemini
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
              <div className="h-16 w-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-500">
                <Phone className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">No Active VoIP Call</h4>
                <p className="text-xs text-gray-400 max-w-sm leading-normal font-light">
                  Type a standard African driver routing number, select a preset terminal checkpoint, or press dial to start.
                </p>
              </div>
              <button
                onClick={() => { setTypedPhoneNumber("+234 803 111 0920"); onStartCall("audio"); }}
                className="bg-white/5 border border-white/10 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl hover:bg-white/10 transition-all font-sans"
              >
                Fast-Simulate Audio Room
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
