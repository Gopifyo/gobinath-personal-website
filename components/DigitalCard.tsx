import React, { useRef, useState } from 'react'
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, FileDown, ShieldCheck, Mail, Github, Linkedin, Globe, Repeat, Dna, Rocket, Smartphone } from 'lucide-react';
import { SOCIAL_LINKS, PROFILE_IMAGE } from '../constants';

// --- Sub-Components for Reusability ---

const CardFront = () => (
    <div className="relative h-full flex flex-col justify-between p-6 md:p-8 z-10 animate-in fade-in duration-500 bg-[#09090b]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale pointer-events-none" />
        <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none z-50" />

        {/* Header */}
        <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                    <img src={PROFILE_IMAGE} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">Gobinath</h3>
                    <p className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-1">Engineer & Builder</p>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-zinc-500 font-mono">Open for Collaboration</span>
                    </div>
                </div>
            </div>
            <ShieldCheck className="text-zinc-700 w-8 h-8 opacity-50" />
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-end mt-4 z-10">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Mail size={12} className="text-cyan-400" />
                    <span className="tracking-wide">{SOCIAL_LINKS.email}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Globe size={12} className="text-violet-400" />
                    <span className="tracking-wide">gobinath.dev</span>
                </div>
                <div className="flex gap-3 mt-1 pt-1 border-t border-white/5">
                    <Linkedin size={14} className="text-zinc-500" />
                    <Github size={14} className="text-zinc-500" />
                </div>
            </div>
            {/* Mini QR on front */}
            <div className="p-1.5 bg-white rounded-lg shadow-lg opacity-50 grayscale hover:grayscale-0 transition-all">
                <QRCodeCanvas value={`https://${SOCIAL_LINKS.linkedin}`} size={48} />
            </div>
        </div>
    </div>
);

const CardBack = () => (
    <div className="relative h-full flex flex-col pt-8 pb-6 px-8 z-10 animate-in fade-in duration-500 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 grayscale pointer-events-none" />
        <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none z-50" />

        {/* Magnetic Strip */}
        <div className="absolute top-4 left-0 w-full h-10 bg-[#1a1a1a] z-0" />

        <div className="relative z-10 flex flex-col h-full justify-between mt-6">

            {/* Top Row: Signature & CVC-like Code */}
            <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-2/3 bg-white/10 rounded-sm flex items-center px-4">
                    <span className="font-handwriting text-zinc-500 text-sm transform -rotate-2 select-none" style={{ fontFamily: 'cursive' }}>Gobinath</span>
                </div>
                <div className="h-8 w-1/6 bg-white/5 rounded-sm flex items-center justify-center border border-white/10">
                    <span className="font-mono text-[10px] text-zinc-400">807</span>
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
                    <Smartphone size={20} className="text-zinc-500 rotate-90" />
                </div>

                {/* QR Code as Hologram */}
                <div className="p-1 bg-white rounded-lg shadow-lg">
                    <QRCodeCanvas value={`https://${SOCIAL_LINKS.linkedin}`} size={64} />
                </div>
            </div>

            {/* Bottom Row: Capabilities as Card Numbers */}
            <div className="space-y-1 mt-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest">Core Protocols</div>
                        <div className="flex gap-4 font-mono text-sm md:text-base text-zinc-300 tracking-widest text-shadow">
                            <span>BIO</span>
                            <span>AI</span>
                            <span>SOC</span>
                            <span className="text-emerald-400">V.1</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-between items-end">
                    <div>
                        <div className="text-[6px] text-zinc-600 uppercase tracking-widest mb-0.5">Authorized User</div>
                        <div className="font-mono text-xs text-white uppercase tracking-wider">GOBINATH CHITHIRAVELU</div>
                    </div>
                    <div className="text-[6px] text-zinc-600 font-mono max-w-[120px] leading-tight text-right">
                        ISSUED BY ME. VALID WORLDWIDE.
                    </div>
                </div>
            </div>

        </div>
    </div>
);

export const DigitalCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const hiddenFrontRef = useRef<HTMLDivElement>(null);
    const hiddenBackRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    // Capture currently visible side for image download
    const downloadImage = async (format: 'png' | 'jpeg') => {
        if (!cardRef.current) return;
        try {
            const dataUrl = format === 'png'
                ? await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 })
                : await toJpeg(cardRef.current, { quality: 0.95, pixelRatio: 3 });

            const link = document.createElement('a');
            link.download = `gobinath-card-${isFlipped ? 'back' : 'front'}.${format}`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate image', err);
        }
    };

    // Capture BOTH sides for PDF download
    const downloadPDF = async () => {
        if (!hiddenFrontRef.current || !hiddenBackRef.current) return;

        try {
            // 1. Capture Front
            const frontUrl = await toPng(hiddenFrontRef.current, { pixelRatio: 3 });
            // 2. Capture Back
            const backUrl = await toPng(hiddenBackRef.current, { pixelRatio: 3 });

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [600, 350]
            });

            const imgProps = pdf.getImageProperties(frontUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Page 1: Front
            pdf.addImage(frontUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Page 2: Back
            pdf.addPage();
            pdf.addImage(backUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

            pdf.save('gobinath-digital-card-full.pdf');
        } catch (err) {
            console.error('Failed to generate PDF', err);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* --- HIDDEN BUFFER FOR PDF GENERATION --- */}
            <div className="fixed top-0 left-[-9999px] pointer-events-none opacity-0">
                <div ref={hiddenFrontRef} className="w-[600px] h-[350px] rounded-3xl overflow-hidden bg-[#09090b] border border-white/10 relative">
                    <CardFront />
                </div>
                <div ref={hiddenBackRef} className="w-[600px] h-[350px] rounded-3xl overflow-hidden bg-[#09090b] border border-white/10 relative mt-10">
                    <CardBack />
                </div>
            </div>

            {/* Card Container 3D Flip Wrapper */}
            <div className="relative w-full max-w-md aspect-[1.75/1] group perspective-1000">
                <div
                    ref={cardRef}
                    className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 select-none bg-[#09090b] border border-white/10"
                    style={{
                        transformStyle: 'preserve-3d',
                        background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)'
                    }}
                >
                    {/* Active Card Body */}
                    {/* We handle borders and backgrounds inside components now for better buffer capture */}

                    {!isFlipped ? <CardFront /> : <CardBack />}
                </div>
            </div>

            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-mono uppercase tracking-widest border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg group"
                >
                    <Repeat size={16} className="text-zinc-400 group-hover:rotate-180 transition-transform duration-500" />
                    Flip Card
                </button>

                <div className="w-px h-8 bg-zinc-800 hidden md:block" />

                <button
                    onClick={() => downloadImage('png')}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-mono uppercase tracking-widest border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    <Download size={16} className="text-cyan-400" />
                    Save {isFlipped ? 'Back' : 'Front'} (PNG)
                </button>
                <button
                    onClick={downloadPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-mono uppercase tracking-widest border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    <FileDown size={16} className="text-amber-400" />
                    Save Full Card (PDF)
                </button>
            </div>

            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono text-center max-w-sm">
                Viewing {isFlipped ? 'Back Side' : 'Front Side'} // Secure Identity Token
            </p>
        </div>
    )
}
