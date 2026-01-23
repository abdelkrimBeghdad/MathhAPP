
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { Message } from '../types';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'مرحباً بك يا بطل! أنا الأستاذ ذكي، رفيقك في الرياضيات. هل لديك تمرين يحتاج لحل؟ أو ربما تريد شرحاً لدرس معين؟ يمكنك كتابة سؤالك أو إرسال صورة للتمرين! 🎓📏',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      role: 'user',
      text: input,
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input || "اشرح لي هذا التمرين في الصورة", selectedImage || undefined);
      const botMessage: Message = {
        role: 'model',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto glass-morphism rounded-3xl overflow-hidden shadow-2xl border border-white">
      {/* Header */}
      <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-inner">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none">الأستاذ ذكي</h3>
            <span className="text-[10px] opacity-80">متصل الآن - جاهز للمساعدة</span>
          </div>
        </div>
        <button onClick={() => setMessages([messages[0]])} className="text-white/70 hover:text-white text-sm bg-white/10 px-3 py-1 rounded-lg">مسح المحادثة</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-50 text-indigo-900 rounded-tr-none border border-indigo-100' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              {msg.image && (
                <img src={msg.image} alt="User upload" className="max-w-xs rounded-lg mb-3 border border-indigo-200 shadow-sm" />
              )}
              <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-medium">{msg.text}</p>
              <span className="text-[10px] text-slate-400 mt-2 block text-left">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-white rounded-2xl p-4 rounded-tl-none border border-slate-100 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        {selectedImage && (
          <div className="mb-4 relative inline-block">
            <img src={selectedImage} className="h-20 w-20 object-cover rounded-xl border-2 border-indigo-400" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex gap-3 items-center">
          <input
            type="file"
            accept="image/*"
            id="camera-input"
            className="hidden"
            onChange={handleImageChange}
          />
          <label 
            htmlFor="camera-input" 
            className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm"
          >
            📸
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل أي شيء في الرياضيات..."
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50"
          >
            🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
