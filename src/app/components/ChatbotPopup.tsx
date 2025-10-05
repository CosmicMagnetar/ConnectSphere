"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

// Define the structure for a message object
interface Message {
  text: string;
  sender: "user" | "bot";
}

// Function to safely get initial messages from localStorage
const getInitialMessages = (): Message[] => {
  try {
    const item = window.localStorage.getItem("chatbotMessages");
    // Parse stored json or if none return initial message
    return item ? JSON.parse(item) : [{
      text: "Hi there! 👋 Ask me anything about open source.",
      sender: "bot",
    }];
  } catch (error) {
    console.error("Error parsing messages from localStorage", error);
    return [{
      text: "Hi there! 👋 Ask me anything about open source.",
      sender: "bot",
    }];
  }
};

export default function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [userId, setUserId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Effect to load userId from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("chatbotUserId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Effect to save messages and userId to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
    if (userId) {
      localStorage.setItem("chatbotUserId", userId);
    }
  }, [messages, userId]);

  // Automatically scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://opensourcechatbot.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ✅ CORRECTED: Use the body structure your backend expects
        body: JSON.stringify({ message: currentMessage, user_id: userId }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json();

      // ✅ CORRECTED: Handle the expected response format
      if (data.response) {
        const botMessage: Message = { text: data.response, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      } else {
         throw new Error("Unexpected server response format");
      }
      
      // ✅ NEW: Update and save the userId if the server provides one
      if (data.user_id) {
        setUserId(data.user_id);
      }

    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Popup Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-gray-900/80 backdrop-blur-xl border border-blue-500/50 rounded-2xl shadow-2xl shadow-blue-500/20 text-white flex flex-col transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bot className="text-blue-400" />
            <h3 className="font-bold">Open Source Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto h-96">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                     <Bot size={20} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-white ${
                    msg.sender === "user"
                      ? "bg-blue-600 rounded-br-none"
                      : "bg-gray-700 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {/* Loading indicator */}
            {isLoading && (
               <div className="flex items-end gap-2 justify-start">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot size={20} />
                 </div>
                 <div className="bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3">
                   <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></span>
                   </div>
                 </div>
               </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about OSS..."
              className="w-full pl-4 pr-12 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-500 transition-all"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Floating Action Button (FAB) to open the chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 text-white hover:scale-110 transition-transform z-50"
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>
    </>
  );
}
