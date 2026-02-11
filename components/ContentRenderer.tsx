import React, { useState, useEffect } from 'react';
import { PROJECTS, EXPERIENCES, SKILLS, PUBLICATIONS, EDUCATION, MEDIA, SOCIAL_LINKS, PROFILE_IMAGE, GALLERY, PATENTS } from '../constants';
import { ExternalLink, Github, Linkedin, MapPin, ChevronRight, FileText, ArrowUpRight, Newspaper, X, Eye, BookOpen, ChevronLeft, ChevronRight as ChevronRightIcon, Download, ZoomIn, ZoomOut, User, Maximize2, ImageOff, Bot, Mail, ShieldCheck, Sparkles, Cpu, Camera, Database, Zap, Code2, Layout, Box } from 'lucide-react';
import { MediaItem, GalleryItem } from '../types';

// Premium Bio-Digital Core Replacement for Bot Icon
export const BioDigitalCore = ({ size = "w-full h-full", glowColor = "rgba(34, 211, 238, 0.5)" }) => (
  <div className={`relative ${size} flex items-center justify-center`}>
    {/* Outer Organic Membrane */}
    <div className="absolute inset-0 border border-cyan-500/30 rounded-full animate-[pulse_4s_ease-in-out_infinite] scale-90"></div>
    {/* Inner Neural Core */}
    <div className="relative w-1/2 h-1/2 bg-gradient-to-tr from-cyan-900 to-emerald-900 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.2)] animate-pulse">
      <div className="absolute inset-0 bg-white/10 rounded-full blur-sm"></div>
    </div>
    {/* Orbiting Electrons/Data Points */}
    <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></div>
    </div>
    <div className="absolute inset-0 animate-[spin_15s_linear_infinite_reverse]">
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]"></div>
    </div>
  </div>
);

export const RecentLearningSection = () => (
  <div className="space-y-8 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="group glass-card rounded-[2.5rem] p-10 hover:bg-white/5 transition-all shadow-xl overflow-hidden relative border border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Database size={80} className="text-white" />
        </div>
        <div className="px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest border bg-cyan-950/30 text-cyan-400 border-cyan-900/50 w-fit mb-8">
          Deep Dive // 2025
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">Database Architecture</h3>
        <p className="text-lg text-zinc-400 leading-relaxed font-light">
          Mastering relational modeling, indexing strategies, and high-throughput data pipelines for managing massive biological datasets.
        </p>
      </div>

      <div className="group glass-card rounded-[2.5rem] p-10 hover:bg-white/5 transition-all shadow-xl overflow-hidden relative border border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Zap size={80} className="text-white" />
        </div>
        <div className="px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest border bg-emerald-950/30 text-emerald-400 border-emerald-900/50 w-fit mb-8">
          In Progress
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-emerald-400 transition-colors">MySQL Optimization</h3>
        <p className="text-lg text-zinc-400 leading-relaxed font-light">
          Advanced query tuning and schema design to ensure milliseconds-level response times for social consumer platform backends.
        </p>
      </div>
    </div>
  </div>
);

export const FavoriteToolsSection = () => {
  const tools = [
    { name: "Google Antigravity", desc: "Advanced physics engine orchestration.", icon: <Box className="text-white" /> },
    { name: "Claude Code", desc: "Elite logic & reasoning for complex codebases.", icon: <Zap className="text-amber-500" /> },
    { name: "Cursor Agent", desc: "AI-native IDE for rapid prototype scaling.", icon: <Layout className="text-blue-400" /> },
    { name: "VS Code", desc: "The foundational environment for all vibes.", icon: <Code2 className="text-cyan-400" /> },
    { name: "ChatGPT", desc: "Strategic brainstorming and logic verification.", icon: <Sparkles className="text-emerald-400" /> },
    { name: "R Studio", desc: "Statistical depth for biological data synthesis.", icon: <Database className="text-indigo-400" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {tools.map((tool, i) => (
        <div key={i} className="group glass-card rounded-3xl p-8 hover:bg-white/5 hover:border-white/20 transition-all shadow-lg border border-white/10">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform shadow-sm group-hover:border-white/20">
            {tool.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
          <p className="text-zinc-500 text-sm font-light leading-relaxed">{tool.desc}</p>
        </div>
      ))}
    </div>
  );
};

export const AboutSection = () => {
  const imgSrc = PROFILE_IMAGE;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-2">

        {/* Left Content Block: Typography and Badges */}
        <div className="lg:col-span-7 space-y-6 lg:space-y-8 order-2 lg:order-1">
          <div className="space-y-3">
            <div className="flex flex-col">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9] uppercase transition-all duration-500 hover:tracking-tight group cursor-default drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                BIOENGINEER.<br />
                VIBE CODER.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
                  FOUNDER.
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-[1px] w-12 bg-zinc-700" />
              <p className="text-zinc-500 text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] font-bold">
                PROTOCOL VERIFIED // GOBINATH
              </p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-5 max-w-xl">
            <div className="relative border-l-2 border-cyan-500/30 pl-6">
              <p className="text-zinc-300 text-lg leading-relaxed font-light italic">
                "I build <strong className="text-white font-bold">social consumer products</strong> powered by <strong className="text-cyan-400 font-bold">automated AI workflows</strong>. My work exists at the intersection of bioprocess, tissue engineering, drug delivery and high-performance automation."
              </p>
            </div>

            <p className="text-zinc-400 text-base leading-relaxed font-light pl-6">
              Currently scaling consumer products into seamless experiences for nightlife and a hiring platform.
            </p>
          </div>

          {/* Status Badges - Properly fitted flex wrap */}
          <div className="flex flex-wrap items-center gap-3 pt-2 pl-6">
            <StatusBadge color="bg-cyan-500" text="Biotech Precision" />
            <StatusBadge color="bg-emerald-500" text="Agentic Automation" />
            <StatusBadge color="bg-blue-500" text="Consumer Product" />
          </div>
        </div>

        {/* Right Block: Circular Image Portal */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <div
            className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] aspect-square group"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 via-blue-900/30 to-emerald-900/40 rounded-full blur-[80px] opacity-60 group-hover:opacity-100 transition duration-1000"></div>

            {/* Image Circle Container */}
            <div className="relative w-full h-full rounded-full border border-white/10 glass-panel bg-white/5 backdrop-blur-3xl overflow-hidden flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10 group-hover:ring-cyan-500/30 transition-all duration-700">
              <img
                src={imgSrc}
                alt="Gobinath"
                className="w-full h-full object-cover grayscale-[20%] contrast-[110%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>

            {/* Status "ACTIVE" Pulse Dot */}
            <div className="absolute bottom-[8%] right-[8%] z-30 translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/40 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative w-10 h-10 md:w-14 md:h-14 bg-black border-[4px] md:border-[6px] border-zinc-900 rounded-full shadow-2xl flex items-center justify-center">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full opacity-100 animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ color, text }: { color: string; text: string }) => (
  <div className="glass-card bg-white/5 border border-white/10 px-4 md:px-5 py-2.5 md:py-3 rounded-2xl text-zinc-400 text-[10px] md:text-xs font-mono tracking-[0.1em] flex items-center gap-3 hover:border-white/20 hover:bg-white/10 transition-all cursor-default shadow-sm hover:shadow-md group shrink-0 uppercase">
    <div className={`w-1.5 h-1.5 rounded-full ${color} animate-pulse shadow-[0_0_12px_${color}] group-hover:scale-125 transition-transform`}></div>
    {text}
  </div>
);

export const ProjectsSection = () => (
  <div className="space-y-12 mt-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {PROJECTS.map((project, i) => (
        <div key={i} className="group relative glass-card rounded-[2.5rem] p-10 hover:bg-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full shadow-2xl border border-white/10">
          <div className="flex justify-between items-start mb-10">
            <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/30 px-4 py-2 rounded-xl border border-cyan-900/50 uppercase tracking-[0.2em]">{project.type}</span>
            {project.link && (
              <a href={project.link} target="_blank" className="text-zinc-500 hover:text-white transition-all transform hover:rotate-12">
                <ArrowUpRight size={28} />
              </a>
            )}
          </div>
          <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors leading-tight">{project.title}</h3>
          <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-light flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-zinc-500 font-mono tracking-wider uppercase group-hover:text-white transition-colors shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const PatentsSection = () => (
  <div className="space-y-8 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
    {PATENTS.map((patent, i) => (
      <div key={i} className="group relative glass-card rounded-[2.5rem] p-10 hover:bg-white/5 hover:border-emerald-500/30 transition-all duration-500 shadow-xl border border-white/10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-950/30 rounded-2xl border border-emerald-900/50 text-emerald-400">
              <ShieldCheck size={28} />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/30 px-4 py-2 rounded-xl border border-emerald-900/50 uppercase tracking-[0.2em]">Intellectual Property</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{patent.year}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight group-hover:text-emerald-400 transition-colors">{patent.title}</h3>
        <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-light">{patent.description}</p>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-sm font-mono text-amber-500 uppercase tracking-widest">{patent.status}</span>
        </div>
      </div>
    ))}
  </div>
);

export const ExperienceSection = () => (
  <div className="space-y-14 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
    {EXPERIENCES.map((exp, i) => (
      <div key={i} className="relative pl-12 border-l border-white/10 hover:border-white/30 transition-colors duration-500 group">
        <div className="absolute -left-[5px] top-0 w-[10px] h-[10px] bg-zinc-700 rounded-full ring-4 ring-black group-hover:bg-cyan-400 group-hover:scale-150 transition-all" />
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
          <div className="text-sm font-mono text-zinc-500 mt-2 uppercase tracking-widest">{exp.company} // {exp.period}</div>
        </div>
        <ul className="space-y-4">
          {exp.highlights.map((h, j) => (
            <li key={j} className="text-lg text-zinc-400 leading-relaxed flex items-start gap-5 font-light">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 mt-2.5 shrink-0 group-hover:bg-cyan-500 transition-colors" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export const EducationSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
    {EDUCATION.map((edu, i) => (
      <div key={i} className="group glass-card rounded-[2.5rem] p-10 transition-all hover:bg-white/5 hover:border-white/20 shadow-xl border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{edu.degree}</h3>
        <div className="mb-8">
          {edu.link ? (
            <a
              href={edu.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 font-mono text-xs hover:text-white inline-flex items-center gap-2 tracking-widest uppercase"
            >
              {edu.institution}
              <ExternalLink size={12} />
            </a>
          ) : (
            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">{edu.institution}</p>
          )}
        </div>
        <span className="inline-block text-[10px] bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-zinc-500 font-mono tracking-widest uppercase">
          {edu.period}
        </span>
      </div>
    ))}
  </div>
);

export const SkillsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
    {SKILLS.map((cat, i) => (
      <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 border border-white/10">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-10 border-b border-white/5 pb-6">{cat.category}</h4>
        <div className="flex flex-wrap gap-3">
          {cat.skills.map(skill => (
            <span key={skill} className="text-sm font-mono text-zinc-400 bg-white/5 px-5 py-3 rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-default border border-transparent hover:border-white/10">
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const PublicationsSection = () => (
  <div className="space-y-6 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
    {PUBLICATIONS.map((pub, i) => {
      const url = pub.link || (pub.doi ? `https://doi.org/${pub.doi}` : undefined);
      return (
        <div key={i} className="group relative flex gap-8 p-8 rounded-[2rem] glass-card hover:bg-white/5 transition-all duration-500 border border-white/10">
          <div className="shrink-0 pt-1 text-zinc-500 group-hover:text-cyan-400 transition-colors duration-500">
            <FileText size={32} />
          </div>
          <div className="flex-1 pr-12">
            <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-100 transition-colors">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                  {pub.title}
                </a>
              ) : (
                pub.title
              )}
            </h4>
            {pub.highlight && (
              <p className="text-sm text-zinc-400 font-light mb-4 italic leading-relaxed">"{pub.highlight}"</p>
            )}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
              <span className="text-zinc-400 font-bold">{pub.journal}</span>
              <span>{pub.year}</span>
              {pub.doi && <span className="opacity-40">DOI: {pub.doi.split('/')[1]}</span>}
            </div>
          </div>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="absolute top-10 right-10 text-zinc-600 hover:text-white transition-all transform hover:scale-125">
              <ArrowUpRight size={28} />
            </a>
          )}
        </div>
      );
    })}
  </div>
);

const GalleryThumbnail: React.FC<{ item: GalleryItem; onClick: () => void }> = ({ item, onClick }) => {
  const [imgSrc, setImgSrc] = useState(item.imageUrl);
  const [error, setError] = useState(false);

  return (
    <div
      className="group relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 glass-card bg-white/5 cursor-pointer shadow-xl"
      onClick={!error ? onClick : undefined}
    >
      {!error ? (
        <img
          src={imgSrc}
          alt={item.title}
          onError={() => {
            setError(true);
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 grayscale-[50%] group-hover:grayscale-0"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-white/5">
          <ImageOff size={28} className="text-zinc-600 mb-3" />
          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Archive Link Missing</p>
        </div>
      )}

      {!error && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <p className="text-cyan-400 text-[10px] font-mono uppercase tracking-[0.4em] mb-2">{item.category}</p>
          <h4 className="text-white font-bold text-lg leading-tight">{item.title}</h4>
        </div>
      )}
    </div>
  );
};

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const handleClose = () => setSelectedImage(null);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
        {GALLERY.map((item) => (
          <GalleryThumbnail key={item.id} item={item} onClick={() => setSelectedImage(item)} />
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={handleClose} />
          <div className="relative z-10 max-w-5xl w-full flex flex-col items-center animate-in zoom-in-95 duration-500">
            <button onClick={handleClose} className="fixed top-6 right-6 z-[110] p-3 text-white/80 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md border border-white/10">
              <X size={32} />
            </button>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 bg-black">
              <img src={selectedImage.imageUrl} alt={selectedImage.title} className="max-h-[75vh] w-auto object-contain" />
            </div>
            <div className="mt-10 text-center max-w-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">{selectedImage.title}</h3>
              <p className="text-zinc-400 text-lg font-light leading-relaxed">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const MediaSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
    {MEDIA.map((item, i) => (
      <div key={i} className="group relative flex flex-col rounded-[2.5rem] glass-card hover:bg-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl border border-white/10">
        <div className="relative h-56 w-full overflow-hidden bg-white/5 border-b border-white/10">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale-[50%] group-hover:grayscale-0" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><Newspaper size={48} className="text-zinc-700" /></div>
          )}
          <div className="absolute top-6 left-6">
            <span className="text-[10px] font-mono font-bold text-black bg-white/90 px-4 py-2 rounded-xl shadow-2xl uppercase tracking-widest">{item.type}</span>
          </div>
        </div>
        <div className="p-10 flex-1 flex flex-col">
          <div className="text-[10px] text-zinc-500 font-mono mb-4 flex items-center gap-3 tracking-[0.2em] uppercase">
            <span>{item.source}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
            <span>{item.date}</span>
          </div>
          <h4 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-cyan-400 transition-colors">{item.title}</h4>
          {item.description && <p className="text-base text-zinc-400 leading-relaxed mb-10 font-light line-clamp-3">{item.description}</p>}
          <div className="mt-auto">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex w-full py-4 rounded-2xl bg-white text-black hover:bg-cyan-400 font-bold transition-all items-center justify-center gap-3 group/btn shadow-xl border border-white/10 text-sm">
              Launch Source <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const ContactSection = () => (
  <div className="mt-10 p-16 glass-panel rounded-[3rem] border border-white/10 text-center animate-in fade-in slide-in-from-bottom-6 duration-700 shadow-2xl bg-gradient-to-br from-white/5 to-transparent">
    <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">Direct Synchronization</h3>
    <p className="text-zinc-400 mb-12 text-xl font-light max-w-xl mx-auto leading-relaxed">The best way to reach out for high-impact collaborations, product ventures, or deep-tech research.</p>
    <div className="flex flex-col md:flex-row justify-center gap-6">
      <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex-1 px-8 py-5 bg-white text-black hover:bg-cyan-400 rounded-[1.5rem] text-lg font-black transition-all shadow-xl hover:scale-105 active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3">
        <Mail size={22} /> Email Protocol
      </a>
      <a href={`https://${SOCIAL_LINKS.linkedin}`} target="_blank" className="flex-1 px-8 py-5 bg-[#0077b5] hover:bg-[#00a0dc] text-white rounded-[1.5rem] text-lg font-black transition-all shadow-xl hover:scale-105 active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3">
        <Linkedin size={22} /> LinkedIn Sync
      </a>
      <a href={`https://${SOCIAL_LINKS.github}`} target="_blank" className="flex-1 px-8 py-5 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-[1.5rem] text-lg font-black transition-all flex items-center justify-center gap-4 hover:border-white/40 uppercase tracking-widest backdrop-blur-md">
        <Github size={22} /> Access Git
      </a>
    </div>
  </div>
);