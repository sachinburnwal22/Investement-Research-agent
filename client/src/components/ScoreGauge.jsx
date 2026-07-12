import React from "react";
import { Sparkles, Shield, AlertTriangle } from "lucide-react";

export default function ScoreGauge({ score }) {
  // SVG circular path setup
  const radius = 60;
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine score colors
  const getScoreColor = (val) => {
    if (val >= 80) return { stroke: "stroke-accent-buy", text: "text-accent-buy", bg: "bg-accent-buy/5", border: "border-accent-buy/20", glow: "text-glow-green" };
    if (val >= 60) return { stroke: "stroke-accent-hold", text: "text-accent-hold", bg: "bg-accent-hold/5", border: "border-accent-hold/20", glow: "text-glow-blue" };
    return { stroke: "stroke-accent-sell", text: "text-accent-sell", bg: "bg-accent-sell/5", border: "border-accent-sell/20", glow: "text-glow-red" };
  };

  const colors = getScoreColor(score);

  return (
    <div className="holo-card p-6 rounded-2xl preserve-3d flex flex-col items-center justify-between h-full relative overflow-hidden select-none cursor-pointer">
      {/* Hologram Scanner */}
      <div className="scanner-line" />
      
      {/* Cyber Corners */}
      <div className="cyber-corners absolute inset-0 rounded-2xl pointer-events-none" />

      {/* Grid Bg */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
      
      <div className="w-full flex items-center justify-between mb-4 relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary-glow animate-pulse" />
          AI Confidence Node
        </span>
        <span className="text-[9px] font-mono text-neutral-500 px-2 py-0.5 rounded bg-neutral-900 border border-white/[0.03]">
          ACTIVE_LOG
        </span>
      </div>

      {/* SVG Circular Gauge */}
      <div className="relative flex items-center justify-center my-2 z-10">
        {/* Inner concentric ring */}
        <div className="absolute w-[80px] h-[80px] rounded-full border border-dashed border-white/[0.04] animate-spin-slow" />
        
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Outer circle track */}
          <circle
            className="stroke-neutral-950"
            fill="transparent"
            strokeWidth={strokeWidth + 2}
            r={normalizedRadius + 4}
            cx={radius}
            cy={radius}
          />
          {/* Background circle */}
          <circle
            className="stroke-neutral-900"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            className={`transition-all duration-1000 ease-out ${colors.stroke}`}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Floating Core Score Text */}
        <div className="absolute flex flex-col items-center">
          <span className={`text-4xl font-black font-mono tracking-tighter ${colors.text} ${colors.glow}`}>
            {score}%
          </span>
          <span className="text-[8px] text-neutral-500 font-mono tracking-widest uppercase">
            Strength
          </span>
        </div>
      </div>

      {/* Evaluation label */}
      <div className="mt-4 text-center w-full relative z-10">
        <div className={`p-2.5 rounded-xl border ${colors.bg} ${colors.border} flex items-center justify-center gap-2`}>
          {score >= 80 ? (
            <Shield className="w-4 h-4 text-accent-buy shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-accent-hold shrink-0" />
          )}
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${colors.text}`}>
            {score >= 80 ? "High Conviction Stance" : score >= 60 ? "Moderate Hold Stance" : "Speculative Profile"}
          </span>
        </div>
      </div>
    </div>
  );
}
