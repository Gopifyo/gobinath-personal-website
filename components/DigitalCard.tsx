
import React, { useRef } from 'react'
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, FileDown, ShieldCheck, Mail, Github, Linkedin, Globe } from 'lucide-react';
import { SOCIAL_LINKS, PROFILE_IMAGE } from '../constants';

export const DigitalCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);

    const downloadImage = async (format: 'png' | 'jpeg') => {
        if (!cardRef.current) return;

        try {
            const dataUrl = format === 'png'
                ? await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 })
                : await toJpeg(cardRef.current, { quality: 0.95, pixelRatio: 3 });

            const link = document.createElement('a');
            link.download = `gobinath-digital-card.${format}`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate image', err);
        }
    };

    const downloadPDF = async () => {
        if (!cardRef.current) return;

        try {
            const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [600, 350] // Approx business card ratio scaling
            });

            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('gobinath-digital-card.pdf');
        } catch (err) {
            console.error('Failed to generate PDF', err);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* Card Container - The part that gets captured */}
            <div
                ref={cardRef}
                className="relative w-full max-w-md aspect-[1.75/1] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#09090b] flex flex-col justify-between p-6 md:p-8 select-none group"
                style={{
                    background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)'
                }}
            >
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale" />

                {/* Content Top */}
                <div className="relative z-10 flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                            <img
                                src={PROFILE_IMAGE}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">Gobinath</h3>
                            <p className="text-xs text-amber-400 font-mono tracking-widest uppercase mb-1">Bioengineer & Founder</p>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] text-zinc-500 font-mono">Open for Collaboration</span>
                            </div>
                        </div>
                    </div>
                    <ShieldCheck className="text-zinc-700 w-8 h-8 opacity-50" />
                </div>

                {/* Content Bottom */}
                <div className="relative z-10 flex justify-between items-end mt-4">
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

                    {/* QR Code */}
                    <div className="p-2 bg-white rounded-xl shadow-lg">
                        <QRCodeCanvas
                            value={`https://${SOCIAL_LINKS.linkedin}`}
                            size={64}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                        />
                    </div>
                </div>

                {/* Holographic Border Overlay */}
                <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
                <button
                    onClick={() => downloadImage('png')}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-mono uppercase tracking-widest border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    <Download size={16} className="text-cyan-400" />
                    Save Image (PNG)
                </button>
                <button
                    onClick={downloadPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-xs font-mono uppercase tracking-widest border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    <FileDown size={16} className="text-amber-400" />
                    Save as PDF
                </button>
            </div>

            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono text-center max-w-sm">
                Secure Identity Token. Share freely to initiate contact protocol.
            </p>
        </div>
    )
}
