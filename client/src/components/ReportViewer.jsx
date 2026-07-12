import React from "react";
import { Download, Share2, Award, FileText, ChevronRight } from "lucide-react";

export default function ReportViewer({ data, onSave }) {
  if (!data) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Research link copied to clipboard!");
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const getRecBadge = (rec) => {
    switch (rec?.toUpperCase()) {
      case "BUY":
        return "bg-accent-buy/15 border-accent-buy/40 text-accent-buy";
      case "HOLD":
        return "bg-accent-hold/15 border-accent-hold/40 text-accent-hold";
      case "PASS":
        return "bg-accent-sell/15 border-accent-sell/40 text-accent-sell";
      default:
        return "bg-neutral-800 border-neutral-700 text-neutral-400";
    }
  };

  return (
    <div className="glass-panel p-8 rounded-2xl border border-panel-border shadow-2xl relative overflow-hidden" id="printable-report">
      {/* Printable CSS style tag */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          #printable-report {
            background: white !important;
            border: none !important;
            box-shadow: none !important;
            color: black !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .text-white {
            color: black !important;
          }
          .text-neutral-300, .text-neutral-400, .text-neutral-500 {
            color: #333333 !important;
          }
          .border-panel-border {
            border-color: #dddddd !important;
          }
          h1, h2, h3, h4, h5, h6 {
            color: black !important;
          }
        }
      `}</style>

      {/* Decorative top seal */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-48 bg-gradient-to-r from-primary to-accent-premium rounded-b-md" />

      {/* Report Header Controls (no-print) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-panel-border no-print">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
            Institutional Report Generator
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-panel-border hover:border-neutral-700 rounded-lg text-xs font-medium text-neutral-300 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          
          <button 
            onClick={onSave}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-panel-border hover:border-neutral-700 rounded-lg text-xs font-medium text-neutral-300 transition-colors"
          >
            <Award className="w-3.5 h-3.5" /> Save to Watchlist
          </button>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary hover:bg-primary-glow text-white text-xs font-semibold rounded-lg shadow-glow-primary transition-all duration-300"
          >
            <Download className="w-3.5 h-3.5" /> PDF / Print
          </button>
        </div>
      </div>

      {/* Report Sheet Layout */}
      <div className="space-y-8">
        {/* Document Meta */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight m-0 text-left">
              EQUITY RESEARCH REPORT
            </h1>
            <p className="text-xs text-neutral-500 font-mono tracking-wide mt-1 m-0 text-left">
              ALPHAMIND AI • GENERATED ON: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-1.5 rounded-lg border text-sm font-bold tracking-widest font-mono uppercase ${getRecBadge(data.recommendation)}`}>
              {data.recommendation}
            </div>
            <div className="px-3 py-1.5 bg-neutral-950/60 border border-panel-border rounded-lg text-left">
              <p className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono m-0">Confidence</p>
              <p className="text-xs font-bold text-white font-mono m-0">{data.confidence}%</p>
            </div>
          </div>
        </div>

        {/* Company Summary Card */}
        <div className="p-5 bg-neutral-950/60 border border-panel-border rounded-xl flex flex-col md:flex-row justify-between gap-6">
          <div className="text-left">
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Asset Profile</span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1 m-0">
              {data.company} ({data.symbol})
            </h2>
            <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-xl">
              {data.summary}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 shrink-0 text-left">
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Price</span>
              <p className="text-sm font-bold text-white font-mono mt-0.5 m-0">${data.financialData?.price}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Market Cap</span>
              <p className="text-sm font-bold text-white font-mono mt-0.5 m-0">
                {data.financialData?.marketCap >= 1e12 
                  ? `$${(data.financialData?.marketCap / 1e12).toFixed(2)}T`
                  : `$${(data.financialData?.marketCap / 1e9).toFixed(2)}B`}
              </p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Margin</span>
              <p className="text-sm font-bold text-white font-mono mt-0.5 m-0">
                {(data.financialData?.profitMargins * 100).toFixed(2)}%
              </p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Debt/Equity</span>
              <p className="text-sm font-bold text-white font-mono mt-0.5 m-0">{data.financialData?.debtToEquity}%</p>
            </div>
          </div>
        </div>

        {/* Strengths & Risks Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-5 bg-accent-buy/5 border border-accent-buy/15 rounded-xl">
            <h3 className="text-xs font-bold text-accent-buy tracking-wider uppercase font-mono mb-3">
              Investment Arguments (Strengths)
            </h3>
            <ul className="space-y-2">
              {data.strengths?.map((str, idx) => (
                <li key={idx} className="flex gap-2 text-xs leading-relaxed text-neutral-300">
                  <span className="text-accent-buy font-bold">•</span> {str}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-5 bg-accent-sell/5 border border-accent-sell/15 rounded-xl">
            <h3 className="text-xs font-bold text-accent-sell tracking-wider uppercase font-mono mb-3">
              Vulnerabilities & Risk Headwinds
            </h3>
            <ul className="space-y-2">
              {data.risks?.map((risk, idx) => (
                <li key={idx} className="flex gap-2 text-xs leading-relaxed text-neutral-300">
                  <span className="text-accent-sell font-bold">•</span> {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Analysis / Thesis */}
        <div className="text-left space-y-4">
          <h3 className="text-xs font-bold text-white tracking-widest uppercase font-mono border-b border-panel-border/50 pb-2">
            AI Fundamental Analysis & Thesis
          </h3>
          <div className="space-y-3">
            {data.analysis?.split("\n").map((line, idx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith("###")) {
                return (
                  <h4 key={idx} className="text-xs font-extrabold text-white uppercase tracking-wider mt-4">
                    {trimmed.replace(/^###\s*/, "")}
                  </h4>
                );
              }
              if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                return (
                  <li key={idx} className="text-xs text-neutral-400 ml-4 list-disc my-1">
                    {trimmed.replace(/^[\*\-]\s*/, "")}
                  </li>
                );
              }
              return trimmed ? (
                <p key={idx} className="text-xs text-neutral-400 leading-relaxed my-2">
                  {trimmed}
                </p>
              ) : null;
            })}
          </div>
        </div>

        {/* Footer Sign-off */}
        <div className="pt-8 border-t border-panel-border/30 text-center">
          <p className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
            Prepared Autonomously by AlphaMind AI Analyst Engine.
          </p>
          <p className="text-[9px] text-neutral-600 font-mono mt-1">
            Disclaimer: AI generated research and evaluation metrics are for informational purposes only. Do not treat as definitive financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
