import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm Kishan's AI Assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;


  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/messages`, {
        role: "user",
        message: input,
      });
      

      const botMsg = {
        sender: "bot",
        text: res.data.message || "Sorry, I couldn't understand that.",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
      }, 700);
    } catch (err) {
      console.error("❌ Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-2xl w-full mx-auto p-6 sm:p-8 mt-12 bg-[#1c1f26] rounded-2xl shadow-2xl text-white font-sans">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4">
        🤖 Kishan’s AI Interview Assistant
      </h2>

      <div className="h-96 overflow-y-auto bg-[#2b2e3b] p-4 rounded-xl space-y-4 mb-4 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] px-4 py-2 rounded-xl text-sm sm:text-base ${
              msg.sender === "user"
                ? "bg-blue-500 self-end ml-auto"
                : "bg-[#383c4a] self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-[#383c4a] px-4 py-2 rounded-xl text-sm sm:text-base animate-pulse w-max">
            Typing...
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
        <input
          className="w-full px-4 py-2 rounded-lg bg-[#2b2e3b] text-white placeholder-gray-400 outline-none"
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="w-full sm:w-auto bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition text-white font-medium"
        >
          Send
        </button>
      </div>

      <div className="text-sm text-gray-400 mt-6 leading-relaxed">
        💡 Try asking:
        <ul className="list-disc list-inside mt-2">
          <li>Tell me about yourself</li>
          <li>What is your latest project?</li>
          <li>What are your skills?</li>
          <li>Tell me about QuickRent</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatBot;