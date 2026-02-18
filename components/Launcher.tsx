import React from 'react';
import { Wifi, Battery, ShieldCheck, ArrowRight, TrendingUp, FlaskConical, Handshake, Eye } from 'lucide-react';
import PersonaButton from './PersonaButton';
import { DecryptedText } from './DecryptedText';

interface LauncherProps {
    launchState: 'desktop' | 'launching' | 'running';
    selectedPersona: string | null;
    setSelectedPersona: (persona: string) => void;
    handleLaunch: (persona?: string) => void;
    currentTime: Date;
}

const Launcher: React.FC<LauncherProps> = ({
    launchState,
    selectedPersona,
    setSelectedPersona,
    handleLaunch,
    currentTime
}) => {
    return (
        <div className="relative h-full w-full overflow-hidden font-sans select-none flex flex-col bg-[#020617]">
            {/* HUD Corner Accents */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl -z-10"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-3xl -z-10"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-3xl -z-10"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-500/20 rounded-br-3xl -z-10"></div>

            {/* Floating Status HUD */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 md:px-8 flex justify-between items-center z-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-full border-white/5 bg-black/40">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_10px_#fbbf24]" />
                        <span className="text-[10px] font-mono font-bold text-amber-100 tracking-[0.2em] uppercase">Identity: Gobinath</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 glass-panel px-4 py-2 rounded-full border-white/5 bg-black/40 text-[10px] font-mono text-zinc-400 uppercase tracking-widest leading-none">
                    <Wifi size={14} className="text-cyan-400" />
                    <Battery size={14} className="text-emerald-400" />
                    <span className="pt-0.5">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 py-12">
                {/* Glass Hero Card */}
                <div
                    className={`
            glass-panel rounded-[2.5rem] p-8 md:p-20 flex flex-col items-center gap-8 md:gap-14 transition-all duration-1000 w-full max-w-5xl shadow-[0_0_100px_rgba(34,211,238,0.05)] border border-white/10
            ${launchState === 'launching' ? 'scale-110 opacity-0 blur-2xl' : 'scale-100 opacity-100'}
          `}
                >
                    <div className="text-center space-y-6 md:space-y-8">
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tighter leading-[1.05] text-white drop-shadow-2xl px-2 max-w-4xl mx-auto">
                            <DecryptedText text="Intelligence bridge between" /><br />
                            <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400 pr-2">biotech</span>
                            <span className="text-zinc-600 font-thin">and</span><br className="md:hidden" />
                            <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200 px-2">social consumer products</span>
                            <span className="text-zinc-500">,</span><br />
                            <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-200 to-zinc-400 tracking-tighter">
                                <DecryptedText text="AI automation." delay={1000} />
                            </span>
                        </h2>

                        <div className="pt-8 md:pt-14 space-y-8 md:space-y-16">
                            <div className="space-y-6 md:space-y-8">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="h-[1px] w-8 bg-zinc-800"></div>
                                    <p className="text-[10px] font-mono tracking-[0.5em] text-zinc-500 uppercase flex items-center gap-3">
                                        Identify yourself below
                                    </p>
                                    <div className="h-[1px] w-8 bg-zinc-800"></div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-0 md:px-2">
                                    <PersonaButton
                                        icon={<TrendingUp size={20} />}
                                        label="Investor"
                                        selected={selectedPersona === 'investor'}
                                        onClick={() => setSelectedPersona('investor')}
                                    />
                                    <PersonaButton
                                        icon={<FlaskConical size={20} />}
                                        label="Researcher"
                                        selected={selectedPersona === 'researcher'}
                                        onClick={() => setSelectedPersona('researcher')}
                                    />
                                    <PersonaButton
                                        icon={<Handshake size={20} />}
                                        label="Collaborator"
                                        selected={selectedPersona === 'collaborator'}
                                        onClick={() => setSelectedPersona('collaborator')}
                                    />
                                    <PersonaButton
                                        icon={<Eye size={20} />}
                                        label="Curious"
                                        selected={selectedPersona === 'curious'}
                                        onClick={() => setSelectedPersona('curious')}
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 ${!selectedPersona && 'hidden'}`}></div>
                                <button
                                    disabled={!selectedPersona}
                                    onClick={() => handleLaunch(selectedPersona || 'curious')}
                                    className={`
                    group relative px-14 md:px-20 py-5 md:py-6 rounded-full font-mono tracking-[1em] text-[10px] md:text-xs uppercase transition-all overflow-hidden border
                    ${selectedPersona
                                            ? 'bg-zinc-100 border-zinc-100 text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95'
                                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-700 cursor-not-allowed'}
                  `}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        ENTER TO VISIT
                                        {selectedPersona && <ArrowRight size={16} className="animate-bounce-x" />}
                                    </span>
                                    {selectedPersona && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Launcher;
