import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatInput from './components/ChatInput';
import MessageBubble from './components/MessageBubble';
import BackgroundAnimation from './components/BackgroundAnimation';
import { BioDigitalCore } from './components/ContentRenderer';
import { PROJECTS, EXPERIENCES, SKILLS, EDUCATION, PUBLICATIONS, MEDIA, SOCIAL_LINKS, GALLERY, PATENTS, PROFILE_IMAGE } from './constants';
import { Menu, Sparkles, Bot, Wifi, Battery, User, TrendingUp, FlaskConical, Handshake, Eye, ShieldCheck, ArrowRight } from 'lucide-react';
import { MessageType } from './types';

const App: React.FC = () => {
  // Desktop / Launcher State
  const [launchState, setLaunchState] = useState<'desktop' | 'launching' | 'running'>('desktop');
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Chat App State
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Clock for Desktop
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Welcome Message with Persona Context
  useEffect(() => {
    if (launchState === 'running') {
      let personaGreeting = "Hello. I am the Vibe Agent. Protocol synchronized for Gobinath's vault.";
      
      if (selectedPersona === 'investor') {
        personaGreeting = "Investor access granted. Intelligence bridge synchronized. Accessing product roadmap and patent archives.";
      } else if (selectedPersona === 'researcher') {
        personaGreeting = "Academic link established. Accessing publication datasets and laboratory protocols.";
      } else if (selectedPersona === 'collaborator') {
        personaGreeting = "Partnership protocol initiated. Synchronizing technical stack and project logs.";
      } else if (selectedPersona === 'curious') {
        personaGreeting = "Visitor access enabled. Welcome to the Bio-Digital vault. Loading overview.";
      }

      const initialMessages: MessageType[] = [
        { 
          role: 'model', 
          text: personaGreeting,
          isStreaming: false 
        },
        {
          role: 'model', 
          text: "Accessing primary identity module...",
          component: 'About',
          isStreaming: false
        }
      ];
      setMessages(initialMessages);
    }
  }, [launchState, selectedPersona]);

  // Auto-scroll logic
  useEffect(() => {
    if (launchState === 'running') {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, launchState]);

  const handleLaunch = (persona: string = 'curious') => {
    setSelectedPersona(persona);
    setLaunchState('launching');
    setTimeout(() => {
      setLaunchState('running');
    }, 800);
  };

  const handleUserMessage = async (text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsTyping(true);

    // Simulated Intelligent Local Response
    setTimeout(() => {
      let component: string | undefined;
      let responseText = "I've analyzed your request. Accessing the relevant vault module...";
      const lower = text.toLowerCase();

      if (lower.includes('project')) {
        component = 'Projects';
        responseText = "Retrieving the product and project matrix from Gobinath's archives.";
      } else if (lower.includes('patent')) {
        component = 'Patents';
        responseText = "Decrypting Intellectual Property records. Accessing patent data.";
      } else if (lower.includes('experience') || lower.includes('work')) {
        component = 'Experience';
        responseText = "Syncing professional timeline and career highlights.";
      } else if (lower.includes('skill') || lower.includes('stack')) {
        component = 'Skills';
        responseText = "Mapping the technical arsenal and core capabilities.";
      } else if (lower.includes('research') || lower.includes('publication')) {
        component = 'Publications';
        responseText = "Accessing scientific publications and research datasets.";
      } else if (lower.includes('media') || lower.includes('press')) {
        component = 'Media';
        responseText = "Loading global frequency logs and media footprint.";
      } else if (lower.includes('contact') || lower.includes('hire')) {
        component = 'Contact';
        responseText = "Establishing communication link. Channels are open.";
      } else if (lower.includes('about') || lower.includes('who')) {
        component = 'About';
        responseText = "Running primary identity synchronization. Here is the overview.";
      } else if (lower.includes('edu')) {
        component = 'Education';
        responseText = "Accessing academic core modules and educational background.";
      } else if (lower.includes('photo') || lower.includes('gallery') || lower.includes('visual')) {
        component = 'Gallery';
        responseText = "Opening visual archives and lab documentation.";
      } else if (lower.includes('learning') || lower.includes('database') || lower.includes('mysql')) {
        component = 'Learning';
        responseText = "Syncing recent knowledge acquisition logs for Database and MySQL optimization.";
      } else if (lower.includes('tool') || lower.includes('claude') || lower.includes('cursor')) {
        component = 'Tools';
        responseText = "Inventory check complete. Displaying favorite technical tools and development stack.";
      } else {
        responseText = "Command recognized. I am currently operating in direct-vault mode. You can ask about his projects, experience, patents, or tools.";
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: responseText, 
        component 
      }]);
      setIsTyping(false);
    }, 800);
  };

  const handleNavigate = (section: string) => {
    setSidebarOpen(false);
    const config = {
      'About': { prompt: "Who is Gobinath?", text: "Running identity sync. Here is the profile overview.", component: 'About' },
      'Projects': { prompt: "Show me the projects.", text: "Check out the product and project matrix.", component: 'Projects' },
      'Patents': { prompt: "Tell me about your patents.", text: "Accessing Intellectual Property vault.", component: 'Patents' },
      'Experience': { prompt: "What is the work experience?", text: "Here is the professional timeline.", component: 'Experience' },
      'Education': { prompt: "Show education history.", text: "Here is the academic background.", component: 'Education' },
      'Skills': { prompt: "List technical skills.", text: "Here is the technical arsenal.", component: 'Skills' },
      'Publications': { prompt: "Show publications.", text: "Here are the scientific publications.", component: 'Publications' },
      'Media': { prompt: "Show media coverage.", text: "Here is the recent press coverage.", component: 'Media' },
      'Contact': { prompt: "How do I contact?", text: "Communication channels open.", component: 'Contact' },
      'Gallery': { prompt: "Show me the visual vault.", text: "Opening visual archives.", component: 'Gallery' },
      'Learning': { prompt: "What have you been learning lately?", text: "Accessing knowledge synchronization log.", component: 'Learning' },
      'Tools': { prompt: "What tools do you use?", text: "Displaying favorite tools and development stack.", component: 'Tools' },
    };
    const target = config[section as keyof typeof config];
    if (!target) return;

    setMessages(prev => [...prev, { role: 'user', text: target.prompt }]);
    setIsTyping(true);

    setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: 'model', 
            text: target.text, 
            component: target.component,
            isStreaming: false 
        }]);
        setIsTyping(false);
    }, 600);
  };

  const handleReset = () => {
     setMessages([
      { role: 'model', text: "Session reset. Hello again.", isStreaming: false },
      { role: 'model', text: "Ready for new command.", component: 'About', isStreaming: false }
     ]);
     setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen h-[100dvh] w-full font-sans overflow-hidden text-zinc-100 selection:bg-cyan-500/30">
      {/* Background Animation - Always present for Glassmorphism */}
      <BackgroundAnimation />

      {launchState !== 'running' ? (
        <div className="relative h-full w-full overflow-hidden font-sans select-none flex flex-col">
          {/* Status Bar */}
          <div className="absolute top-0 w-full h-10 flex justify-between px-6 items-center z-20 glass-panel border-b border-white/5 bg-black/20">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                 <span className="text-[10px] font-mono font-bold text-cyan-100 tracking-[0.2em] uppercase">Security Level: High</span>
               </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
              <Wifi size={14} /> <Battery size={14} />
              <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 py-12">
            {/* Glass Hero Card */}
            <div 
              className={`
                glass-panel rounded-[2.5rem] p-8 md:p-16 flex flex-col items-center gap-8 md:gap-12 transition-all duration-700 w-full max-w-5xl shadow-[0_0_100px_rgba(34,211,238,0.05)] border border-white/10
                ${launchState === 'launching' ? 'scale-110 opacity-0 blur-2xl' : 'scale-100 opacity-100'}
              `}
            >
              <div className="text-center space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-5xl font-light tracking-tight leading-tight text-white drop-shadow-lg">
                  Intelligence bridge between <br/>
                  <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">biotech</span> and <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">social consumer products</span>,<br/>
                  <span className="italic font-black text-zinc-400">AI automation.</span>
                </h2>
                
                <div className="pt-6 md:pt-10 space-y-8 md:space-y-12">
                  <div className="space-y-4 md:space-y-6">
                    <p className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase flex items-center justify-center gap-3">
                      <ShieldCheck size={12} className="text-cyan-400" />
                      Identify Yourself
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 px-2">
                      <PersonaButton 
                        icon={<TrendingUp size={18} />} 
                        label="Investor" 
                        selected={selectedPersona === 'investor'}
                        onClick={() => setSelectedPersona('investor')} 
                      />
                      <PersonaButton 
                        icon={<FlaskConical size={18} />} 
                        label="Researcher" 
                        selected={selectedPersona === 'researcher'}
                        onClick={() => setSelectedPersona('researcher')} 
                      />
                      <PersonaButton 
                        icon={<Handshake size={18} />} 
                        label="Collaborator" 
                        selected={selectedPersona === 'collaborator'}
                        onClick={() => setSelectedPersona('collaborator')} 
                      />
                      <PersonaButton 
                        icon={<Eye size={18} />} 
                        label="Curious" 
                        selected={selectedPersona === 'curious'}
                        onClick={() => setSelectedPersona('curious')} 
                      />
                    </div>
                  </div>

                  <button 
                    disabled={!selectedPersona}
                    onClick={() => handleLaunch(selectedPersona || 'curious')}
                    className={`
                      group relative px-12 md:px-16 py-4 md:py-5 rounded-full font-mono tracking-[0.8em] text-[10px] md:text-xs uppercase transition-all overflow-hidden border
                      ${selectedPersona 
                        ? 'bg-zinc-100 border-zinc-100 text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95' 
                        : 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed'}
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      CLICK TO ENTER
                      {selectedPersona && <ArrowRight size={14} className="animate-bounce-x" />}
                    </span>
                    {selectedPersona && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full overflow-hidden animate-in zoom-in-95 duration-700">
          
          {/* Glass Sidebar */}
          <div className="hidden md:block h-full shrink-0">
             <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
                onNavigate={handleNavigate}
                onReset={handleReset}
             />
          </div>

          {/* Mobile Sidebar (Absolute) */}
          <div className="md:hidden">
              <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
                onNavigate={handleNavigate}
                onReset={handleReset}
             />
          </div>

          {/* Glass Main Content */}
          <main className="flex-1 relative flex flex-col h-full overflow-hidden glass-panel border-0 md:border-l-0 border-white/5 bg-black/20">
            {/* Desktop Status Bar */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-zinc-900/50 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                   <span className="text-[10px] font-mono font-bold text-zinc-300 tracking-[0.4em] uppercase">Identity Link: Gobinath // Active</span>
                </div>
                <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"><Menu size={20}/></button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto pb-32 md:pb-40 px-4 md:px-0 scroll-smooth">
              <div className="max-w-4xl mx-auto w-full pt-8">
                {messages.map((msg, index) => (
                  <MessageBubble key={index} message={msg} />
                ))}
                {isTyping && (
                   <div className="w-full p-6 md:p-10 animate-in fade-in">
                     <div className="flex gap-4 md:gap-6 max-w-3xl mx-auto">
                        <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                          <Sparkles size={18} className="text-cyan-400 animate-pulse" />
                        </div>
                        <span className="text-zinc-500 text-sm font-mono tracking-widest pt-2 uppercase">Syncing Archive...</span>
                     </div>
                   </div>
                )}
                <div ref={scrollRef} className="h-4" />
              </div>
            </div>

            {/* Floating Glass Input */}
            <div className="absolute bottom-0 left-0 w-full pt-6 pb-5 md:pb-6 px-4 md:px-8 bg-gradient-to-t from-[#09090b] via-[#09090b]/95 to-transparent z-10 backdrop-blur-sm">
              <div className="max-w-3xl mx-auto">
                <ChatInput onSend={handleUserMessage} disabled={isTyping} />
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

const PersonaButton = ({ icon, label, onClick, selected }: { icon: React.ReactNode, label: string, onClick: () => void, selected: boolean }) => (
  <button 
    onClick={onClick}
    className={`
      group flex flex-col items-center gap-3 md:gap-4 px-4 md:px-6 py-4 md:py-6 rounded-2xl md:rounded-3xl transition-all duration-300 border relative overflow-hidden
      ${selected 
        ? 'glass-panel bg-white/10 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-105' 
        : 'glass-card hover:bg-white/5 hover:border-white/20 scale-100'}
    `}
  >
    {selected && (
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-pulse"></div>
    )}
    <div className={`
      p-2.5 md:p-3.5 rounded-xl md:rounded-2xl transition-all duration-300
      ${selected ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-zinc-400 group-hover:text-white'}
    `}>
      {icon}
    </div>
    <span className={`
      text-[9px] md:text-[11px] font-mono uppercase tracking-[0.2em] transition-colors
      ${selected ? 'text-cyan-300 font-bold' : 'text-zinc-600 group-hover:text-zinc-300'}
    `}>
      {label}
    </span>
  </button>
);

export default App;