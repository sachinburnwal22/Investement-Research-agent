import React from "react";
import { DollarSign, Landmark, Percent, Receipt } from "lucide-react";

export default function FinancialCard({ label, value, type }) {
  // Format utility
  const formatValue = (val, type) => {
    if (typeof val !== "number") return val;

    switch (type) {
      case "price":
        return `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case "cap":
      case "revenue":
        if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
        if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
        if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
        return `$${val.toLocaleString()}`;
      case "margin":
        return `${(val * 100).toFixed(2)}%`;
      case "ratio":
        return `${val.toFixed(1)}%`;
      default:
        return val.toLocaleString();
    }
  };

  const getMetricDetails = () => {
    switch (type) {
      case "price":
        return {
          icon: DollarSign,
          color: "text-primary-glow",
          bg: "bg-primary/10 border-primary/20",
          desc: "Last Traded Price"
        };
      case "cap":
        return {
          icon: Landmark,
          color: "text-accent-premium",
          bg: "bg-accent-premium/10 border-accent-premium/20",
          desc: "Total Market Capitalization"
        };
      case "revenue":
        return {
          icon: Receipt,
          color: "text-neutral-300",
          bg: "bg-neutral-800/40 border-neutral-700/30",
          desc: "Twelve Months Revenue"
        };
      case "margin":
        return {
          icon: Percent,
          color: "text-accent-buy",
          bg: "bg-accent-buy/10 border-accent-buy/20",
          desc: "Operating Profit Margin"
        };
      default:
        return {
          icon: DollarSign,
          color: "text-white",
          bg: "bg-neutral-900 border-neutral-800",
          desc: "Financial Metric"
        };
    }
  };

  const { icon: Icon, color, bg, desc } = getMetricDetails();

  return (
    <div className="holo-card p-5 rounded-2xl preserve-3d overflow-hidden flex flex-col justify-between h-full select-none cursor-pointer">
      {/* Hologram Scanner Animation */}
      <div className="scanner-line" />
      
      {/* Tech Corner Brackets */}
      <div className="cyber-corners absolute inset-0 rounded-2xl pointer-events-none" />

      {/* Cyber Grid Sub-glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
            {label}
          </span>
          <div className={`p-2 rounded-lg ${bg} border flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
        </div>

        <div className={`text-2xl font-bold tracking-tight text-white font-mono ${type === 'price' ? 'text-primary-glow text-glow-blue' : ''}`}>
          {formatValue(value, type)}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] text-[9px] text-neutral-500 flex items-center justify-between relative z-10 font-mono">
        <span>{desc}</span>
        {type === "margin" && value > 0.15 && (
          <span className="text-accent-buy font-bold px-1.5 py-0.5 rounded bg-accent-buy/5 border border-accent-buy/10">
            HIGH_YIELD
          </span>
        )}
      </div>
    </div>
  );
}
