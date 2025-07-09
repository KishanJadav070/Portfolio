const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Message = require('../model/Message');
const { profile } = require('../profileData');
require('dotenv').config();

// ✅ Gemini API URL with Key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

// ✅ Validate .env Key Presence
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

// ✅ System Prompt Based on Portfolio Data
const kishanSystemPrompt = `
You are a professional and friendly AI assistant representing Kishan Jadav, a skilled frontend React developer.

Speak confidently and clearly, like ChatGPT. Use only Kishan's real portfolio details to answer.

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

// ✅ Static Replies for Common Questions
const staticAnswers = {
  "hello": "Hello! 😊 I'm Kishan Jadav's AI assistant. How can I help you today?",
  "hi": "Hi there! 👋 What would you like to know about Kishan?",
  "hey": "Hey! 😊 Feel free to ask anything about Kishan Jadav.",
  "tell me about yourself": `I'm Kishan Jadav, a React.js developer currently interning at TechNishal. I've built QuickRent and other projects using the MERN stack.`,
  "introduce yourself": `Hi! I'm Kishan Jadav — a frontend developer skilled in React.js, JavaScript, Firebase, and MongoDB.`,
  "what is quickrent": `QuickRent is my final year MERN stack project that allows users to rent or sell items online.`,
  "your experience": `I'm currently interning at TechNishal and previously worked at InfoLabz.`
};

// ✅ POST /api/messages
router.post('/', async (req, res) => {
  try {
    const { role, message } = req.body;

    if (!role || !message) {
      return res.status(400).json({ error: '❗ Both role and message are required.' });
    }

    const normalizedMessage = message.toLowerCase().trim();
    console.log("📝 Message received:", normalizedMessage);

    // ✅ Save user message to DB
    await new Message({ role, message }).save();

    // ✅ Static reply if matched
    const matchedKey = Object.keys(staticAnswers).find(
      key => normalizedMessage === key || normalizedMessage.includes(key)
    );

    if (matchedKey) {
      const staticReply = staticAnswers[matchedKey];
      await new Message({ role: 'bot', message: staticReply }).save();
      return res.status(200).json({ message: staticReply });
    }

    // ✅ Send to Gemini
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
        }
      })
    });

    const geminiData = await geminiResponse.json();
    const replyText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    // ✅ Fallback if Gemini fails
    if (!replyText) {
      const errorText = geminiData?.error?.message || "Gemini API did not return a message.";
      const errorMessage = `❌ Gemini Error: ${errorText}`;
      await new Message({ role: 'bot', message: errorMessage }).save();
      return res.status(200).json({ message: errorMessage });
    }

    // ✅ Save and respond with Gemini reply
    await new Message({ role: 'bot', message: replyText }).save();
    res.status(200).json({ message: replyText });

  } catch (err) {
    console.error("❌ Chatbot Error:", err.message);
    res.status(500).json({ message: "❗ Internal server error. Please try again later." });
  }
});

module.exports = router;
