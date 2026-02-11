import React, { useState } from 'react';
import { Plus, User, Briefcase, Code2, FlaskConical, Link as LinkIcon, X, Github, Linkedin, Mail, GraduationCap, Newspaper, Image as ImageIcon, ShieldCheck, BrainCircuit, Wrench } from 'lucide-react';
import { SOCIAL_LINKS, PROFILE_IMAGE } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, onReset }) => {
  const [imgSrc, setImgSrc] = useState(PROFILE_IMAGE);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Sidebar Container - Glass Panel Style */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        w-[300px] lg:w-[320px] glass-panel border-r border-white/5 flex flex-col shrink-0
        transition-transform duration-300 ease-in-out bg-zinc-950/40
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        {/* Mobile Close Button & Header */}
        <div className="flex items-center justify-between p-5 md:hidden border-b border-white/5">
          <span className="text-base font-bold text-white">Vault Modules</span>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-zinc-400 hover:text-white border border-white/10 rounded-lg transition-colors bg-white/5"
          >
            <X size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-5">
          <button
            onClick={onReset}
            type="button"
            className="flex items-center gap-3 w-full px-5 py-3 rounded-2xl border border-white/10 hover:border-amber-500/30 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all text-left shadow-lg group backdrop-blur-sm"
          >
            <Plus size={18} className="text-zinc-400 group-hover:text-amber-400" />
            New Session
          </button>
        </div>

        {/* Navigation / History */}
        <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-none">
          <div className="mb-4 space-y-1">
            <div className="px-5 py-2 text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">Interface Logs</div>

            <NavButton icon={<User size={18} />} label="Who is Gobinath?" onClick={() => onNavigate('About')} />
            <NavButton icon={<Code2 size={18} />} label="What has been built?" onClick={() => onNavigate('Projects')} />
            <NavButton icon={<ShieldCheck size={18} />} label="What patents are filed?" onClick={() => onNavigate('Patents')} />
            <NavButton icon={<Briefcase size={18} />} label="Where has he worked?" onClick={() => onNavigate('Experience')} />
            <NavButton icon={<LinkIcon size={18} />} label="What is the technical stack?" onClick={() => onNavigate('Skills')} />
            <NavButton icon={<FlaskConical size={18} />} label="What are his publications?" onClick={() => onNavigate('Publications')} />
            <NavButton icon={<Newspaper size={18} />} label="What is the media footprint?" onClick={() => onNavigate('Media')} />
            <NavButton icon={<BrainCircuit size={18} />} label="Recent Learning: DB, MySQL" onClick={() => onNavigate('Learning')} />
            <NavButton icon={<Wrench size={18} />} label="Favorite Tools: Claude, Cursor" onClick={() => onNavigate('Tools')} />
            <NavButton icon={<ImageIcon size={18} />} label="Can I see the gallery?" onClick={() => onNavigate('Gallery')} />
            <NavButton icon={<GraduationCap size={18} />} label="What is his background?" onClick={() => onNavigate('Education')} />
            <NavButton icon={<Mail size={18} />} label="Best way to contact him?" onClick={() => onNavigate('Contact')} />
          </div>
        </div>

        {/* User / Footer */}
        <div className="border-t border-white/5 p-6 bg-zinc-900/30 backdrop-blur-md">
          <div className="flex items-center gap-4 cursor-default group">
            {!imgError ? (
              <img
                src={imgSrc}
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover shadow-lg border border-white/10 group-hover:border-amber-500/50 transition-colors"
                onError={() => {
                  setImgError(true);
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/10">
                <span className="text-xs font-bold text-white">G</span>
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <div className="text-sm text-white font-bold tracking-tight truncate uppercase">Gobinath</div>
              <div className="text-[9px] text-zinc-500 font-mono tracking-widest truncate uppercase group-hover:text-amber-400 transition-colors">Bioengineer</div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <SocialIcon href={`https://${SOCIAL_LINKS.github}`} icon={<Github size={18} />} />
            <SocialIcon href={`https://${SOCIAL_LINKS.linkedin}`} icon={<Linkedin size={18} />} />
            <SocialIcon href={`mailto:${SOCIAL_LINKS.email}`} icon={<Mail size={18} />} />
          </div>
        </div>
      </div>
    </>
  );
};

const NavButton = ({ icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
  <button
    onClick={onClick}
    type="button"
    className="flex items-center gap-4 w-full px-5 py-2.5 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white text-sm transition-all text-left group truncate border border-transparent hover:border-white/5"
  >
    <span className="text-zinc-600 group-hover:text-amber-400 transition-colors group-hover:scale-110 duration-300 shrink-0">{icon}</span>
    <span className="truncate font-light tracking-wide text-[13px]">{label}</span>
  </button>
);

const SocialIcon = ({ href, icon }: { href: string; icon: any }) => (
  <a href={href} target="_blank" className="p-2 text-zinc-500 hover:text-white transition-colors bg-white/5 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/10">
    {icon}
  </a>
);

export default Sidebar;