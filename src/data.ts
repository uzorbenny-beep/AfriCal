import { Workspace, Channel, Message, FileShare } from "./types";

export const initialWorkspaces: Workspace[] = [
  {
    id: "ws-lagos",
    name: "Aliko Logistics Ltd",
    subTitle: "Haulage & supply chain chain in West Africa",
    region: "Lagos, Nigeria",
    currency: "NGN (₦)",
    membersCount: 14,
  },
  {
    id: "ws-nairobi",
    name: "Savannah AgriTech",
    subTitle: "Smart farming solutions and delivery systems",
    region: "Nairobi, Kenya",
    currency: "KES (KSh)",
    membersCount: 8,
  },
  {
    id: "ws-joburg",
    name: "Ubuntu Retailers",
    subTitle: "FMCG supply distribution network across Gauteng",
    region: "Johannesburg, S.A.",
    currency: "ZAR (R)",
    membersCount: 22,
  },
];

export const defaultChannels: { [workspaceId: string]: Channel[] } = {
  "ws-lagos": [
    { id: "lagos-announcements", name: "announcements", type: "text", description: "Important updates for Aliko logistics" },
    { id: "lagos-ops", name: "operations", type: "text", description: "Daily dispatching schedules and routing" },
    { id: "lagos-sales", name: "sales-leads", type: "text", description: "Client negotiations, quotes, and bills" },
    { id: "lagos-voice-ops", name: "Lagos dispatch terminal", type: "voice", description: "Voice room for instant driver alignment" },
    { id: "receptionist-agent", name: "AI Receptionist Chat", type: "text", description: "Simulated interactive receptionist testing gate" },
  ],
  "ws-nairobi": [
    { id: "nairobi-general", name: "general", type: "text", description: "Savannah Agritech general chatter" },
    { id: "nairobi-dev", name: "tech-solutions", type: "text", description: "Discussing sensor array data and low-bandwidth API" },
    { id: "nairobi-voice-tech", name: "Nairobi Scrum Room", type: "voice", description: "Voice room for morning alignments" },
  ],
  "ws-joburg": [
    { id: "joburg-general", name: "general", type: "text", description: "Ubuntu generic discussions" },
    { id: "joburg-supply", name: "logistics-transit", type: "text", description: "Gauteng express trucks and inventory trackers" },
    { id: "joburg-finance", name: "audits-reconciliation", type: "text", description: "Reconciliation spreadsheets and Paystack filings" },
    { id: "joburg-voice-client", name: "Client Lounge", type: "voice", description: "Virtual showroom voice connection" },
  ],
};

export const initialMessages: { [channelId: string]: Message[] } = {
  "lagos-ops": [
    {
      id: "msg-1",
      sender: "Baba-ola J.",
      senderRole: "Head of Logistics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      text: "The internet subscription cost of 20,000 NGN per SIM for our dispatch riders is getting quite high this month. We need to preserve bandwidth on voice notes.",
      timestamp: "09:12 AM",
      sentiment: {
        category: "Urgent/Systemic",
        score: 0.85,
        explanation: "Mentions high budget constraints and telecom cost pressure.",
        tip: "Empower them with adaptive-rate audio compression toggles."
      }
    },
    {
      id: "msg-2",
      sender: "Amara N.",
      senderRole: "Operations Coordinator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      text: "Good point. Let's make sure the AfriCall low-bandwidth dialer is set to 'Data-Saver' by default. I am uploading the updated route sheet for the Alapere to Lekki Tollway trip.",
      timestamp: "09:15 AM",
      fileAttachment: {
        fileName: "Lekki_Route_Plan_v2.txt",
        fileSize: "4.2 KB",
        category: "Technical Documentation",
        summary: "Detailed road and grid traffic routes for delivery fleets from Lagos Mainland to Lekki."
      }
    },
    {
      id: "msg-3",
      sender: "Kofi A.",
      senderRole: "Lead Dispatch Driver",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      text: "Mo ti gba route plan yi. O da gidi gan-an! But please translate what Baba-ola said, I want to be 100% sure before leaving the depot.",
      timestamp: "09:18 AM",
      translatedText: {
        "Yoruba (Nigeria)": "Mo ti gba route plan yi. O da gidi gan-an! (I have received this route plan. It's very good!)"
      }
    }
  ],
  "lagos-announcements": [
    {
      id: "announce-1",
      sender: "System Agent",
      senderRole: "AfriCall Automated Assistant",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
      text: "A warm hello to our expanding Lagos team! Use this channel for major company alignments. We have enabled integrated Paystack billing and AI voice note transcription.",
      timestamp: "Yesterday",
    }
  ],
  "lagos-sales": [
    {
      id: "sales-1",
      sender: "Binyam T.",
      senderRole: "Account Manager",
      avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&h=100&fit=crop",
      text: "A client from Kenya is looking to partner on dry-bulk shipment. However, their local representative sent some brief notes in Swahili. Can anyone translate?",
      timestamp: "Monday",
    },
    {
      id: "sales-2",
      sender: "Amara N.",
      senderRole: "Operations Coordinator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      text: "Atawaelekeza madereva wetu waende depot moja kwa moja kuanzia kesho asubuhi ili kupakia mzigo. Translate this: We will instruct our drivers to go directly to the depot starting tomorrow morning to load the cargo.",
      timestamp: "Monday",
      translatedText: {
        "Swahili (Kenya/East Africa)": "Atawaelekeza madereva wetu waende depot moja kwa moja kuanzia kesho asubuhi ili kupakia mzigo. (We will instruct our drivers to go directly to the depot starting tomorrow morning to load)"
      }
    }
  ],
  "nairobi-general": [
    {
      id: "nairobi-1",
      sender: "Abdi O.",
      senderRole: "CTO",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
      text: "Jambo team! Welcome to Savannah AgriTech's fresh ConnectAI channel. Let's coordinate our solar pump inspections here.",
      timestamp: "08:00 AM",
    }
  ],
  "joburg-general": [
    {
      id: "joburg-1",
      sender: "Zola M.",
      senderRole: "Warehouse Manager",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
      text: "The delivery dispatch was peaceful. We logged everything in Johannesburg. Let's try hosting an audio lounge with our Cape Town representatives using Low-Bandwidth Mode today.",
      timestamp: "Yesterday",
    }
  ],
};

export const defaultFiles: FileShare[] = [
  {
    id: "file-1",
    fileName: "Lekki_Route_Plan_v2.txt",
    fileSize: "4.2 KB",
    uploader: "Amara N.",
    uploadedAt: "2026-06-15",
    category: "Technical Documentation",
    description: "Lagos logistics fleet routing bypass instructions.",
    takeaways: [
      "Avoid third-mainland bridge during peak bottleneck hours (4 PM - 7 PM).",
      "Route dispatch through Alapere-Ogudu highway where telecom cell service is strongest.",
      "Check-in at Lekki Depot 3 with standard digital QR scan."
    ],
    contentSample: "RE_ROUTING INFORMATION:\n1. Origin: Mainland Depot\n2. Primary Target: Lekki Phase 1\n3. Alternative routing via Oworonshoki to minimize standard transit lag.\n4. Ensure drivers keep phone data-saving flags active."
  },
  {
    id: "file-2",
    fileName: "Paystack_Invoice_7809.txt",
    fileSize: "1.8 KB",
    uploader: "Baba-ola J.",
    uploadedAt: "2026-06-14",
    category: "Financial/Invoice",
    description: "Lagos Port Terminal clearance invoice proof of transfer.",
    takeaways: [
      "Total paid clearing sum: 345,000 NGN.",
      "Processed through secure commercial bank gateway.",
      "Requires internal Operations auditing clearance."
    ],
    contentSample: "TRANSACTION RECEIPT:\nMerchant: Lagos Port Agency\nReference: PAYSTACK-NIG-9080-CLEAR\nAmount: 345,000.00 NGN\nStatus: SUCCESSFUL"
  }
];
