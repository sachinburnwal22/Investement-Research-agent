import React, { useState } from "react";
import { Terminal, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

export default function JsonPayloadViewer({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="holo-card rounded-2xl border border-white/[0.04] overflow-hidden select-none">
      <div className="cyber-corners absolute inset-0 rounded-2xl pointer-events-none" />
      
      {/* Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-neutral-950/40 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center">
            <Terminal className="w-4.5 h-4.5 text-primary-glow" />
          </div>
          <div>
            <span className="text-xs font-bold text-white tracking-widest uppercase font-mono block">
              SYSTEM_RAW_JSON_READOUT
            </span>
            <span className="text-[9px] text-neutral-500 font-mono mt-0.5 block">
              Response payload size: {(jsonString.length / 1024).toFixed(2)} KB
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isOpen && (
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Avoid triggering accordion close
                handleCopy();
              }}
              className="p-1.5 bg-neutral-900 border border-panel-border hover:border-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
              title="Copy JSON Payload"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-accent-buy" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500" />
          )}
        </div>
      </button>

      {/* Code body */}
      {isOpen && (
        <div className="p-5 border-t border-white/[0.03] bg-black/90 font-mono text-[11px] text-primary-glow/90 overflow-x-auto max-h-[350px]">
          <pre className="text-left leading-relaxed">
            <code>{jsonString}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
