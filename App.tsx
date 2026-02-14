import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundAnimation from './components/BackgroundAnimation';
import Launcher from './components/Launcher';
import OSInterface from './components/OSInterface';
import { MessageType } from './types/app';

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
        personaGreeting = "Welcome. I've compiled my research on longevity, cardiovascular health, and tissue engineering here.";
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

    // Impactful haptic-style delay
    setTimeout(() => {
      setLaunchState('running');
    }, 2000);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });

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
      <BackgroundAnimation />

      <AnimatePresence mode="wait">
        {launchState === 'launching' && (
          <motion.div
            key="syncing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl"
          >
            <div className="relative">
              <div className="w-32 h-32 border-2 border-cyan-500/20 rounded-full animate-ping"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_15px_#fbbf24]"></div>
                <div className="text-[10px] font-mono tracking-[1em] text-zinc-400 uppercase animate-pulse">
                  Linking Pulse...
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-2 text-center overflow-hidden h-6 text-[8px] font-mono text-cyan-500/40 uppercase">
              <motion.div
                animate={{ y: [0, -100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(10)].map((_, i) => (
                  <div key={i}>ID: {Math.random().toString(36).substring(7)} // SYNCING_NODE_{i}</div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {launchState === 'desktop' ? (
          <motion.div
            key="launcher"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <Launcher
              launchState={launchState}
              selectedPersona={selectedPersona}
              setSelectedPersona={setSelectedPersona}
              handleLaunch={handleLaunch}
              currentTime={currentTime}
            />
          </motion.div>
        ) : launchState === 'running' && (
          <motion.div
            key="os-interface"
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(40px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full w-full"
          >
            <OSInterface
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleNavigate={handleNavigate}
              handleReset={handleReset}
              messages={messages}
              isTyping={isTyping}
              handleUserMessage={handleUserMessage}
              scrollRef={scrollRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;