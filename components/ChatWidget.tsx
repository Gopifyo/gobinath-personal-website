import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, Bot, User } from 'lucide-react';
import { EXPERIENCES, SKILLS, PUBLICATIONS, EDUCATION, PROJECTS, SOCIAL_LINKS, PROFILE_IMAGE } from '../constants';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Yo! I'm the Vibe Agent. I know everything about Gobinath's work in Agentic AI and Bio-engineering. Ask me anything!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Simulate network delay for "thinking"
    setTimeout(() => {
      let responseText = "I'm currently running in offline mode. Please check the main interface for full details.";
      const lower = userMessage.toLowerCase();

      // Simple keyword matching for the widget
      if (lower.includes('project') || lower.includes('ai')) {
        responseText = "Gobinath has built 'Vibe-Engage AI' for social consumer products and the 'Bio-Insight Agent'. Check the Projects section!";
      } else if (lower.includes('bio') || lower.includes('tissue') || lower.includes('patent')) {
        responseText = "He is a bioengineer specializing in seaweed scaffolds (Patent pending) and diabetic cardiac models.";
      } else if (lower.includes('contact') || lower.includes('email')) {
        responseText = `You can reach him at ${SOCIAL_LINKS.email}.`;
      } else if (lower.includes('skill') || lower.includes('stack')) {
        responseText = "He uses Python, TypeScript, and Agentic AI frameworks alongside wet-lab skills like 3D Bioprinting.";
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const Avatar = ({ size = "w-8 h-8", iconSize = 18 }: { size?: string, iconSize?: number }) => {
    const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE);
    const [error, setError] = useState(false);

    return (
      <div className={`${size} rounded-lg overflow-hidden border border-[#4E342E]/20 flex items-center justify-center bg-white/50 shrink-0`}>
          {!error ? (
              <img 
                  src={imgSrc} 
                  alt="Agent" 
                  className="w-full h-full object-cover"
                  onError={() => {
                       setError(true);
                  }}
              />
          ) : (
              <Bot size={iconSize} className="text-[#4E342E]" />
          )}
      </div>
    );
  };

  const ChatMessageAvatar = () => {
      const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE);
      const [error, setError] = useState(false);

      return (
        <div className="w-8 h-8 rounded-full border border-[#4E342E]/20 overflow-hidden shrink-0 flex items-center justify-center bg-white/50">
             {!error ? (
                 <img 
                    src={imgSrc} 
                    alt="Agent" 
                    className="w-full h-full object-cover"
                    onError={() => {
                       setError(true);
                    }}
                 />
             ) : (
                 <Bot size={16} className="text-[#4E342E]" />
             )}
        </div>
      );
  };

  const FloatingToggleIcon = () => {
    const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE);
    const [error, setError] = useState(false);

    if (error) return <MessageCircle size={28} className="fill-current" />;

    return (
      <img 
        src={imgSrc} 
        alt="Open Chat" 
        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
        onError={() => setError(true)}
      />
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto mb-4 w-[90vw] md:w-[400px] h-[60vh] max-h-[600px] bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-[#4E342E]/10 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right animate-in fade-in slide-in-from-bottom-10">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#4E342E]/10 to-transparent border-b border-[#4E342E]/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar />
              <div>
                <h3 className="text-sm font-black text-[#3E2723] tracking-wide uppercase">Vibe Agent</h3>
                <p className="text-[10px] text-[#4E342E]/80 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#4E342E] rounded-full animate-pulse"></span> ONLINE
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/50 rounded-full text-[#795548] hover:text-[#3E2723] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#4E342E]/20 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <ChatMessageAvatar />}
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#4E342E] text-white font-medium rounded-tr-sm' 
                      : 'bg-white/60 border border-white/50 text-[#3E2723] rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                   <div className="w-8 h-8 rounded-full bg-[#4E342E] border border-white/10 flex items-center justify-center shrink-0">
                     <User size={14} className="text-[#D7CCC8]" />
                   </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <ChatMessageAvatar />
                <div className="bg-white/60 border border-white/50 px-4 py-3 rounded-2xl rounded-tl-sm">
                   <span className="flex gap-1">
                     <span className="w-1.5 h-1.5 bg-[#8D6E63] rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-[#8D6E63] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                     <span className="w-1.5 h-1.5 bg-[#8D6E63] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                   </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#4E342E]/10 bg-white/50">
            <div className="flex items-center gap-2 bg-white/60 border border-white/50 rounded-full px-4 py-2 focus-within:border-[#4E342E]/30 transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about my projects..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-[#3E2723] placeholder-[#8D6E63]"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-[#4E342E]/10 hover:bg-[#4E342E] text-[#4E342E] hover:text-white rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-2 flex gap-2 justify-center">
              <button onClick={() => setInput("What is Agentic AI?")} className="text-[10px] text-[#795548] hover:text-[#4E342E] transition-colors">"What is Agentic AI?"</button>
              <button onClick={() => setInput("Tell me about your bio-engineering work")} className="text-[10px] text-[#795548] hover:text-[#4E342E] transition-colors">"Bio-engineering work?"</button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl shadow-[#4E342E]/20 transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden border-2 ${
          isOpen ? 'bg-[#3E2723] text-white rotate-90 border-white/10' : 'bg-gradient-to-tr from-[#4E342E] to-[#6D4C41] text-white border-transparent'
        }`}
      >
        <div className={`absolute inset-0 rounded-full bg-[#8D6E63] opacity-20 animate-ping ${isOpen ? 'hidden' : 'block'}`}></div>
        {isOpen ? <X size={24} /> : <FloatingToggleIcon />}
      </button>
    </div>
  );
};

export default ChatWidget;