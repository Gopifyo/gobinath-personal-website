import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend(value);
        setValue('');
      }
    }
  };

  return (
    <div className="relative w-full glass-panel bg-zinc-900/80 rounded-2xl shadow-2xl border border-white/10 focus-within:border-cyan-500/50 focus-within:bg-zinc-900/95 transition-all duration-300">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
        rows={1}
        className="w-full m-0 w-full resize-none border-0 bg-transparent p-4 pr-12 pl-4 text-white placeholder-zinc-600 focus:ring-0 focus-visible:ring-0 md:pl-5 max-h-[200px] overflow-y-hidden text-base leading-relaxed"
        style={{ height: 'auto', minHeight: '56px' }}
        disabled={disabled}
      />
      <button 
        onClick={() => {
          if (value.trim() && !disabled) {
            onSend(value);
            setValue('');
          }
        }}
        disabled={!value.trim() || disabled}
        className="absolute bottom-2 right-2 p-2 rounded-xl text-zinc-600 hover:bg-cyan-500 hover:text-black disabled:hover:bg-transparent disabled:hover:text-zinc-700 disabled:opacity-40 transition-all duration-200"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;