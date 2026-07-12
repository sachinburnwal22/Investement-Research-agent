import React, { useState } from "react";
import { Search, Bell, Cpu, Server, Wifi } from "lucide-react";

export default function Navbar({ onSearch, isSearching }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <header className="h-16 border-b border-panel-border bg-background/60 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Quick Search */}
      <form onSubmit={handleSubmit} className="w-96 relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Analyze symbol or company name (e.g. TSLA, NVDA)..."
          className="w-full bg-neutral-900/60 border border-panel-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-primary/50 focus:shadow-glow-primary transition-all duration-300"
          disabled={isSearching}
        />
        {query.trim() && (
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-primary text-[10px] text-white rounded font-medium hover:bg-primary-glow transition-all"
            disabled={isSearching}
          >
            ENTER
          </button>
        )}
      </form>

      {/* Status Indicators & Profile */}
      <div className="flex items-center gap-6">
        {/* API Connection Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/50 border border-panel-border text-[11px] text-neutral-400">
          <Wifi className="w-3 h-3 text-emerald-500 animate-pulse" />
          <span className="font-mono text-neutral-500">API:</span>
          <span className="text-white font-medium">Local Node</span>
        </div>

        {/* AI Agent Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/50 border border-panel-border text-[11px] text-neutral-400">
          <Cpu className={`w-3.5 h-3.5 ${isSearching ? 'text-primary animate-spin' : 'text-neutral-500'}`} />
          <span className="font-mono text-neutral-500">STATUS:</span>
          <span className={`font-semibold ${isSearching ? 'text-primary' : 'text-neutral-400'}`}>
            {isSearching ? "Agent Processing" : "System Idle"}
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-neutral-500 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors">
          <Bell className="w-4.5 h-4.5" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  );
}
