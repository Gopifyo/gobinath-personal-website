import React, { useRef, useState } from 'react'
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, FileDown, Repeat, Rocket } from 'lucide-react';
import { CardTheme, CARD_THEMES } from '../types/card';
import { CardFront } from './card/CardFront';
import { CardBack } from './card/CardBack';

export const DigitalCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const hiddenFrontRef = useRef<HTMLDivElement>(null);
    const hiddenBackRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [activeTheme, setActiveTheme] = useState<CardTheme>(CARD_THEMES[0]);

    // Capture currently visible side for image download
    const downloadImage = async (format: 'png' | 'jpeg') => {
        if (!cardRef.current) return;
        try {
            const dataUrl = format === 'png'
                ? await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 })
                : await toJpeg(cardRef.current, { quality: 0.95, pixelRatio: 3 });

            const link = document.createElement('a');
            link.download = `gobinath-${activeTheme.id}-${isFlipped ? 'back' : 'front'}.${format}`;
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
            const frontUrl = await toPng(hiddenFrontRef.current, { pixelRatio: 3 });
            const backUrl = await toPng(hiddenBackRef.current, { pixelRatio: 3 });

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [600, 350]
            });

            const imgProps = pdf.getImageProperties(frontUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(frontUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.addPage();
            pdf.addImage(backUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

            pdf.save(`gobinath-${activeTheme.id}-card-full.pdf`);
        } catch (err) {
            console.error('Failed to generate PDF', err);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* --- HIDDEN BUFFER FOR PDF GENERATION --- */}
            <div className="fixed top-0 left-[-9999px] pointer-events-none opacity-0">
                <div ref={hiddenFrontRef} className={`w-[600px] h-[350px] rounded-3xl overflow-hidden border border-white/10 relative ${activeTheme.bg}`}>
                    <CardFront theme={activeTheme} />
                </div>
                <div ref={hiddenBackRef} className={`w-[600px] h-[350px] rounded-3xl overflow-hidden border border-white/10 relative mt-10 ${activeTheme.bg}`}>
                    <CardBack theme={activeTheme} />
                </div>
            </div>

            {/* Theme Selector UI */}
            <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase">Personalize your token</p>
                <div className="relative group w-full max-w-xs transition-all">
                    <select
                        value={activeTheme.id}
                        onChange={(e) => {
                            const theme = CARD_THEMES.find(t => t.id === e.target.value);
                            if (theme) setActiveTheme(theme);
                        }}
                        className="w-full appearance-none bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all cursor-pointer hover:bg-zinc-800 uppercase tracking-widest shadow-xl"
                    >
                        {CARD_THEMES.map(theme => (
                            <option key={theme.id} value={theme.id} className="bg-zinc-900 text-zinc-400 py-4">
                                {theme.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-cyan-400 transition-colors">
                        <Rocket size={14} className="animate-pulse" />
                    </div>
                </div>
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider italic">
                    Current: {activeTheme.description}
                </p>
            </div>

            {/* Card Container 3D Flip Wrapper */}
            <div className="relative w-full max-w-md aspect-[1.75/1] group perspective-1000">
                <div
                    ref={cardRef}
                    className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 select-none border border-white/10"
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {!isFlipped ? <CardFront theme={activeTheme} /> : <CardBack theme={activeTheme} />}
                </div>
            </div>

            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-xs font-mono uppercase tracking-widest border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg group"
                >
                    <Repeat size={16} className="text-zinc-600 group-hover:rotate-180 transition-transform duration-500" />
                    Flip Card
                </button>

                <div className="w-px h-8 bg-zinc-800 hidden md:block" />

                <button
                    onClick={() => downloadImage('png')}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-xs font-mono uppercase tracking-widest border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    <Download size={16} className="text-cyan-500" />
                    Save Image
                </button>
                <button
                    onClick={downloadPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-xs font-mono uppercase tracking-widest border border-white/10 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    <FileDown size={16} className="text-amber-500" />
                    Save PDF
                </button>
            </div>

            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono text-center max-w-sm">
                Viewing {isFlipped ? 'Back Side' : 'Front Side'} // {activeTheme.name}
            </p>
        </div>
    )
}
