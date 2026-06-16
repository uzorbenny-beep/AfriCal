import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Video,
  User,
  Users,
  Settings,
  Plus,
  Send,
  Volume2,
  Mic,
  FileText,
  Brain,
  Globe,
  Smile,
  AlertCircle,
  TrendingUp,
  Sliders,
  Sparkles,
  Download,
  Copy,
  Mail,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Database,
  BarChart,
  Moon,
  Sun,
  LayoutGrid,
  FileDown,
  Sparkle,
  Menu,
  X
} from "lucide-react";
import {
  Workspace,
  Channel,
  Message,
  FileShare,
  ActiveCall,
  MeetingSummaryReport
} from "./types";
import {
  initialWorkspaces,
  defaultChannels,
  initialMessages,
  defaultFiles
} from "./data";

// Substructure imports
import DashboardView from "./components/DashboardView";
import CallsView from "./components/CallsView";
import MeetingView from "./components/MeetingView";
import AgentBuilderView from "./components/AgentBuilderView";
import AnalyticsView from "./components/AnalyticsView";
import SettingsView from "./components/SettingsView";

export default function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // App General State
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(initialWorkspaces[0]);
  const [channels, setChannels] = useState<{ [id: string]: Channel[] }>(defaultChannels);
  const [activeChannel, setActiveChannel] = useState<Channel>(defaultChannels["ws-lagos"][1]); // Default to 'operations'
  const [messages, setMessages] = useState<{ [id: string]: Message[] }>(initialMessages);
  const [files, setFiles] = useState<FileShare[]>(defaultFiles);
  
  // Custom Workspace Form Modal State
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);
  const [newWsName, setNewWsName] = useState("");
  const [newWsRegion, setNewWsRegion] = useState("Lagos, Nigeria");
  const [newWsCurrency, setNewWsCurrency] = useState("NGN (₦)");
  const [newWsMembers, setNewWsMembers] = useState(1);

  // Active Tab View Configuration
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Data Saving Mode Configurations
  const [isDataSavingMode, setIsDataSavingMode] = useState(true);
  const [loginSavingsMB, setLoginSavingsMB] = useState(14.8); // Demo accumulator

  // Selected language for translation helper
  const [selectedTargetLang, setSelectedTargetLang] = useState("Yoruba (Nigeria)");
  
  // Instant translator settings
  const [instantAutoTranslateOn, setInstantAutoTranslateOn] = useState(false);

  // Chat Input State
  const [chatTextInput, setChatTextInput] = useState("");
  const [activePollInput, setActivePollInput] = useState<{ question: string; opt1: string; opt2: string } | null>(null);
  
  // Audio Recorder State
  const [isRecordingVal, setIsRecordingVal] = useState(false);

  // Selected Active Call State
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [isSummarizingCall, setIsSummarizingCall] = useState(false);
  const [callReport, setCallReport] = useState<MeetingSummaryReport | null>(null);
  const callDurationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // AI Receptionist Assistant Workspace State
  const [receptionistHistory, setReceptionistHistory] = useState<Array<{ sender: "user" | "receptionist"; text: string }>>([
    { sender: "receptionist", text: "Welcome to Aliko Logistics! I am your AI receptionist. I can help you schedule truck check-ins, take service pre-orders, and route drivers. What can I do for you today?" }
  ]);
  const [isReceptionistThinking, setIsReceptionistThinking] = useState(false);

  // Document Categorizer & upload simulation
  const [uploadTextContent, setUploadTextContent] = useState("");
  const [uploadFileName, setUploadFileName] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [activeUploadedFile, setActiveUploadedFile] = useState<FileShare | null>(null);

  // Content Generator State
  const [genContext, setGenContext] = useState("");
  const [genType, setGenType] = useState("Delivery Advisory Email");
  const [genTone, setGenTone] = useState("Professional & Humble");
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [generatedContentResult, setGeneratedContentResult] = useState("");

  // Loading indicator maps for single actions
  const [loadingSentimentMsgId, setLoadingSentimentMsgId] = useState<string | null>(null);
  const [loadingTranslateMsgId, setLoadingTranslateMsgId] = useState<string | null>(null);

  // Sound visualization wave level representation
  const [soundIntensity, setSoundIntensity] = useState(20);

  // Speech Synthesizer support
  const speakTextRef = (text: string) => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 1.0;
      window.speechSynthesis.speak(msg);
    } else {
      console.log("SpeechSynthesis not supported on this framing container.");
    }
  };

  // Update dynamic sound bar in call
  useEffect(() => {
    let interval: any;
    if (activeCall && activeCall.status === "active") {
      interval = setInterval(() => {
        setSoundIntensity(Math.floor(Math.random() * 80) + 15);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  // Handle Workspace Switch
  const switchWorkspace = (ws: Workspace) => {
    setActiveWorkspace(ws);
    const wsChannels = channels[ws.id] || [];
    if (wsChannels.length > 0) {
      setActiveChannel(wsChannels[0]);
    }
  };

  // Create workspace callback
  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) return;

    const newId = `ws-${Date.now()}`;
    const newWs: Workspace = {
      id: newId,
      name: newWsName,
      subTitle: `A tailored workspace for ${newWsRegion}`,
      region: newWsRegion,
      currency: newWsCurrency,
      membersCount: newWsMembers || 1
    };

    const newChans: Channel[] = [
      { id: `${newId}-general`, name: "general", type: "text", description: `General discussion in ${newWsName}` },
      { id: `${newId}-dispatch`, name: "dispatch-board", type: "text", description: "Coordination feed and tracking" },
      { id: `${newId}-voice`, name: "Instant Lounge", type: "voice", description: "Low-bandwidth audio Alignment" }
    ];

    setWorkspaces([...workspaces, newWs]);
    setChannels({ ...channels, [newId]: newChans });
    setMessages({
      ...messages,
      [`${newId}-general`]: [
        {
          id: `welcome-${Date.now()}`,
          sender: "System Pilot",
          senderRole: "Workspace Facilitator",
          avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
          text: `Welcome to the brand new ${newWsName} workspace! We've automatically setup low-bandwidth voice channels optimized for ${newWsRegion}. Use the translation helper below to write in any language.`,
          timestamp: "Just Now"
        }
      ]
    });

    switchWorkspace(newWs);
    setShowNewWorkspaceModal(false);
    setNewWsName("");
  };

  // Action: Translate a chat bubble
  const handleTranslateMessage = async (msgId: string, text: string) => {
    setLoadingTranslateMsgId(msgId);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          targetLanguage: selectedTargetLang,
        }),
      });
      const data = await res.json();
      if (data.translatedText) {
        const chanMsgs = messages[activeChannel.id] || [];
        const updated = chanMsgs.map((m) => {
          if (m.id === msgId) {
            return {
              ...m,
              translatedText: {
                ...m.translatedText,
                [selectedTargetLang]: data.translatedText,
              },
            };
          }
          return m;
        });
        setMessages({ ...messages, [activeChannel.id]: updated });
      }
    } catch (e) {
      console.error("Translation failed", e);
    } finally {
      setLoadingTranslateMsgId(null);
    }
  };

  // Action: Analyze emotion of message
  const handleAnalyzeSentiment = async (msgId: string, text: string) => {
    setLoadingSentimentMsgId(msgId);
    try {
      const res = await fetch("/api/analyze-sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.sentiment) {
        const chanMsgs = messages[activeChannel.id] || [];
        const updated = chanMsgs.map((m) => {
          if (m.id === msgId) {
            return {
              ...m,
              sentiment: data.sentiment,
            };
          }
          return m;
        });
        setMessages({ ...messages, [activeChannel.id]: updated });
      }
    } catch (e) {
      console.error("Sentiment evaluation fail", e);
    } finally {
      setLoadingSentimentMsgId(null);
    }
  };

  // Action: Send a standard message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatTextInput.trim()) return;

    const userText = chatTextInput;
    setChatTextInput("");

    const newMsgId = `msg-user-${Date.now()}`;
    const newMsg: Message = {
      id: newMsgId,
      sender: "Me (Operations)",
      senderRole: "Hq Coordinator",
      avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&h=100&fit=crop",
      text: userText,
      timestamp: "Just Now",
    };

    const currentChannelMsgs = messages[activeChannel.id] || [];
    const updatedChannelMsgs = [...currentChannelMsgs, newMsg];
    setMessages(prev => ({
      ...prev,
      [activeChannel.id]: updatedChannelMsgs
    }));

    // If instant auto-translation is active, run it instantly
    if (instantAutoTranslateOn) {
      handleTranslateMessage(newMsgId, userText);
    }

    // Auto receptionist replies logic if we are inside the receptionist channel
    if (activeChannel.id === "receptionist-agent") {
      setIsReceptionistThinking(true);
      try {
        const res = await fetch("/api/receptionist-call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: userText,
            history: receptionistHistory,
          }),
        });
        const data = await res.json();
        if (data.reply) {
          const systemMsg: Message = {
            id: `msg-system-${Date.now()}`,
            sender: "Automated Receptionist",
            senderRole: "AI Client Intake Bot",
            avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
            text: data.reply,
            timestamp: "Just Now",
          };

          setMessages(prev => ({
            ...prev,
            [activeChannel.id]: [...(prev[activeChannel.id] || []), systemMsg]
          }));
          
          setReceptionistHistory(prev => [
            ...prev,
            { sender: "user", text: userText },
            { sender: "receptionist", text: data.reply }
          ]);
        }
      } catch (err) {
        console.error("Receptionist endpoint failure", err);
      } finally {
        setIsReceptionistThinking(false);
      }
    }
  };

  // Action: Launch a quick text suggestion
  const handleQuickSend = (text: string) => {
    setChatTextInput(text);
  };

  // Action: Submit a poll
  const handleRaisePoll = () => {
    if (!activePollInput) return;
    const pollObj = {
      question: activePollInput.question,
      options: [
        { id: "opt-1", text: activePollInput.opt1, votes: 0 },
        { id: "opt-2", text: activePollInput.opt2, votes: 0 }
      ]
    };

    const newPollMsg: Message = {
      id: `poll-${Date.now()}`,
      sender: "Me (Operations)",
      senderRole: "Hq Coordinator",
      avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&h=100&fit=crop",
      text: `Poll: ${activePollInput.question}`,
      timestamp: "Just Now",
      poll: pollObj
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), newPollMsg]
    }));
    setActivePollInput(null);
  };

  // Action: Vote in raised poll
  const handleVotePoll = (msgId: string, optionId: string) => {
    const chanMsgs = messages[activeChannel.id] || [];
    const updated = chanMsgs.map((m) => {
      if (m.id === msgId && m.poll) {
        const alreadyVoted = m.poll.myVoteId === optionId;
        const opts = m.poll.options.map(opt => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + (alreadyVoted ? -1 : 1) };
          }
          return opt;
        });

        return {
          ...m,
          poll: {
            ...m.poll,
            options: opts,
            myVoteId: alreadyVoted ? undefined : optionId
          }
        };
      }
      return m;
    });
    setMessages({ ...messages, [activeChannel.id]: updated });
  };

  // Action: Simulated Voice note trigger recording
  const handleTriggerSimulateVoiceNote = () => {
    const defaultVoiceMsg: Message = {
      id: `voice-note-${Date.now()}`,
      sender: "Me (Operations)",
      senderRole: "Hq Coordinator",
      avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&h=100&fit=crop",
      text: "[Voice Note Transcribed: 'Lagos Mainland driver Kofi. Checking in from toll gate. Truck payload looks clear for dispatch. Over.']",
      timestamp: "Just Now",
      isVoiceNote: true,
      voiceDuration: "0:09",
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), defaultVoiceMsg]
    }));

    if (isDataSavingMode) {
      setLoginSavingsMB(prev => prev + 1.25); // Voice is 90% lighter than standard VoIP
    }
  };

  // Action: Simulated File upload & summaries using model API
  const handleSimulateFileSelect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim() || !uploadTextContent.trim()) return;

    setIsUploadingFile(true);
    try {
      const res = await fetch("/api/summarize-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: uploadFileName,
          content: uploadTextContent
        }),
      });
      const data = await res.json();
      const newFileObj: FileShare = {
        id: `file-${Date.now()}`,
        fileName: uploadFileName,
        fileSize: "1.2 KB",
        uploader: "Me (Operations)",
        uploadedAt: "Just Now",
        category: "Operational Report",
        description: `Uploaded dispatch guidelines: ${uploadFileName}`,
        takeaways: data.summary ? [data.summary] : ["No quick takeaways parsed."],
        contentSample: uploadTextContent
      };

      setFiles(prev => [newFileObj, ...prev]);
      setActiveUploadedFile(newFileObj);

      const systemMsg: Message = {
        id: `msg-file-${Date.now()}`,
        sender: "System Pilot",
        senderRole: "Workspace Facilitator",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
        text: `Successfully uploaded ${uploadFileName}. Gemini distilled immediate summary takeaways inside the right workspace file pane on your dashboard.`,
        timestamp: "Just Now",
        fileAttachment: {
          fileName: uploadFileName,
          fileSize: "1.2 KB",
          category: "Operations Doc",
          summary: data.summary || "Pending digest"
        }
      };

      setMessages(prev => ({
        ...prev,
        [activeChannel.id]: [...(prev[activeChannel.id] || []), systemMsg]
      }));

    } catch (err) {
      console.error("Synthesising file summary error", err);
    } finally {
      setIsUploadingFile(false);
      setUploadFileName("");
      setUploadTextContent("");
    }
  };

  // Action: Start simulated telephone or meeting call
  const handleStartCall = (type: "audio" | "video") => {
    const callObj: ActiveCall = {
      id: `call-${Date.now()}`,
      channelName: activeChannel.name,
      type,
      status: "active",
      durationSeconds: 0,
      dataSavedMB: 0,
      bandwidthMode: isDataSavingMode ? "Data-Saver" : "Balanced",
      isRecording: true,
      transcripts: [
        { speaker: "Baba-ola J. (Head of Logistics)", text: "Connecting line. Hello AfriCall alignment room.", time: "0s" }
      ]
    };

    setActiveCall(callObj);

    // Dynamic timer
    callDurationIntervalRef.current = setInterval(() => {
      setActiveCall(prev => {
        if (!prev) return null;
        const dur = prev.durationSeconds + 1;
        // cumulative simulated savings
        const deltaMB = isDataSavingMode ? 2.8 / 60 : 0.4 / 60;
        setLoginSavingsMB(s => s + deltaMB);

        return {
          ...prev,
          durationSeconds: dur,
          dataSavedMB: prev.dataSavedMB + deltaMB
        };
      });
    }, 1000);
  };

  // Simulate speaking input in Call transcripts
  const handleSimulateCallSpeech = (speaker: string, text: string) => {
    if (!activeCall) return;
    const curTime = `${Math.floor(activeCall.durationSeconds / 60)}:${(activeCall.durationSeconds % 60).toString().padStart(2, "0")}`;
    
    setActiveCall(prev => {
      if (!prev) return null;
      return {
        ...prev,
        transcripts: [
          ...prev.transcripts,
          { speaker, text, time: curTime }
        ]
      };
    });
  };

  // Action: Terminate Call
  const handleEndCall = () => {
    if (callDurationIntervalRef.current) {
      clearInterval(callDurationIntervalRef.current);
    }
    setActiveCall(null);
  };

  // Action: End Call and run Gemini meeting summary report distillation
  const handleEndCallAndSummarize = async () => {
    if (!activeCall) return;
    setIsSummarizingCall(true);
    
    // terminate stream first
    if (callDurationIntervalRef.current) {
      clearInterval(callDurationIntervalRef.current);
    }

    try {
      const rawTranscriptsString = activeCall.transcripts.map(t => `${t.speaker}: ${t.text}`).join("\n");
      const res = await fetch("/api/summarize-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcripts: rawTranscriptsString,
          channel: activeCall.channelName
        })
      });
      const data = await res.json();
      if (data.report) {
        setCallReport(data.report);
        setActiveTab("ai-studio"); // Redirect directly to show the minutes!
      }
    } catch (e) {
      console.error("Distilling call minutes failure", e);
    } finally {
      setIsSummarizingCall(false);
      setActiveCall(null);
    }
  };

  // Action: Execute dynamic content generation copywriter
  const handleGenerateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genContext.trim()) return;

    setIsGeneratingContent(true);
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: genType,
          tone: genTone,
          context: genContext
        }),
      });
      const data = await res.json();
      if (data.content) {
        setGeneratedContentResult(data.content);
      }
    } catch (err) {
      console.error("Creative generation fail", err);
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const handleAskAIReceptionist = async (text: string) => {
    setIsReceptionistThinking(true);
    try {
      const res = await fetch("/api/receptionist-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          history: receptionistHistory,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setReceptionistHistory(prev => [
          ...prev,
          { sender: "user", text },
          { sender: "receptionist", text: data.reply }
        ]);
        // Speech voice synth replies
        speakTextRef(data.reply);
      }
    } catch (err) {
      console.error("Synthesiser failed", err);
    } finally {
      setIsReceptionistThinking(false);
    }
  };

  const handleUpdateWorkspaceDetails = (name: string, region: string, currency: string) => {
    setActiveWorkspace(prev => ({
      ...prev,
      name,
      region,
      currency
    }));
  };

  // Helper toggle
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Active Channel Message Log
  const activeMessageLog = messages[activeChannel.id] || [];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? "bg-[#070b13] text-slate-100" 
        : "bg-slate-50 text-slate-900"
    }`} id="africall-applet-root">
      
      {/* Upper Universal Banner */}
      <header className={`border-b ${
        isDarkMode ? "bg-neutral-950/80 border-white/5" : "bg-white border-slate-200 shadow-xs"
      } backdrop-blur-md sticky top-0 z-40 px-4 py-3`} id="top-nav-bar-container">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Glowing Brand Title */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20">
                <span className="text-black font-extrabold text-base tracking-tighter">Af</span>
              </div>
              <div>
                <h1 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-1 font-display">
                  AfriCall <span className="text-[9px] bg-orange-600/10 text-orange-400 p-0.5 px-1.5 rounded font-mono font-bold">AI PLATFORM</span>
                </h1>
                <p className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-500"} font-light`}>
                  Enterprise workspace for distributed team configurations
                </p>
              </div>
            </div>

            {/* Hamburger / Menu icon for mobile */}
            <button
              id="mobile-menu-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-orange-600/10 hover:bg-orange-600/20 text-orange-400 hover:text-white transition-colors cursor-pointer"
              title="Toggle AfriCall Modules Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Core switches (Data saving mode, target translator dialect) */}
          <div className="flex items-center gap-3.5 flex-wrap w-full md:w-auto justify-between md:justify-end">
            
            {/* Active Workspace Selector */}
            <div className="flex items-center gap-1.5 shrink-0 bg-black/45 p-1 rounded-lg border border-white/5">
              <select
                id="active-workspace-selector"
                value={activeWorkspace.id}
                onChange={(e) => {
                  const ws = workspaces.find(w => w.id === e.target.value);
                  if (ws) switchWorkspace(ws);
                }}
                className="bg-transparent border-0 ring-0 focus:ring-0 text-white text-xs font-semibold cursor-pointer"
              >
                {workspaces.map((ws) => (
                  <option key={ws.id} value={ws.id} className="bg-neutral-950 text-white">
                    {ws.name} ({ws.region})
                  </option>
                ))}
              </select>
              <button
                id="provision-branch-workspace-button"
                onClick={() => setShowNewWorkspaceModal(true)}
                className="hover:bg-white/10 text-gray-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                title="Provision another regional branch"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Low Bandwidth toggler */}
            <div className={`p-1 px-3 rounded-xl border flex items-center gap-2 ${
              isDataSavingMode 
                ? "bg-orange-500/10 border-orange-500/25 text-orange-400" 
                : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10"
            }`}>
              <label className="flex items-center gap-2 cursor-pointer select-none text-[10px] font-bold font-mono">
                <input 
                  type="checkbox"
                  id="data-saving-toggle-control"
                  checked={isDataSavingMode}
                  onChange={() => setIsDataSavingMode(!isDataSavingMode)}
                  className="accent-orange-500 rounded text-black font-bold h-3 w-3"
                />
                <span>LOW-BANDWIDTH MODE</span>
              </label>
              <span className="text-[10px] bg-black/40 p-0.5 px-1.5 rounded font-mono font-black animate-pulse text-emerald-400">
                Saved {loginSavingsMB.toFixed(1)}MB
              </span>
            </div>

          </div>

        </div>
      </header>

      {/* Mobile/Tablet Menu Drawer overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`lg:hidden border-b ${
              isDarkMode ? "bg-neutral-950 border-white/5" : "bg-white border-slate-200 shadow-lg"
            } overflow-hidden`}
            id="mobile-navigation-drawer"
          >
            <div className="p-4 space-y-4 max-w-7xl mx-auto">
              <div>
                <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono mb-2">AfriCall Modules</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: "dashboard", label: "Dashboard & Activity", icon: LayoutGrid },
                    { id: "messaging", label: "Team Chat Rooms", icon: Users },
                    { id: "voice-calls", label: "Audio VoIP Keypad", icon: Phone },
                    { id: "video-meetings", label: "Video Meet Lounge", icon: Video },
                    { id: "ai-studio", label: "AI Intelligence Studio", icon: Brain },
                    { id: "agent-builder", label: "AI Voice Agent Builder", icon: Sliders },
                    { id: "analytics", label: "Enterprise Analytics", icon: BarChart },
                    { id: "settings", label: "Platform Settings", icon: Settings },
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isAct = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`mobile-sidebar-tab-btn-${item.id}`}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between text-xs font-semibold tracking-wide transition-all ${
                          isAct
                            ? "bg-orange-600 text-black shadow-lg shadow-orange-600/10"
                            : "text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <IconComp className="w-4 h-4" />
                          {item.label}
                        </span>
                        {isAct && <span className="h-1.5 w-1.5 rounded-full bg-black"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Hub Diagnostics info */}
              <div className={`p-4 rounded-xl border ${
                isDarkMode ? "bg-white/[0.02] border-white/5" : "bg-slate-100/50 border-slate-200"
              } text-xs font-light leading-relaxed space-y-1`}>
                <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Hub Diagnostics</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <p>Location: <span className="font-semibold text-white">{activeWorkspace.region}</span></p>
                  <p>Currency: <span className="font-mono text-white font-bold">{activeWorkspace.currency}</span></p>
                  <p>Active Staff: <span className="text-white font-medium">{activeWorkspace.membersCount} operators</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout containing Side Tabs Navigation and main workspace panel */}
      <div className="max-w-7xl mx-auto px-4 py-6" id="africall-applet-inner-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Navigation Sidebar panel (Left 3 columns) */}
          <nav className="hidden lg:block lg:col-span-3 space-y-4" id="left-sidebar-navigation-rail">
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? "bg-neutral-950/60 border-white/5" : "bg-white border-slate-200"
            } space-y-3.5`}>
              
              <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">AfriCall Modules</span>

              <div className="space-y-1">
                {[
                  { id: "dashboard", label: "Dashboard & Activity", icon: LayoutGrid },
                  { id: "messaging", label: "Team Chat Rooms", icon: Users },
                  { id: "voice-calls", label: "Audio VoIP Keypad", icon: Phone },
                  { id: "video-meetings", label: "Video Meet Lounge", icon: Video },
                  { id: "ai-studio", label: "AI Intelligence Studio", icon: Brain },
                  { id: "agent-builder", label: "AI Voice Agent Builder", icon: Sliders },
                  { id: "analytics", label: "Enterprise Analytics", icon: BarChart },
                  { id: "settings", label: "Platform Settings", icon: Settings },
                ].map((item) => {
                  const IconComp = item.icon;
                  const isAct = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-tab-btn-${item.id}`}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between text-xs font-semibold tracking-wide transition-all ${
                        isAct
                          ? "bg-orange-600 text-black shadow-lg shadow-orange-600/10"
                          : "text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <IconComp className="w-4 h-4" />
                        {item.label}
                      </span>
                      {isAct && <span className="h-1.5 w-1.5 rounded-full bg-black"></span>}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Selected Workspace diagnostics metadata snippet */}
            <div className={`p-4 rounded-2xl border ${
              isDarkMode ? "bg-neutral-950/40 border-white/5" : "bg-white border-slate-200 shadow-sm"
            } text-xs font-light leading-relaxed space-y-2`}>
              <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Apapa Hub Diagnostics</span>
              <div className="space-y-1">
                <p>Location: <span className="font-semibold text-white">{activeWorkspace.region}</span></p>
                <p>Remittance Currency: <span className="font-mono text-white font-bold">{activeWorkspace.currency}</span></p>
                <p>Active Staff Size: <span className="text-white font-medium">{activeWorkspace.membersCount} operators</span></p>
              </div>

              {isDataSavingMode && (
                <div className="bg-orange-500/5 text-orange-400 p-2.5 rounded-xl border border-orange-500/10 text-[10px]">
                  <strong>Airtime compression is ON:</strong> Audio stream payload is shrunk dynamically using high rate algorithms. Saving drivers data cost.
                </div>
              )}
            </div>
          </nav>

          {/* Main workspace panel representation (Right 9 columns) */}
          <main className="lg:col-span-9" id="main-content-display-pane">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                
                {/* 1. Dashboard Tab View */}
                {activeTab === "dashboard" && (
                  <DashboardView
                    activeWorkspace={activeWorkspace}
                    loginSavingsMB={loginSavingsMB}
                    isDataSavingMode={isDataSavingMode}
                    onNavigateToTab={(tab) => setActiveTab(tab)}
                  />
                )}

                {/* 2. Chat messaging tab view */}
                {activeTab === "messaging" && (
                  <div className="space-y-6" id="messaging-canvas">
                    
                    {/* Header Dialect config */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-4 text-xs">
                      <div>
                        <h3 className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-orange-500" />
                          Multi-lingual Slack-level Chat Rooms
                        </h3>
                        <p className="text-gray-400 mt-0.5 font-light">Instant post-logs translation and emotion analytics.</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                          <span className="text-[10px] uppercase font-bold text-gray-500 font-mono">Dialect:</span>
                        </div>
                        <select
                          id="active-target-translation-language-selector"
                          value={selectedTargetLang}
                          onChange={(e) => setSelectedTargetLang(e.target.value)}
                          className="bg-black border border-white/10 text-orange-400 rounded-xl p-1 px-2 cursor-pointer font-bold font-mono"
                        >
                          <option value="Yoruba (Nigeria)">Yoruba (Yorubaland)</option>
                          <option value="Swahili (Kenya/East Africa)">Swahili (Swahililand)</option>
                          <option value="Hausa (Nigeria/West Africa)">Hausa (Hausaland)</option>
                          <option value="Igbo (Nigeria)">Igbo (Igboland)</option>
                          <option value="French (West Africa/Congo)">French (West Africa)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      
                      {/* Left: workspaces channels selector list */}
                      <div className="lg:col-span-1 bg-white/[0.01] border border-white/10 rounded-2xl p-4 space-y-4">
                        <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Workspace channels</span>
                        <div className="space-y-1">
                          {(channels[activeWorkspace.id] || []).map((ch) => {
                            const isActCh = activeChannel.id === ch.id;
                            const isVoiceCh = ch.type === "voice";
                            return (
                              <button
                                key={ch.id}
                                id={`channel-selector-${ch.id}`}
                                onClick={() => {
                                  if (isVoiceCh) {
                                    setActiveChannel(ch);
                                    handleStartCall("audio");
                                  } else {
                                    setActiveChannel(ch);
                                  }
                                }}
                                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                                  isActCh 
                                    ? "bg-white/5 border border-white/10 text-orange-400 font-bold" 
                                    : "text-gray-400 hover:text-white"
                                }`}
                              >
                                <span>{isVoiceCh ? "📞" : "#"} {ch.name}</span>
                                {isVoiceCh && (
                                  <span className="text-[8px] bg-orange-600/20 text-orange-400 px-1.5 py-0.5 rounded font-mono uppercase font-black tracking-widest animate-pulse">VOIP</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Fast templates text reminders checklist */}
                        <div className="pt-4 border-t border-white/5 space-y-1 text-xs">
                          <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Fast dispatch tags</span>
                          <div className="flex flex-col gap-1.5">
                            <button
                              onClick={() => handleQuickSend("Apapa Port clearance terminal is fully clear. Truck payload leaves now.")}
                              className="text-left select-none text-[10px] text-gray-400 hover:text-white p-1 rounded-lg border border-transparent hover:border-white/5 cursor-pointer font-light"
                            >
                              🚀 Apapa Port Clear
                            </button>
                            <button
                              onClick={() => handleQuickSend("Please confirm remittance proof through Paystack invoice reference.")}
                              className="text-left select-none text-[10px] text-gray-400 hover:text-white p-1 rounded-lg border border-transparent hover:border-white/5 cursor-pointer font-light"
                            >
                              💳 Paystack check
                            </button>
                            <button
                              onClick={() => handleQuickSend("Simulating Swahili lead. Jambo! Tumesafirisha mizigo leo asubuhi.")}
                              className="text-left select-none text-[10px] text-gray-400 hover:text-white p-1 rounded-lg border border-transparent hover:border-white/5 cursor-pointer font-light"
                            >
                              🌍 Sim Swahili payload
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Center: Dialogue message streams */}
                      <div className="lg:col-span-3 space-y-4">
                        
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 min-h-[300px] max-h-[340px] overflow-y-auto space-y-4">
                          {activeMessageLog.map((m) => {
                            const hasTrans = m.translatedText && m.translatedText[selectedTargetLang];
                            const isAIreceptionist = m.sender.toLowerCase().includes("receptionist") || m.sender.toLowerCase().includes("system");
                            return (
                              <div key={m.id} className="space-y-2 text-xs">
                                <div className="flex items-start gap-2.5">
                                  <img src={m.avatar || "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100"} className="h-8 w-8 rounded-full border border-white/10 shrink-0" />
                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-white text-[11px]">{m.sender}</span>
                                      <span className="text-[9px] text-gray-500 uppercase font-bold tracking-tight">{m.senderRole}</span>
                                      <span className="text-[9px] text-gray-600 ml-auto">{m.timestamp}</span>
                                    </div>
                                    <p className="text-gray-300 font-light leading-relaxed">{m.text}</p>

                                    {/* Sub-Attachment */}
                                    {m.fileAttachment && (
                                      <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5 mt-2 text-[10px] leading-relaxed">
                                        <p className="font-semibold text-white">Attachment Sample: {m.fileAttachment.fileName}</p>
                                        <p className="text-gray-400 font-light mt-0.5">{m.fileAttachment.summary}</p>
                                      </div>
                                    )}

                                    {/* Action items for translations and sentiments */}
                                    <div className="flex gap-2 pt-1 border-t border-white/5">
                                      <button
                                        id={`btn-translate-bubble-${m.id}`}
                                        onClick={() => handleTranslateMessage(m.id, m.text)}
                                        disabled={loadingTranslateMsgId === m.id}
                                        className="text-[9px] text-orange-400 hover:text-orange-300 font-bold font-mono uppercase inline-flex items-center gap-0.5 cursor-pointer"
                                      >
                                        {loadingTranslateMsgId === m.id ? "Translating..." : `Translate into ${selectedTargetLang}`}
                                      </button>
                                      <span className="text-gray-600 font-mono text-[9px]">|</span>
                                      <button
                                        id={`btn-sentiment-bubble-${m.id}`}
                                        onClick={() => handleAnalyzeSentiment(m.id, m.text)}
                                        disabled={loadingSentimentMsgId === m.id}
                                        className="text-[9px] text-gray-400 hover:text-white font-mono uppercase inline-flex items-center gap-0.5 cursor-pointer"
                                      >
                                        {loadingSentimentMsgId === m.id ? "Evaluating..." : "Emotion evaluation"}
                                      </button>
                                    </div>

                                    {/* Translated content output bubble */}
                                    {hasTrans && (
                                      <div className="bg-orange-500/[0.04] p-2.5 rounded-xl border border-orange-500/10 mt-2 text-[11px] leading-relaxed relative">
                                        <span className="text-[8px] uppercase tracking-wider font-bold text-orange-400 font-mono block">Instantly Translated Dialect output ({selectedTargetLang}):</span>
                                        <p className="text-gray-100 italic mt-0.5">"{m.translatedText?.[selectedTargetLang]}"</p>
                                      </div>
                                    )}

                                    {/* Sentiment results balloon */}
                                    {m.sentiment && (
                                      <div className="bg-emerald-500/[0.04] p-2.5 rounded-xl border border-emerald-500/10 mt-2 text-[11px] leading-relaxed">
                                        <span className="text-[8px] uppercase tracking-wider font-bold text-emerald-400 font-mono block">Gemini semantic analysis summary:</span>
                                        <p className="text-gray-300 mt-0.5"><span className="text-orange-400 font-semibold uppercase">{m.sentiment.category}: </span>{m.sentiment.explanation}. Score: {m.sentiment.score}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 italic">Suggested response guidelines: {m.sentiment.tip}</p>
                                      </div>
                                    )}

                                    {/* Poll box */}
                                    {m.poll && (
                                      <div className="bg-black/60 p-3 rounded-xl border border-white/5 mt-2 space-y-2">
                                        <span className="text-[9px] tracking-wider uppercase font-bold font-mono text-orange-400">Collaborative Dispatch Vote Raise</span>
                                        <div className="space-y-1.5">
                                          {m.poll.options.map(opt => (
                                            <button
                                              key={opt.id}
                                              onClick={() => handleVotePoll(m.id, opt.id)}
                                              className={`w-full text-left p-2 rounded-lg text-[10px] transition-all flex items-center justify-between font-medium ${
                                                m.poll?.myVoteId === opt.id
                                                  ? "bg-orange-600 text-black"
                                                  : "bg-white/5 text-slate-300 hover:bg-white/10"
                                              }`}
                                            >
                                              <span>{opt.text}</span>
                                              <span className="font-mono">{opt.votes} votes</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Interactive typing dialog container */}
                        <form onSubmit={handleSendMessage} className="space-y-3">
                          <div className="flex gap-2 bg-neutral-950 p-2 rounded-2xl border border-white/10">
                            
                            <button
                              type="button"
                              onClick={handleTriggerSimulateVoiceNote}
                              className="p-2.5 bg-white/5 hover:bg-white/10 text-orange-400 hover:text-orange-300 rounded-xl border border-white/5 transition-all text-xs cursor-pointer flex items-center justify-center shrink-0"
                              title="Simulate compressed voice note"
                            >
                              <Mic className="w-4 h-4" />
                            </button>

                            <input
                              type="text"
                              id="chat-text-input-field"
                              placeholder={activeChannel.id === "receptionist-agent" ? "Query AI receptionist (Lagos checkins hours, Kofi transit logs)..." : "Write message in Swahili or Yoruba dispatch..."}
                              value={chatTextInput}
                              onChange={(e) => setChatTextInput(e.target.value)}
                              className="flex-1 bg-transparent border-0 ring-0 focus:ring-0 text-xs text-white"
                            />

                            <button
                              type="submit"
                              id="send-message-button-target"
                              disabled={!chatTextInput.trim()}
                              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-black text-xs font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" /> Dispatch
                            </button>
                          </div>

                          <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] text-gray-500">
                            <label className="flex items-center gap-1.5 cursor-pointer select-none">
                              <input 
                                type="checkbox"
                                checked={instantAutoTranslateOn}
                                onChange={() => setInstantAutoTranslateOn(!instantAutoTranslateOn)}
                                className="accent-orange-500 rounded font-black h-3 w-3"
                              />
                              <span>Instant Auto-Translation on sent messages</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => {
                                setActivePollInput({
                                  question: "Clearance schedule for Apapa tollgate?",
                                  opt1: "Morning 06:00 AM dispatch",
                                  opt2: "Evening 08:00 PM clearance"
                                });
                              }}
                              className="text-orange-400 hover:text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 font-bold font-mono"
                            >
                              [Raise operational voting poll]
                            </button>
                          </div>

                          {activePollInput && (
                            <div className="bg-black/60 p-4 rounded-xl border border-white/10 space-y-3 mt-2 text-xs">
                              <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Raise Dispatch Vote</h5>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Vote Inquiry Header"
                                  value={activePollInput.question}
                                  onChange={(e) => setActivePollInput({ ...activePollInput, question: e.target.value })}
                                  className="bg-neutral-900 border border-white/10 p-2 rounded-lg text-slate-100"
                                />
                                <input 
                                  type="text" 
                                  placeholder="Option 1"
                                  value={activePollInput.opt1}
                                  onChange={(e) => setActivePollInput({ ...activePollInput, opt1: e.target.value })}
                                  className="bg-neutral-900 border border-white/10 p-2 rounded-lg text-slate-100"
                                />
                                <input 
                                  type="text" 
                                  placeholder="Option 2"
                                  value={activePollInput.opt2}
                                  onChange={(e) => setActivePollInput({ ...activePollInput, opt2: e.target.value })}
                                  className="bg-neutral-900 border border-white/10 p-2 rounded-lg text-slate-100"
                                />
                              </div>
                              <div className="flex gap-2 justify-end">
                                <button type="button" onClick={() => setActivePollInput(null)} className="text-gray-400 hover:text-white px-3 py-1">Cancel</button>
                                <button type="button" onClick={handleRaisePoll} className="bg-orange-600 text-black font-bold px-4 py-1 rounded-lg">Raise</button>
                              </div>
                            </div>
                          )}

                        </form>

                      </div>

                    </div>

                    {/* Integrated file summarize processor */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                      
                      <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
                        <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Operations Document Upload & Summarizer</span>
                        <p className="text-xs text-gray-400 font-light">Supply daily reports or transit memos. Gemini will distill critical takeaways inside the archive below.</p>
                        
                        <form onSubmit={handleSimulateFileSelect} className="space-y-3.5 text-xs">
                          <input
                            type="text"
                            required
                            placeholder="File name e.g., Apapa_Logistics_Remit.txt"
                            value={uploadFileName}
                            onChange={(e) => setUploadFileName(e.target.value)}
                            className="w-full bg-black border border-white/15 p-2.5 rounded-xl text-slate-100 font-mono"
                          />
                          <textarea
                            rows={3}
                            required
                            placeholder="Paste report text here: 'RE_ROUTING: Dispatchers must take Apapa terminal bypass route...'"
                            value={uploadTextContent}
                            onChange={(e) => setUploadTextContent(e.target.value)}
                            className="w-full bg-black border border-white/15 p-3 rounded-xl text-slate-150 font-light"
                          ></textarea>

                          <button
                            type="submit"
                            disabled={isUploadingFile || !uploadFileName.trim()}
                            className="bg-orange-600 hover:bg-orange-700 text-black text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer"
                          >
                            {isUploadingFile ? "Synthesising summary takeaways..." : "Upload & Distill Takeaways"}
                          </button>
                        </form>
                      </div>

                      <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">SaaS File digests archive</span>
                          
                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                            {files.map((f) => (
                              <button
                                key={f.id}
                                onClick={() => setActiveUploadedFile(f)}
                                className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                                  activeUploadedFile?.id === f.id
                                    ? "bg-white/5 border-white/10 text-orange-400"
                                    : "bg-black/20 border-white/5 hover:border-white/10 text-gray-500"
                                }`}
                              >
                                <span>📄 {f.fileName}</span>
                                <span className="text-[10px] font-mono text-gray-500">{f.fileSize}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {activeUploadedFile && (
                          <div className="bg-black/40 p-3.5 rounded-xl border border-white/5 text-xs text-slate-200 mt-4 leading-normal font-light space-y-1.5">
                            <h5 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono text-orange-400">Gemini digested takeaways:</h5>
                            <ul className="list-disc pl-4 space-y-1 text-gray-300">
                              {activeUploadedFile.takeaways.map((tak, index) => (
                                <li key={index}>{tak}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                )}

                {/* 3. Audio keypad room tab view */}
                {activeTab === "voice-calls" && (
                  <CallsView
                    activeCall={activeCall}
                    activeWorkspace={activeWorkspace}
                    soundIntensity={soundIntensity}
                    isDataSavingMode={isDataSavingMode}
                    onStartCall={handleStartCall}
                    onEndCall={handleEndCall}
                    onEndCallAndSummarize={handleEndCallAndSummarize}
                    onSimulateSpeech={handleSimulateCallSpeech}
                  />
                )}

                {/* 4. Video meetings lounge tab view */}
                {activeTab === "video-meetings" && (
                  <MeetingView
                    activeCall={activeCall}
                    activeWorkspace={activeWorkspace}
                    soundIntensity={soundIntensity}
                    isDataSavingMode={isDataSavingMode}
                    onStartCall={handleStartCall}
                    onEndCall={handleEndCall}
                    onEndCallAndSummarize={handleEndCallAndSummarize}
                    onSimulateSpeech={handleSimulateCallSpeech}
                  />
                )}

                {/* 5. AI copywriter studio tab view */}
                {activeTab === "ai-studio" && (
                  <div className="space-y-6" id="ai-studio-canvas">
                    
                    {/* Banner */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 text-xs">
                      <div>
                        <h3 className="font-bold text-white text-sm font-display flex items-center gap-1.5">
                          <Brain className="w-5 h-5 text-orange-500" />
                          Cognitive Content Workbench & Minutes Compiler
                        </h3>
                        <p className="text-gray-400 mt-0.5 font-light">Distill meetings transcripts or formulate custom announcements using server-grade intelligence.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left Formulation panel */}
                      <div className="lg:col-span-5 bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
                        <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider block font-mono">Announce Generation</span>
                        
                        <form onSubmit={handleGenerateContent} className="space-y-4 text-xs">
                          <div>
                            <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Memo Category Target</label>
                            <select
                              value={genType}
                              onChange={(e) => setGenType(e.target.value)}
                              className="w-full bg-black border border-white/10 p-2.5 rounded-xl text-slate-205"
                            >
                              <option value="Delivery Advisory Email">Delivery Advisory Email</option>
                              <option value="Billing / Paystack Remittance Statement">Billing Remittance Statement</option>
                              <option value="Apapa Port Clearance Hold Warning">Apapa Clearance Hold Warning</option>
                              <option value="Administrative Internal Announcement">Internal Announcement Memo</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Etiquette Tone</label>
                            <select
                              value={genTone}
                              onChange={(e) => setGenTone(e.target.value)}
                              className="w-full bg-black border border-white/10 p-2.5 rounded-xl text-slate-205"
                            >
                              <option value="Professional & Humble">Professional & Humble</option>
                              <option value="Cordial & Collaborative">Cordial & Collaborative</option>
                              <option value="Urgent / Direct Alert">Urgent Alerts</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[9px] text-gray-400 uppercase font-bold block mb-1">Context Guidelines</label>
                            <textarea
                              rows={3}
                              placeholder="e.g. Please remind Apapa dispatch guys to turn on the AfriCall low-bandwidth dialer to preserve internet budgets."
                              value={genContext}
                              onChange={(e) => setGenContext(e.target.value)}
                              className="w-full bg-black border border-white/10 p-2.5 rounded-xl text-slate-205 font-light"
                            ></textarea>
                          </div>

                          <div className="flex justify-between items-center flex-wrap gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setGenContext("Remind Cape Town distribution transit loaders to toggle low-bandwidth mode to save cellular charges during dispatch season.")}
                              className="text-[10px] text-gray-500 hover:text-white"
                            >
                              [Load sample context]
                            </button>
                            
                            <button
                              type="submit"
                              id="btn-draft-announcement-submit"
                              disabled={isGeneratingContent || !genContext.trim()}
                              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-40 text-black text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 transition-colors block cursor-pointer shadow-lg shadow-orange-600/10"
                            >
                              <Sparkles className="w-3.5 h-3.5" /> formulation draft
                            </button>
                          </div>

                        </form>
                      </div>

                      {/* Right Workspace minutes summaries view / Workspace outputs workbench */}
                      <div className="lg:col-span-7 space-y-4">
                        
                        {/* Call meeting report compiled */}
                        {callReport ? (
                          <div id="call-summary-report-container font-light" className="bg-gradient-to-br from-[#0a1120] to-[#0d0d1e] border border-white/10 rounded-2xl p-5 space-y-4 text-xs font-light">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-orange-400 tracking-wider block font-mono">CONFERENCE SUMMARY RAPORT</span>
                                <h4 className="text-sm font-bold text-white font-display mt-0.5">{callReport.title}</h4>
                              </div>
                              <button
                                onClick={() => setCallReport(null)}
                                className="text-gray-500 hover:text-white"
                              >
                                Dismiss log
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono border-b border-white/5 pb-2">
                              <p>Duration: <span className="text-white">{callReport.duration}</span></p>
                              <p>Dialect translated: <span className="text-white">{callReport.language}</span></p>
                            </div>

                            <p className="text-gray-300 leading-relaxed italic">"{callReport.summary}"</p>

                            <div className="space-y-1">
                              <span className="text-[9px] uppercase font-bold text-orange-400 tracking-wider block font-mono">Action Items Assignees</span>
                              <div className="space-y-1">
                                {callReport.actionItems?.map((act, i) => (
                                  <div key={i} className="bg-black/40 p-2 rounded-lg border border-white/5 leading-normal">
                                    <span className="font-semibold text-white">{act.assignee}: </span>
                                    <span>{act.task}</span>
                                    <span className="float-right text-[8px] bg-red-600/20 text-red-400 px-1.5 rounded">{act.urgency}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-xs text-gray-505 font-light p-5 leading-normal">
                            Not active call minutes drafted yet. Start and end standard HD Voice/Video dialer conference streams to compile.
                          </div>
                        )}

                        {/* Generated announcement results workspace */}
                        {generatedContentResult && (
                          <div className="bg-neutral-950 p-5 rounded-2xl border border-white/10 text-xs space-y-3 relative">
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] uppercase font-bold text-orange-400 tracking-wider block font-mono">Formulated Copy draft results</span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(generatedContentResult);
                                  alert("Copied copywriter memo to clipboard index!");
                                }}
                                className="text-orange-400 hover:text-orange-300 inline-flex items-center gap-1"
                              >
                                <Copy className="w-3.5 h-3.5" /> copy text
                              </button>
                            </div>
                            <pre className="font-mono text-[10px] text-gray-300 p-3.5 bg-neutral-900 border border-white/5 rounded-xl whitespace-pre-wrap max-h-[170px] overflow-y-auto leading-normal">
                              {generatedContentResult}
                            </pre>
                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                )}

                {/* 6. Visual builder & Virtual Agent Tab View */}
                {activeTab === "agent-builder" && (
                  <AgentBuilderView
                    activeWorkspace={activeWorkspace}
                    receptionistHistory={receptionistHistory}
                    isReceptionistThinking={isReceptionistThinking}
                    onAskAIReceptionist={handleAskAIReceptionist}
                    speakTextRef={speakTextRef}
                  />
                )}

                {/* 7. Analytics Dashboard Tab View */}
                {activeTab === "analytics" && (
                  <AnalyticsView activeWorkspace={activeWorkspace} />
                )}

                {/* 8. Settings Adjustment Tab View */}
                {activeTab === "settings" && (
                  <SettingsView
                    activeWorkspace={activeWorkspace}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={toggleDarkMode}
                    onUpdateWorkspaceDetails={handleUpdateWorkspaceDetails}
                  />
                )}

              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>

    </div>
  );
}
