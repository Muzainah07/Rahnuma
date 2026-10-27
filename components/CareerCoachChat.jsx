'use client';

import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function CareerCoachChat({ userProfileSummary }) {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: "Assalam-o-Alaikum! I am your Rahnuma AI Career Mentor. How can I help you today? You can ask me about interview preparation, resume tips, remote work opportunities in Pakistan, or balancing work and family."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          userProfile: userProfileSummary
        })
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server response was not JSON');
      }

      const data = await res.json();
      if (data.success) {
        setMessages([...newMessages, { role: 'model', content: data.reply }]);
      } else {
        setMessages([...newMessages, { role: 'model', content: "I encountered a minor issue. Please try asking again." }]);
      }
    } catch (e) {
      console.error(e);
      setMessages([...newMessages, { role: 'model', content: "Network error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    "How can I prepare for remote job interviews?",
    "What are the best freelance platforms for women in Pakistan?",
    "How should I write my resume with limited work experience?",
    "Tips for balancing work-from-home and family responsibilities"
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#5c1d2d]/10 text-[#5c1d2d] text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive AI Career Mentor</span>
        </div>
        <h2 className="editorial-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Ask Rahnuma Coach
        </h2>
        <p className="text-sm text-slate-600">
          Get personalized guidance on job applications, interview tips, and professional growth.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[650px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isUser ? 'bg-teal-700 text-white' : 'bg-[#5c1d2d] text-white shadow-md'
                  }`}
                >
                  {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-teal-700 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 shadow-sm border border-slate-200 rounded-tl-none prose prose-slate prose-sm max-w-none'
                  }`}
                >
                  {isUser ? (
                    m.content
                  ) : (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#5c1d2d] text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white text-slate-500 rounded-2xl px-4 py-3 text-sm shadow-sm border border-slate-200 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#5c1d2d]" />
                <span>Rahnuma AI is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 shrink-0 ml-1">Suggestions:</span>
          {samplePrompts.map((promptText, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(promptText);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#5c1d2d]/10 hover:bg-[#5c1d2d]/20 text-[#5c1d2d] text-xs font-medium whitespace-nowrap transition-all border border-[#5c1d2d]/20"
            >
              {promptText}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about jobs, interviews, courses..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold shadow-md transition-all disabled:opacity-50 flex items-center space-x-2"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
