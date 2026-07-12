import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, AlertCircle, TrendingUp, Shield } from "lucide-react";

export default function AIInsightCard({ title, content, type }) {
  const [isOpen, setIsOpen] = useState(true);

  // Micro Markdown-to-JSX Parser
  const parseMarkdown = (text) => {
    if (!text) return null;
    
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      
      // Empty line
      if (!trimmed) return <div key={idx} className="h-2" />;
      
      // Headers
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={idx} className="text-sm font-bold text-white tracking-wide mt-4 mb-2 first:mt-0 font-sans border-l-2 border-primary/40 pl-2">
            {trimmed.replace(/^###\s*/, "")}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={idx} className="text-base font-extrabold text-white tracking-tight mt-6 mb-3 first:mt-0 font-sans">
            {trimmed.replace(/^##\s*/, "")}
          </h3>
        );
      }
      if (trimmed.startsWith("#")) {
        return (
          <h2 key={idx} className="text-lg font-black text-white tracking-tight mt-6 mb-4 first:mt-0 font-sans">
            {trimmed.replace(/^#\s*/, "")}
          </h2>
        );
      }
      
      // Bullet points
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const cleanText = trimmed.replace(/^[\*\-]\s*/, "");
        
        // Handle bolding within bullet point e.g. **Title:** description
        const parts = cleanText.split("**");
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-neutral-300 leading-relaxed my-1.5 font-sans pl-1">
            {parts.map((part, pIdx) => 
              pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : part
            )}
          </li>
        );
      }
      
      // Standard paragraphs with bold parsing
      const parts = trimmed.split("**");
      return (
        <p key={idx} className="text-xs text-neutral-300 leading-relaxed my-2.5 font-sans text-left">
          {parts.map((part, pIdx) => 
            pIdx % 2 === 1 ? <strong key={pIdx} className="text-white font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  const getDetails = () => {
    switch (type) {
      case "advantage":
        return {
          icon: Shield,
          color: "text-primary",
          bg: "bg-primary/5",
          border: "border-primary/20",
        };
      case "growth":
        return {
          icon: TrendingUp,
          color: "text-accent-hold",
          bg: "bg-accent-hold/5",
          border: "border-accent-hold/20",
        };
      case "risks":
        return {
          icon: AlertCircle,
          color: "text-accent-sell",
          bg: "bg-accent-sell/5",
          border: "border-accent-sell/20",
        };
      default:
        return {
          icon: Sparkles,
          color: "text-primary-glow",
          bg: "bg-primary/5",
          border: "border-panel-border",
        };
    }
  };

  const { icon: Icon, color, bg, border } = getDetails();

  return (
    <div className={`glass-panel rounded-2xl border transition-all duration-300 ${border} ${isOpen ? 'pb-4' : ''}`}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bg} flex items-center justify-center border border-white/[0.02]`}>
            <Icon className={`w-4.5 h-4.5 ${color}`} />
          </div>
          <span className="text-sm font-semibold text-white tracking-wide">
            {title}
          </span>
        </div>
        <div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-500 hover:text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500 hover:text-white" />
          )}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-5 border-t border-panel-border/30 pt-4">
          <div className="space-y-1">
            {parseMarkdown(content)}
          </div>
        </div>
      )}
    </div>
  );
}
