const express = require('express');
const router = express.Router();
const Message = require('../model/Message');
const fetch = require('node-fetch'); // ✅ node-fetch@2 required
require('dotenv').config();
const { profile } = require('../profileData');

// ✅ Gemini API Endpoint
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

// 🧠 Kishan's Profile Prompt
const kishanSystemPrompt = `
You are a professional and friendly AI assistant representing Kishan Jadav, a skilled frontend React developer.

Speak confidently and clearly, like ChatGPT. Use only Kishan's real portfolio details to answer.

---

👤 Name: ${profile.name}
🎓 Education: ${profile.education}
🛠️ Skills: ${profile.techStack.join(", ")}
💼 Projects:
${profile.projects.map(p => `- ${p.name}: ${p.description}`).join("\n")}
🚀 Internships:
${profile.internships.map(i => `- ${i.company} (${i.role}) – ${i.contributions?.join(", ") || 'Worked with ' + i.stack.join(", ")}`).join("\n")}
💡 Qualities: ${profile.qualities.join(", ")}
🎯 Goals: ${profile.goals.join(", ")}
`;

// 📌 Static Responses
const staticAnswers = {
  "hello": "Hello! 😊 I'm Kishan Jadav's AI assistant. How can I help you today?",
  "hi": "Hi there! 👋 What would you like to know about Kishan?",
  "hey": "Hey! 😊 Feel free to ask anything about Kishan Jadav.",
  "tell me about yourself": `I'm Kishan Jadav, a React.js developer currently interning at TechNishal. I've built QuickRent and other projects using the MERN stack. I aim to become a full-stack developer and launch my own IT company.`,
  "introduce yourself": `Hi! I'm Kishan Jadav — a frontend developer skilled in React.js, JavaScript, Firebase, and MongoDB. I enjoy building clean and responsive UIs.`,
  "what is quickrent": `QuickRent is my final year MERN stack project. It allows users to rent or sell items online. Built using React.js, Node.js, MongoDB, Express, and Firebase Auth.`,
  "your experience": `I'm currently interning at TechNishal and previously worked at InfoLabz. I’ve developed real-world frontend features using React.js and Firebase.`
};

// 💬 POST /api/messages
router.post('/messages', async (req, res) => {
  try {
    const { role, message } = req.body;
    if (!role || !message) {
      return res.status(400).json({ error: '❗ Role and message are required.' });
    }

    const normalizedMessage = message.toLowerCase().trim();
    console.log("📝 User Message:", normalizedMessage);

    // Save user's message
    await new Message({ role, message }).save();

    // Check for static response
    const matchedKey = Object.keys(staticAnswers).find(
      key => normalizedMessage === key || normalizedMessage.includes(key)
    );

    if (matchedKey) {
      const staticReply = staticAnswers[matchedKey];
      await new Message({ role: 'bot', message: staticReply }).save();
      return res.status(200).json({ message: staticReply });
    }

    // 🧠 Gemini API Call
    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: "system", parts: [{ text: kishanSystemPrompt }] },
          { role: "user", parts: [{ text: message }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: 3 },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: 3 },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: 3 },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: 3 }
        ]
      })
    });

    const geminiData = await geminiResponse.json();
    console.log("📦 Gemini Response:", JSON.stringify(geminiData, null, 2));

    const replyText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      const errorText = geminiData?.error?.message || "Gemini did not return a response.";
      await new Message({ role: 'bot', message: `❗ Error: ${errorText}` }).save();
      return res.status(200).json({ message: `Oops! Gemini API Error: ${errorText}` });
    }

    // Save and send the response
    await new Message({ role: 'bot', message: replyText }).save();
    res.status(200).json({ message: replyText });

  } catch (err) {
    console.error("❌ Chatbot Route Error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
