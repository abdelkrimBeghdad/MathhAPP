
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse, generateSpeech } from '../services/geminiService';
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
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSpeech = async (text: string, index: number) => {
    if (isSpeaking === index) return;
    setIsSpeaking(index);
    
    const audioDataUrl = await generateSpeech(text);
    if (audioDataUrl) {
      // Logic for raw PCM audio playback
      const base64 = audioDataUrl.split(',')[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      
      const ctx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = ctx;
      
      const int16 = new Int16Array(bytes.buffer);
      const buffer = ctx.createBuffer(1, int16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < int16.length; i++) channelData[i] = int16[i] / 32768.0;
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => setIsSpeaking(null);
      source.start();
    } else {
      setIsSpeaking(null);
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
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto glass-morphism rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50">
      {/* Header */}
      <div className="math-gradient p-5 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/10">
            🤖
          </div>
          <div>
            <h3 className="font-black text-lg leading-tight">الأستاذ ذكي</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">نشط الآن</span>
            </div>
          </div>
        </div>
        <button onClick={() => setMessages([messages[0]])} className="text-white/60 hover:text-white font-black text-[10px] uppercase border border-white/20 px-4 py-2 rounded-xl transition-all">تفريغ المحادثة</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end animate-in fade-in slide-in-from-right-4 duration-500'}`}>
            <div className={`max-w-[85%] rounded-[2rem] p-6 shadow-sm relative group ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              {msg.role === 'model' && (
                <button 
                  onClick={() => handleSpeech(msg.text, idx)}
                  className={`absolute -bottom-3 -left-3 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-all ${isSpeaking === idx ? 'bg-indigo-600 animate-pulse' : 'bg-white hover:bg-indigo-50 text-indigo-600'}`}
                >
                  {isSpeaking === idx ? '🔊' : '🗣️'}
                </button>
              )}
              {msg.image && (
                <img src={msg.image} alt="User upload" className="max-w-xs rounded-2xl mb-4 border-2 border-white shadow-md" />
              )}
              <p className="whitespace-pre-wrap leading-loose text-sm md:text-base font-bold tracking-tight">{msg.text}</p>
              <span className={`text-[9px] font-black mt-3 block ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end animate-pulse">
            <div className="bg-white rounded-[2rem] rounded-tl-none p-5 border border-slate-100 shadow-sm">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 bg-white border-t border-slate-100">
        {selectedImage && (
          <div className="mb-4 relative inline-block animate-in zoom-in-50 duration-300">
            <img src={selectedImage} className="h-24 w-24 object-cover rounded-2xl border-4 border-indigo-100 shadow-xl" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs shadow-lg hover:scale-110 transition-all font-bold"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex gap-4 items-center">
          <input type="file" accept="image/*" id="camera-input" className="hidden" onChange={handleImageChange} />
          <label htmlFor="camera-input" className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm text-2xl group">
             <span className="group-hover:scale-110 transition-transform">📸</span>
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب سؤالك أو صور تمرينك هنا..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all font-bold placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:scale-105 disabled:opacity-50 text-xl"
          >
            🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
