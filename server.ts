import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// High limits for base64 audio files
app.use(express.json({ limit: "25mb" }));

// Lazy initializer for the `@google/genai` client
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// -----------------------------------------------------------------
// API ROUTES
// -----------------------------------------------------------------

// API Status & Configuration Info
app.get("/api/config", (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY;
  res.json({
    geminiConfigured: hasKey,
    currentLocalTime: new Date().toISOString(),
    supportedLanguages: [
      { code: "en", name: "English" },
      { code: "yo", name: "Yoruba (Nigeria)" },
      { code: "ha", name: "Hausa (Nigeria/West Africa)" },
      { code: "ig", name: "Igbo (Nigeria)" },
      { code: "sw", name: "Swahili (Kenya/East Africa)" },
      { code: "fr", name: "French (West Africa/Congo)" },
    ],
  });
});

// Translation Endpoint using `gemini-3.5-flash`
app.post("/api/translate", async (req, res) => {
  try {
    const { text, targetLanguage, sourceLanguage = "English" } = req.body;
    if (!text || !targetLanguage) {
      res.status(400).json({ error: "Missing required fields: text, targetLanguage" });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `Translate this text from ${sourceLanguage} to ${targetLanguage}. Keep the tone natural, professional, and matching the original content, optimized for business communication in Africa. Only return the translated text without explanations.\n\nText:\n"${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({
      translatedText: response.text?.trim() || "",
      targetLanguage,
      sourceLanguage,
    });
  } catch (error: any) {
    console.error("Translation error:", error);
    res.status(500).json({ error: error.message || "Failed to translate text." });
  }
});

// Transcription & Translation of Voice Notes
app.post("/api/transcribe-audio", async (req, res) => {
  try {
    const { base64Data, mimeType = "audio/webm" } = req.body;
    
    if (!base64Data) {
      res.status(400).json({ error: "Missing required base64 audio data." });
      return;
    }

    const ai = getGeminiClient();
    
    // Clean base64 data header if present
    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, "");

    const inlinePart = {
      inlineData: {
        data: cleanBase64,
        mimeType: mimeType,
      },
    };

    const textPrompt = {
      text: "Please transcribe this audio recording. First, determine the language spoken (e.g. English, Yoruba, Hausa, Igbo, French, Swahili, etc.). Write: 'Language Spoken: [Detected Language]'. Then provide the verbatim transcription. Finally, if the spoken language is not English, write 'English Translation:' followed by a professional translation into English.",
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts: [inlinePart, textPrompt] },
    });

    res.json({
      result: response.text || "No transcription recovered.",
    });
  } catch (error: any) {
    console.error("Transcription error:", error);
    res.status(500).json({ error: error.message || "Failed to transcribe audio." });
  }
});

// Meeting Notes Summarizer
app.post("/api/summarize-meeting", async (req, res) => {
  try {
    const { transcript, workspaceName = "Unassigned" } = req.body;
    if (!transcript) {
      res.status(400).json({ error: "No transcript provided to summarize." });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `You are AfriCall's flagship AI Meeting Assistant. Analyze this business meeting transcript for a workspace named "${workspaceName}". Generate a highly professional, well-structured, clean business summary report.
Return the output STRICTLY in JSON format with the following schema:
{
  "title": "Meeting Title",
  "duration": "Estimated Duration (e.g., 25 mins)",
  "language": "Detected Primary Language",
  "summary": "High-level overview of the discussion (1-2 sentences)",
  "decisions": ["Decision 1", "Decision 2", "Decision 3"],
  "actionItems": [
    { "task": "Action Item 1", "assignee": "Name", "urgency": "High|Medium|Low" },
    { "task": "Action Item 2", "assignee": "Name", "urgency": "High|Medium|Low" }
  ],
  "followUpEmail": "A fully drafted professional email starting with 'Subject:' ready to be copied/sent to the team."
}

Transcript:
"${transcript}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            duration: { type: Type.STRING },
            language: { type: Type.STRING },
            summary: { type: Type.STRING },
            decisions: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  task: { type: Type.STRING },
                  assignee: { type: Type.STRING },
                  urgency: { type: Type.STRING },
                },
                required: ["task", "assignee", "urgency"],
              },
            },
            followUpEmail: { type: Type.STRING },
          },
          required: ["title", "duration", "language", "summary", "decisions", "actionItems", "followUpEmail"],
        },
      },
    });

    const parsedSummary = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedSummary);
  } catch (error: any) {
    console.error("Meeting summarizer error:", error);
    res.status(500).json({ error: error.message || "Failed to generate meeting summary." });
  }
});

// Content Generator for Email/Response/Announcements
app.post("/api/generate-content", async (req, res) => {
  try {
    const { contentType, context, tone = "Professional" } = req.body;
    if (!contentType || !context) {
      res.status(400).json({ error: "Missing required fields: contentType, context" });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `You are a professional business content writer for AfriCall. Generate a high-quality ${contentType} based on this context: "${context}". Tone: ${tone}. Focus on professional, warm communication. If relevant, adjust context specifically for African business operations (mentioning transparent pricing, data efficiency, customer respect). Return only the beautifully written text block.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ content: response.text?.trim() || "" });
  } catch (error: any) {
    console.error("Content generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate content." });
  }
});

// Sentiment Analysis on message text
app.post("/api/analyze-sentiment", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "Missing text to analyze." });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `Analyze this message and categorize its mood into ONE of: "Happy/Supportive", "Angry/Frustrated", "Urgent/Systemic", or "Neutral". Give a 1-phrase justification of why, and suggest a polite recommended reply style. 
Return STRICTLY in JSON:
{
  "category": "Happy/Supportive | Angry/Frustrated | Urgent/Systemic | Neutral",
  "score": 0.0 to 1.0,
  "explanation": "Why",
  "tip": "How to respond"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            score: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            tip: { type: Type.STRING },
          },
          required: ["category", "score", "explanation", "tip"],
        },
      },
    });

    const evaluation = JSON.parse(response.text?.trim() || "{}");
    res.json(evaluation);
  } catch (error: any) {
    console.error("Sentiment analysis error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze sentiment." });
  }
});

// AI Receptionist Assistant Simulation Endpoint
app.post("/api/receptionist-call", async (req, res) => {
  try {
    const { message, history = [], targetBusiness = "TechMart Lagos" } = req.body;
    if (!message) {
      res.status(400).json({ error: "Please speak or type a message for the receptionist." });
      return;
    }

    const ai = getGeminiClient();
    
    const messagesContents: any[] = [];
    const formattedHistory = history.map((h: { sender: string; text: string }) => {
      return h.sender === "user" ? `Customer: ${h.text}` : `AI Receptionist: ${h.text}`;
    }).join("\n");

    const systemInstruction = `You are AfriCall's built-in AI Voice Receptionist & Office Assistant for the company named "${targetBusiness}".
Your voice is warm, professional, helpful, and charmingly African.
You can:
- Standardly answer frequently asked business questions (hours of operational transit, products, prices).
- Schedule physical or virtual appointments (ask for their name, preferred date, and topic).
- Take sales orders (capture details, quantity, and name).
- Route calling issues to live engineering.

Keep your response extremely concise (maximum 2-3 short sentences) because your reply will be read and spoken to the user. Feel free to use warm greetings like "Welcome to ${targetBusiness}!", "Good day", or "I'd be glad to help!". Maintain an eye-to-eye professional African hospitality flavor.`;

    const contents = `${systemInstruction}\n\nExisting Conversation History:\n${formattedHistory}\n\nCustomer: ${message}\nAI Receptionist:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
    });

    res.json({ response: response.text?.trim() || "I am listening. How can I assist you with today?" });
  } catch (error: any) {
    console.error("Receptionist call error:", error);
    res.status(500).json({ response: "Hello, sorry about that! I experienced a temporary signal noise. Could you please state that list item of inquiry again?" });
  }
});

// Robust File Categorizer & Summarizer
app.post("/api/summarize-file", async (req, res) => {
  try {
    const { fileName, fileContent } = req.body;
    if (!fileName || !fileContent) {
      res.status(400).json({ error: "Missing fileName or fileContent." });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `Inspect this file metadata and textual outline. 
File Name: "${fileName}"
Content extract: "${fileContent}"

Categorize the file into one of: "Technical Documentation", "Financial/Invoice", "Marketing/Brief", "Human Resources", or "Legal/Contracts".
Provide a 1-sentence description detailing what the file is about.
Provide 3 bulleted key takeaways.

Return structured JSON:
{
  "category": "...",
  "description": "...",
  "takeaways": ["...", "...", "..."]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            description: { type: Type.STRING },
            takeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["category", "description", "takeaways"],
        },
      },
    });

    const details = JSON.parse(response.text?.trim() || "{}");
    res.json(details);
  } catch (error: any) {
    console.error("File analysis error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze document upload." });
  }
});


// -----------------------------------------------------------------
// VITE AND STATIC FILES ROUTING
// -----------------------------------------------------------------

async function serveApp() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode using Vite Dev Server as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode serving compiled bundle
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Fallback to React index.html for Single Page App routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ConnectAI / AfriCall] Server running on http://0.0.0.0:${PORT}`);
  });
}

serveApp().catch((err) => {
  console.error("Failed to start server:", err);
});
