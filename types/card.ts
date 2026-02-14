export interface CardTheme {
    id: string;
    name: string;
    bg: string;
    accent: string;
    glow: string;
    text: string;
    description: string;
    isFlat?: boolean;
    style?: 'modern' | 'cartoon' | 'retro' | 'sketch';
}

export const CARD_THEMES: CardTheme[] = [
    { id: 'midnight', name: 'Midnight protocol', bg: 'bg-[#09090b]', accent: 'text-amber-400', glow: 'bg-cyan-500/10', text: 'text-zinc-400', description: 'Default bio-digital aesthetic', style: 'modern' },
    { id: 'minimal-white', name: 'Pure Paper', bg: 'bg-white', accent: 'text-zinc-900', glow: 'bg-zinc-100', text: 'text-zinc-500', description: 'Simple, flat, and clean', isFlat: true, style: 'modern' },
    { id: 'minimal-dark', name: 'Ink Black', bg: 'bg-[#0a0a0a]', accent: 'text-zinc-100', glow: 'bg-zinc-900', text: 'text-zinc-500', description: 'Minimalist dark mode', isFlat: true, style: 'modern' },
    { id: 'cartoon-bold', name: 'Pop Art Bloom', bg: 'bg-yellow-400', accent: 'text-black', glow: 'bg-pink-500', text: 'text-black/60', description: 'Bold colors & cartoon vibes', style: 'cartoon', isFlat: true },
    { id: 'funny-glitch', name: 'Rainbow Glitch', bg: 'bg-zinc-900', accent: 'text-cyan-400', glow: 'bg-red-500/20', text: 'text-zinc-400', description: 'Playful distortion', style: 'cartoon' },
    { id: 'pixel-quest', name: '8-Bit Hero', bg: 'bg-[#1a1a1a]', accent: 'text-emerald-400', glow: 'bg-green-500/10', text: 'text-zinc-500', description: 'Retro gaming aesthetic', style: 'retro' },
    { id: 'sketch-book', name: 'Sketchbook', bg: 'bg-[#fdf6e3]', accent: 'text-blue-600', glow: 'bg-stone-200', text: 'text-stone-500', description: 'Hand-drawn feel', style: 'sketch', isFlat: true },
    { id: 'comic-panel', name: 'Comic Book', bg: 'bg-white', accent: 'text-red-600', glow: 'bg-yellow-400', text: 'text-zinc-800', description: 'Classic comic aesthetics', style: 'cartoon', isFlat: true },
    { id: 'blueprint', name: 'Blueprint Grid', bg: 'bg-[#0a0a0a]', accent: 'text-blue-500', glow: 'bg-blue-400/10', text: 'text-blue-300/60', description: 'Technical schematic style', style: 'modern' },
    { id: 'aura', name: 'Identity Aura', bg: 'bg-[#030712]', accent: 'text-violet-400', glow: 'bg-violet-500/20', text: 'text-violet-300/40', description: 'Soft ethereal glowing aura', style: 'modern' },
];
