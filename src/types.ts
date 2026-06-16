export enum ParticipantRole {
  ORGANIZER = "Organizer",
  PRESENTER = "Presenter",
  ATTENDEE = "Attendee",
}

export interface Workspace {
  id: string;
  name: string;
  subTitle: string;
  region: string;
  currency: string;
  membersCount: number;
}

export interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
  description: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
  myVoteId?: string;
}

export interface Message {
  id: string;
  sender: string;
  senderRole: string;
  avatar: string;
  text: string;
  timestamp: string;
  isVoiceNote?: boolean;
  voiceDuration?: string;
  voiceBase64?: string;
  translatedText?: { [key: string]: string };
  sentiment?: {
    category: string;
    score: number;
    explanation: string;
    tip: string;
  };
  poll?: Poll;
  fileAttachment?: {
    fileName: string;
    fileSize: string;
    category?: string;
    summary?: string;
  };
}

export interface FileShare {
  id: string;
  fileName: string;
  fileSize: string;
  uploader: string;
  uploadedAt: string;
  category: string;
  description: string;
  takeaways: string[];
  contentSample: string;
}

export interface ActiveCall {
  id: string;
  channelName: string;
  type: "audio" | "video";
  status: "idle" | "connecting" | "active" | "on-hold";
  durationSeconds: number;
  dataSavedMB: number;
  bandwidthMode: "Data-Saver" | "Balanced" | "Max-Quality";
  isRecording: boolean;
  transcripts: { speaker: string; text: string; time: string }[];
}

export interface MeetingSummaryReport {
  title: string;
  duration: string;
  language: string;
  summary: string;
  decisions: string[];
  actionItems: { task: string; assignee: string; urgency: string }[];
  followUpEmail: string;
}
