import React from 'react';
import { Smartphone } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { CardTheme } from '../../types/card';
import { SOCIAL_LINKS } from '../../constants';

interface CardBackProps {
    theme: CardTheme;
}

export const CardBack: React.FC<CardBackProps> = ({ theme }) => (
    <div className={`relative h-full flex flex-col pt-8 pb-6 px-8 z-10 animate-in fade-in duration-500 ${theme.bg} ${theme.style === 'cartoon' ? 'border-4 border-black' : ''}`}>
        <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 grayscale pointer-events-none ${theme.isFlat ? 'hidden' : ''}`} />
        <div className={`absolute inset-0 rounded-3xl border ${theme.style === 'cartoon' ? 'border-black' : 'border-white/5'} pointer-events-none z-50`} />

        {/* Magnetic Strip */}
        <div className={`absolute top-4 left-0 w-full h-10 ${theme.style === 'cartoon' ? 'bg-black' : 'bg-[#1a1a1a]'} z-0`} />

        <div className="relative z-10 flex flex-col h-full justify-between mt-6">
            {/* Top Row: Signature & CVC-like Code */}
            <div className="flex items-center justify-between mb-4">
                <div className={`h-8 w-2/3 ${theme.style === 'cartoon' ? 'bg-white border-2 border-black' : 'bg-white/10'} rounded-sm flex items-center px-4`}>
                    <span className="font-handwriting text-zinc-500 text-sm transform -rotate-2 select-none" style={{ fontFamily: 'cursive' }}>Gobinath</span>
                </div>
                <div className={`h-8 w-1/6 ${theme.style === 'cartoon' ? 'bg-white border-2 border-black' : 'bg-white/5'} rounded-sm flex items-center justify-center border border-white/10`}>
                    <span className={`font-mono text-[10px] ${theme.isFlat && theme.id.includes('white') ? 'text-zinc-900' : theme.text}`}>807</span>
                </div>
            </div>

            {/* Middle Row: Chip & Contactless */}
            <div className="flex items-center justify-between pl-1">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-8 rounded bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-600 flex items-center justify-center relative overflow-hidden shadow-inner">
                        <div className="absolute w-full h-[1px] bg-amber-700 top-1/2 -translate-y-1/2" />
                        <div className="absolute h-full w-[1px] bg-amber-700 left-1/2 -translate-x-1/2" />
                        <div className="w-4 h-4 rounded border border-amber-700/50" />
                    </div>
                    {theme.style === 'cartoon' ? <span className="text-xl">⚡</span> : <Smartphone size={20} className="text-zinc-500 rotate-90" />}
                </div>

                {/* QR Code as Hologram */}
                <div className={`p-1 bg-white rounded-lg shadow-lg ${theme.style === 'cartoon' ? 'border-4 border-black' : ''}`}>
                    <QRCodeCanvas value={`https://${SOCIAL_LINKS.linkedin}`} size={64} />
                </div>
            </div>

            {/* Bottom Row: Capabilities as Card Numbers */}
            <div className="space-y-1 mt-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <div className={`text-[8px] ${theme.isFlat && theme.id.includes('white') ? 'text-zinc-500' : theme.text} font-mono uppercase tracking-widest`}>Core Protocols</div>
                        <div className={`flex gap-4 font-mono text-sm md:text-base tracking-widest text-shadow ${theme.isFlat && theme.id.includes('white') ? 'text-zinc-900' : 'text-zinc-300'}`}>
                            <span>BIO</span>
                            <span>AI</span>
                            <span>SOC</span>
                            <span className={theme.id === 'midnight' ? 'text-emerald-400' : ''}>V.1</span>
                        </div>
                    </div>
                </div>

                <div className="pt-3 flex justify-between items-end">
                    <div>
                        <div className="text-[6px] text-zinc-600 uppercase tracking-widest mb-0.5">Authorized User</div>
                        <div className={`font-mono text-xs uppercase tracking-wider ${theme.isFlat && theme.id.includes('white') ? 'text-zinc-900' : 'text-white'}`}>GOBINATH CHITHIRAVELU</div>
                    </div>
                    <div className="text-[6px] text-zinc-600 font-mono max-w-[120px] leading-tight text-right uppercase">
                        Issued by me. valid worldwide.
                    </div>
                </div>
            </div>
        </div>
    </div>
);
