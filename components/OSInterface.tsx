import React from 'react';
import { Menu, Sparkles, ArrowRight } from 'lucide-react';
import Sidebar from './Sidebar';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { MessageType } from '../types/app';

interface OSInterfaceProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    handleNavigate: (section: string) => void;
    handleReset: () => void;
    messages: MessageType[];
    isTyping: boolean;
    handleUserMessage: (text: string) => void;
    scrollRef: React.RefObject<HTMLDivElement | null>;
}

const OSInterface: React.FC<OSInterfaceProps> = ({
    sidebarOpen,
    setSidebarOpen,
    handleNavigate,
    handleReset,
    messages,
    isTyping,
    handleUserMessage,
    scrollRef
}) => {
    return (
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
                        <span className="text-xs font-mono font-bold text-zinc-300 tracking-[0.4em] uppercase">Identity Link: Gobinath // Active</span>
                    </div>
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors">
                        <Menu size={20} />
                    </button>
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
    );
};

export default OSInterface;
