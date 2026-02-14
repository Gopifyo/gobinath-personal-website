import React from 'react';

interface PersonaButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    selected: boolean;
}

const PersonaButton: React.FC<PersonaButtonProps> = ({ icon, label, onClick, selected }) => (
    <button
        onClick={onClick}
        className={`
      group flex flex-col items-center gap-3 md:gap-4 px-4 md:px-6 py-4 md:py-6 rounded-2xl md:rounded-3xl transition-all duration-500 border relative overflow-hidden
      ${selected
                ? 'glass-panel bg-white/10 border-amber-500/50 shadow-[0_0_40px_rgba(251,191,36,0.2)] scale-105'
                : 'glass-card hover:bg-white/5 hover:border-white/20 scale-100'}
    `}
    >
        {/* Biometric Scanning Line overlay */}
        <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none z-10"></div>

        {/* Neural Pulse Background for Selected State */}
        {selected && (
            <div className="absolute inset-0 bg-amber-500/5 animate-neural-pulse rounded-full blur-3xl -z-10"></div>
        )}

        {selected && (
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24] animate-pulse"></div>
        )}

        <div className={`
      relative z-10 p-2.5 md:p-3.5 rounded-xl md:rounded-2xl transition-all duration-300
      ${selected ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 text-zinc-400 group-hover:text-white'}
    `}>
            {icon}
        </div>
        <span className={`
      relative z-10 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] transition-colors
      ${selected ? 'text-amber-300 font-bold' : 'text-zinc-600 group-hover:text-zinc-300'}
    `}>
            {label}
        </span>
    </button>
);

export default PersonaButton;
