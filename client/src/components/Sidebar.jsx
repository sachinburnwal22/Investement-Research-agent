import React from "react";
import { 
  TrendingUp, 
  Search, 
  Bookmark, 
  FileText, 
  Settings, 
  Cpu,
  LogOut
} from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Research Center", icon: Search },
    { id: "watchlist", label: "Watchlist", icon: Bookmark },
    { id: "reports", label: "Saved Reports", icon: FileText },
    { id: "settings", label: "System Config", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-background border-r border-panel-border flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-panel-border flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
        <div className="p-2 bg-primary/10 rounded-lg border border-primary/30 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-white text-lg tracking-tight font-sans m-0 p-0 text-left">
            AlphaMind <span className="text-primary">AI</span>
          </h1>
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono m-0 text-left">
            Autonomous Intel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-primary/10 text-white border border-primary/30 shadow-glow-primary"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-neutral-500 group-hover:text-neutral-300"}`} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Session / Footer */}
      <div className="p-4 border-t border-panel-border bg-neutral-950/40">
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent-premium flex items-center justify-center font-bold text-xs text-white">
            AM
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-xs font-semibold text-white truncate m-0 text-left">HedgeFund Partner</h4>
            <p className="text-[10px] text-neutral-500 truncate m-0 text-left">partner@alphamind.ai</p>
          </div>
          <button className="text-neutral-500 hover:text-white p-1 rounded-md hover:bg-neutral-900 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
