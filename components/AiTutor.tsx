import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { MODELS } from '../constants';
import { ModelId } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiTutor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Szia! Én a Coaching Mentor AI vagyok. Segítek elmélyíteni a tudásodat a négy kérdezéstechnikai modellel kapcsolatban. Kérdezz bátran, vagy kérj egy szituációs gyakorlatot!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Construct a context-aware system instruction
      const systemInstruction = `
        Te egy egyetemi szintű coaching oktató AI vagy (Coaching Mentor).
        A feladatod, hogy a következő négy modell alapján oktasd a felhasználót:
        1. Szókratészi kérdezéstechnika (Tisztázás, hiedelmek feltárása. Mottó: "Mit jelent ez valójában?")
        2. Motivációs Interjú / MI (Ambivalencia feloldása. Mottó: "Mi szól mellette, és mi szól ellene?")
        3. Megoldásfókuszú (Működő minták, kivételek. Mottó: "Mi működik már most is?")
        4. GROW modell (Struktúra, cél, haladás. Mottó: "Hogyan lépünk tovább?")
        
        A válaszaid legyenek rövidek, szakmaiak, bátorítóak és magyar nyelvűek.
        Ha a felhasználó gyakorlatot kér, találj ki egy rövid kliens szituációt, és kérd meg, hogy válasszon modellt.
        Hivatkozz a megadott elméleti háttérre.
      `;

      // Simple chat history construction
      // Note: For a real app, we would maintain a proper Chat session object, 
      // but for this single-file scoped demo, sending history in prompt or using chat.sendMessage is fine.
      // We will use generateContent with the system prompt context for simplicity in this stateless component structure,
      // or better, create a chat instance.
      
      // Let's use the Chat API correctly
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        },
        history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const text = result.text;

      setMessages(prev => [...prev, { role: 'model', text: text || "Hiba történt a válasz generálása közben." }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sajnálom, jelenleg nem érem el a szervert, vagy hiányzik az API kulcs. Próbáld újra később!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Pre-defined quick questions to help the user start
  const quickQuestions = [
    "Adj egy példát a Szókratészi kérdezésre!",
    "Mi a különbség a GROW és a Megoldásfókusz között?",
    "Szimulálj egy ambivalens klienst (MI)!",
    "Hogyan épülnek egymásra a modellek?"
  ];

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
      
      {/* Chat Header */}
      <div className="bg-indigo-600 p-4 flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-full text-white">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">AI Mentor</h2>
          <p className="text-indigo-200 text-xs">Gemini 2.5 Flash alapú oktató</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-4 rounded-2xl shadow-sm
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}
            `}>
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider opacity-50">
                   <Bot size={12} /> Mentor
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2">
                <Loader2 className="animate-spin text-indigo-500" size={16} />
                <span className="text-sm text-gray-500">Gondolkodom...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
                {quickQuestions.map((q, i) => (
                    <button 
                        key={i}
                        onClick={() => { setInput(q); }} 
                        className="whitespace-nowrap px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs rounded-full hover:bg-indigo-100 transition-colors border border-indigo-100"
                    >
                        {q}
                    </button>
                ))}
            </div>
        )}
        <div className="flex items-end gap-2 bg-gray-100 p-2 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-300 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Írj egy kérdést vagy szituációt..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 p-2 resize-none max-h-32 min-h-[44px]"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiTutor;