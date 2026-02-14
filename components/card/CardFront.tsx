import React from 'react';
import { ShieldCheck, Mail, Globe } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { CardTheme } from '../../types/card';
import { SOCIAL_LINKS, PROFILE_IMAGE } from '../../constants';

interface CardFrontProps {
    theme: CardTheme;
}

export const CardFront: React.FC<CardFrontProps> = ({ theme }) => (
    <div className={`relative h-full flex flex-col justify-between p-6 md:p-8 z-10 animate-in fade-in duration-500 ${theme.bg} ${theme.style === 'cartoon' ? 'border-4 border-black' : ''}`}>
        {!theme.isFlat && (
            <>
                <div className={`absolute top-0 right-0 w-64 h-64 ${theme.glow} rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
                <div className={`absolute bottom-0 left-0 w-64 h-64 ${theme.glow} rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none`} />
            </>
        )}

        {theme.id === 'blueprint' && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        )}

        {theme.style === 'sketch' && (
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
        )}

        <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale pointer-events-none ${theme.isFlat ? 'hidden' : ''}`} />
        <div className={`absolute inset-0 rounded-3xl border ${theme.style === 'cartoon' ? 'border-black' : 'border-white/5'} pointer-events-none z-50`} />

        {/* Header */}
        <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-4">
                <div className={`relative w-16 h-16 rounded-2xl overflow-hidden border ${theme.style === 'cartoon' ? 'border-4 border-black' : 'border-white/10'} shadow-lg`}>
                    <img src={PROFILE_IMAGE} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className={`text-2xl font-bold tracking-tight leading-none mb-1 ${theme.isFlat && theme.id.includes('white') ? 'text-zinc-900' : 'text-white'}`}>Gobinath</h3>
                    <p className={`text-xs ${theme.accent} font-mono tracking-widest uppercase mb-1 font-bold`}>Engineer & Builder</p>
                    <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${theme.id === 'midnight' ? 'bg-emerald-500' : 'bg-current'} animate-pulse`} />
                        <span className={`text-[10px] ${theme.isFlat && theme.id.includes('white') ? 'text-zinc-500' : 'text-zinc-500'} font-mono`}>Open for Collaboration</span>
                    </div>
                    <div className={`text-[9px] ${theme.text} font-mono tracking-widest mt-1.5 opacity-80 uppercase`}>
                        BIO • AI • CONSUMER • PRODUCT
                    </div>
                </div>
            </div>
            {theme.style === 'cartoon' ? (
                <div className="text-3xl">🚀</div>
            ) : (
                <ShieldCheck className="text-zinc-700 w-8 h-8 opacity-50" />
            )}
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-end mt-4 z-10">
            <div className="space-y-2">
                <div className={`flex items-center gap-2 text-xs ${theme.isFlat && theme.id.includes('white') ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    <Mail size={12} className={theme.accent} />
                    <span className="tracking-wide">{SOCIAL_LINKS.email}</span>
                </div>
                <div className={`flex items-center gap-2 text-xs ${theme.isFlat && theme.id.includes('white') ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    <Globe size={12} className={theme.accent} />
                    <span className="tracking-wide">gobinath.dev</span>
                </div>
                {theme.style === 'cartoon' && <div className="text-xs">✨ Friendly Builder ✨</div>}
            </div>
            <div className={`p-1.5 bg-white rounded-lg shadow-lg ${theme.style === 'cartoon' ? 'border-4 border-black' : 'opacity-50 grayscale hover:grayscale-0'} transition-all`}>
                <QRCodeCanvas value={`https://${SOCIAL_LINKS.linkedin}`} size={48} />
            </div>
        </div>
    </div>
);
