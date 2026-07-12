import React, { useState } from "react";
import { Search, Sparkles, Cpu, TrendingUp } from "lucide-react";

export default function CompanySearch({ onSearch, isSearching }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const trending = [
    { name: "Tesla", symbol: "TSLA", subtitle: "EV & AI Leader" },
    { name: "NVIDIA", symbol: "NVDA", subtitle: "AI Compute Monopoly" },
    { name: "Apple", symbol: "AAPL", subtitle: "Hardware Ecosystem" },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      {/* Brand Header */}
      <div className="inline-flex p-3 bg-primary/10 rounded-2xl border border-primary/20 mb-6 shadow-glow-primary">
        <Cpu className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-3">
        Autonomous Research Command
      </h2>
      <p className="text-sm text-neutral-400 max-w-lg mx-auto mb-8 leading-relaxed">
        Input any company name or stock ticker. Our AI agent team will resolve the ticker, search files, fetch financial sheets, and output an institutional research grade analysis.
      </p>

      {/* Main Search Input */}
      <form onSubmit={handleSubmit} className="relative mb-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5.5 w-5.5 text-neutral-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter stock symbol or company name (e.g. TSLA, Microsoft, AAPL)..."
          className="block w-full pl-12 pr-32 py-4 bg-neutral-900/60 border border-panel-border rounded-2xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:shadow-glow-primary transition-all duration-300"
          disabled={isSearching}
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="h-full px-5 bg-gradient-to-r from-primary to-primary-glow text-white text-xs font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-primary/15"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isSearching ? "Processing..." : "Analyze"}
          </button>
        </div>
      </form>

      {/* Quick Analyze Shortcuts */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4 flex items-center justify-center gap-2">
          <TrendingUp className="w-3.5 h-3.5" /> Quick Analysis Demo
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trending.map((company) => (
            <button
              key={company.symbol}
              onClick={() => onSearch(company.symbol)}
              disabled={isSearching}
              className="glass-panel glass-panel-hover p-4 rounded-xl text-left border border-panel-border transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-800 text-primary-glow border border-neutral-700/50">
                  {company.symbol}
                </span>
                <Sparkles className="w-3 h-3 text-neutral-600 group-hover:text-primary-glow transition-colors duration-300" />
              </div>
              <h5 className="text-sm font-semibold text-white group-hover:text-primary transition-colors duration-300 m-0">
                {company.name}
              </h5>
              <p className="text-[10px] text-neutral-500 mt-1 m-0 truncate">
                {company.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
