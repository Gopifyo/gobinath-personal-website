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
      let personaGreeting = "Welcome. I'm Gobinath, a Bioengineer and Founder. How can I help you today?";
      if (selectedPersona === 'investor') {
        personaGreeting = "Welcome. Here is my product roadmap and patent portfolio. What would you like to see?";
      } else if (selectedPersona === 'researcher') {
        personaGreeting = "Welcome. I've compiled my research on bioprinting and tissue engineering here.";
      } else if (selectedPersona === 'collaborator') {
        personaGreeting = "Great to meet you. I'm always looking for high-impact collaborations.";
      } else if (selectedPersona === 'curious') {
        personaGreeting = "Hello! Feel free to explore my work in AI and Bio-engineering.";
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

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update chat context with natural language
    // Note: chatWidgetRef and setActiveSection are not defined in this scope.
    // Assuming the intent is to update the chat messages directly.
    const messagesConfig = {
      'About': { prompt: "Who is Gobinath?", text: "Here is a bit about who I am.", component: 'About' },
      'Projects': { prompt: "Show me the projects.", text: "Here are the projects I've been working on.", component: 'Projects' },
      'Patents': { prompt: "Show me patents.", text: "Here is my portfolio of intellectual property.", component: 'Patents' },
      'Experience': { prompt: "Show me experience.", text: "Here is my professional timeline.", component: 'Experience' },
      'Skills': { prompt: "List technical skills.", text: "These are the tools and technologies I use.", component: 'Skills' },
      'Education': { prompt: "Show education.", text: "Here is my academic background.", component: 'Education' },
      'Publications': { prompt: "Show publications.", text: "Here are my research publications.", component: 'Publications' },
      'Media': { prompt: "Show media coverage.", text: "Here are some press features and articles.", component: 'Media' },
      'Gallery': { prompt: "Show the gallery.", text: "Welcome to my personal gallery.", component: 'Gallery' },
      'Contact': { prompt: "How to contact?", text: "Here is the best way to reach me.", component: 'Contact' },
      'Learning': { prompt: "What have you been learning lately?", text: "Accessing knowledge synchronization log.", component: 'Learning' },
      'Tools': { prompt: "What tools do you use?", text: "Displaying favorite tools and development stack.", component: 'Tools' },
    };

    const target = messagesConfig[section as keyof typeof messagesConfig];
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
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_10px_#fbbf24]" />
                <span className="text-[10px] font-mono font-bold text-amber-100 tracking-[0.2em] uppercase">Kobalan Gobinath</span>
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
                  Intelligence bridge between <br />
                  <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">biotech</span> and <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">social consumer products</span>,<br />
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
              activeSection={messages.length > 0 ? messages[messages.length - 1].component : undefined}
            />
          </div>

          {/* Mobile Sidebar (Absolute) */}
          <div className="md:hidden">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onNavigate={handleNavigate}
              onReset={handleReset}
              activeSection={messages.length > 0 ? messages[messages.length - 1].component : undefined}
            />
          </div>

          {/* Glass Main Content */}
          <main className="flex-1 relative flex flex-col h-full overflow-hidden glass-panel border-0 md:border-l-0 border-white/5 bg-black/20">
            {/* Desktop Status Bar */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-zinc-900/50 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_10px_#fbbf24]" />
                <span className="text-[10px] font-mono font-bold text-zinc-300 tracking-[0.4em] uppercase">Identity Link: Gobinath // Active</span>
              </div>
              <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"><Menu size={20} /></button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto pb-52 md:pb-64 px-4 md:px-0 scroll-smooth">
              <div className="max-w-4xl mx-auto w-full pt-8">
                {messages.map((msg, index) => (
                  <MessageBubble key={index} message={msg} />
                ))}
                {isTyping && (
                  <div className="w-full p-6 md:p-10 animate-in fade-in">
                    <div className="flex gap-4 md:gap-6 max-w-3xl mx-auto">
                      <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                        <Sparkles size={18} className="text-amber-400 animate-pulse" />
                      </div>
                      <span className="text-zinc-500 text-sm font-mono tracking-widest pt-2 uppercase">Syncing Archive...</span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} className="h-4" />
              </div>
            </div>

            {/* Scroll To Top Button */}
            <button
              onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="fixed bottom-24 right-6 p-3 bg-zinc-800/80 backdrop-blur text-zinc-400 hover:text-white rounded-full border border-white/10 shadow-xl transition-all hover:scale-110 active:scale-90 z-40 md:hidden"
            >
              <ArrowRight size={20} className="-rotate-90" />
            </button>

            {/* Floating Glass Input */}
            <div className="absolute bottom-0 left-0 w-full pt-6 pb-5 md:pb-6 px-4 md:px-8 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent z-10 backdrop-blur-xl">
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
        ? 'glass-panel bg-white/10 border-amber-500/50 shadow-[0_0_30px_rgba(251,191,36,0.15)] scale-105'
        : 'glass-card hover:bg-white/5 hover:border-white/20 scale-100'}
    `}
  >
    {selected && (
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24] animate-pulse"></div>
    )}
    <div className={`
      p-2.5 md:p-3.5 rounded-xl md:rounded-2xl transition-all duration-300
      ${selected ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 text-zinc-400 group-hover:text-white'}
    `}>
      {icon}
    </div>
    <span className={`
      text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] transition-colors
      ${selected ? 'text-amber-300 font-bold' : 'text-zinc-600 group-hover:text-zinc-300'}
    `}>
      {label}
    </span>
  </button>
);

export default App;