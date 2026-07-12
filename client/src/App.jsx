import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import CompanySearch from "./components/CompanySearch";
import AgentWorkflowGraph from "./components/AgentWorkflowGraph";
import FinancialCard from "./components/FinancialCard";
import ScoreGauge from "./components/ScoreGauge";
import RiskCard from "./components/RiskCard";
import StrengthCard from "./components/StrengthCard";
import AIInsightCard from "./components/AIInsightCard";
import StockChart from "./components/StockChart";
import ReportViewer from "./components/ReportViewer";
import AgentActivityPanel from "./components/AgentActivityPanel";
import MarketSentiment from "./components/MarketSentiment";
import JsonPayloadViewer from "./components/JsonPayloadViewer";
import { analyzeCompany } from "./services/api";

import { 
  Cpu, 
  Database, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  Award,
  BookOpen, 
  Eye, 
  RefreshCw,
  Search,
  Bookmark,
  Bell,
  Trash2
} from "lucide-react";

function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState("landing");
  
  // Research Flow State
  const [searchSymbol, setSearchSymbol] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeStep, setActiveStep] = useState("ticker"); // ticker | research | finance | analysis | decision | done
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Watchlist & Saved Reports State (Persisted in LocalStorage)
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("alphamind_watchlist");
    return saved ? JSON.parse(saved) : ["TSLA", "AAPL", "NVDA"];
  });

  const [savedReports, setSavedReports] = useState(() => {
    const saved = localStorage.getItem("alphamind_reports");
    return saved ? JSON.parse(saved) : [];
  });

  // Settings State
  const [settings, setSettings] = useState({
    apiUrl: "http://localhost:5000",
    modelName: "gemini-3.5-flash",
    temperature: 0.3,
    useAgentCache: true,
  });

  // Sync state to localstorage
  useEffect(() => {
    localStorage.setItem("alphamind_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("alphamind_reports", JSON.stringify(savedReports));
  }, [savedReports]);

  // Main search/analysis execution
  const handleSearch = async (symbol) => {
    if (!symbol) return;
    
    setSearchSymbol(symbol.toUpperCase());
    setIsSearching(true);
    setErrorMsg("");
    setAnalysisResult(null);
    setActiveTab("dashboard");

    // Simulate Agent Step Progression for visual wow factor
    const steps = ["ticker", "research", "finance", "analysis", "decision"];
    let stepIdx = 0;
    
    const interval = setInterval(() => {
      if (stepIdx < steps.length - 1) {
        stepIdx++;
        setActiveStep(steps[stepIdx]);
      }
    }, 700);

    try {
      const data = await analyzeCompany(symbol);
      clearInterval(interval);
      setActiveStep("done");
      setAnalysisResult(data);
      
      // Auto add to watchlist if not present
      if (!watchlist.includes(data.symbol)) {
        setWatchlist((prev) => [...prev, data.symbol]);
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setErrorMsg(err.message || "Failed to analyze asset. Please check network connection.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleDemo = () => {
    handleSearch("TSLA");
  };

  const handleSaveReport = () => {
    if (!analysisResult) return;
    
    // Check if already saved
    if (savedReports.some(r => r.symbol === analysisResult.symbol)) {
      alert("Report already saved in your files.");
      return;
    }

    setSavedReports((prev) => [
      {
        ...analysisResult,
        savedAt: new Date().toISOString(),
      },
      ...prev
    ]);
    alert(`Report for ${analysisResult.symbol} saved successfully!`);
  };

  const handleRemoveReport = (symbolToDelete) => {
    setSavedReports((prev) => prev.filter(r => r.symbol !== symbolToDelete));
  };

  const handleRemoveWatchlist = (symbolToDelete) => {
    setWatchlist((prev) => prev.filter(s => s !== symbolToDelete));
  };

  return (
    <div className="min-h-screen bg-background text-neutral-300 flex select-none">
      
      {/* 1. Landing Page View (Hero section) */}
      {activeTab === "landing" ? (
        <div className="relative w-full overflow-hidden flex flex-col justify-between min-h-screen">
          {/* Neon mesh grids */}
          <div className="absolute inset-0 grid-bg opacity-10 z-0" />
          <div className="absolute inset-0 radial-mask z-0" />
          
          {/* Header */}
          <header className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight font-sans">
                AlphaMind <span className="text-primary">AI</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveTab("dashboard")}
                className="text-xs font-mono font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Access Terminal
              </button>
              <button 
                onClick={() => handleSearch("NVDA")}
                className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl text-xs font-semibold text-white hover:bg-primary/20 transition-all duration-300"
              >
                Launch Console
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <main className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20 flex-1 flex flex-col justify-center">
            {/* Animated particles */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent-premium/5 rounded-full blur-3xl animate-pulse-slow" />

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-panel-border text-xs text-neutral-400 mb-8 mx-auto shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-primary-glow animate-pulse" />
              <span className="font-mono text-[10px] tracking-wide text-neutral-500 uppercase">Brand Identity:</span>
              <span className="text-white font-semibold tracking-wider font-mono">AlphaMind AI v1.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] mb-6 font-sans">
              Your AI-Powered <br />
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent-premium bg-clip-text text-transparent">
                Investment Research Analyst
              </span>
            </h1>

            <p className="text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Analyze companies, discover opportunities, evaluate risks, and generate institutional-grade investment reports using autonomous AI agents.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setActiveTab("dashboard")}
                className="px-8 py-4 bg-primary hover:bg-primary-glow text-white text-sm font-semibold rounded-2xl shadow-glow-primary hover:scale-[1.02] transition-all duration-300"
              >
                Start Research
              </button>
              <button 
                onClick={handleDemo}
                className="px-8 py-4 bg-neutral-900 border border-panel-border hover:border-neutral-700 text-neutral-300 text-sm font-semibold rounded-2xl hover:bg-neutral-800/50 transition-colors"
              >
                View Demo (TSLA)
              </button>
            </div>

            {/* Floating Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
              {[
                { title: "AI Research Agent", desc: "Scours files & live news feed for competitive insights", icon: Search },
                { title: "Financial Intelligence", desc: "Aggregates key fundamental data sheets autonomously", icon: Database },
                { title: "Risk Analysis Node", desc: "Calculates balance health and market headwinds", icon: ShieldAlert },
                { title: "Recommendation Engine", desc: "Formulates structural BUY/HOLD/PASS signals", icon: Award },
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="glass-panel p-5 rounded-2xl border border-panel-border text-left hover:border-neutral-800 transition-all duration-300">
                    <div className="p-2.5 bg-neutral-950/60 rounded-xl border border-white/[0.02] inline-flex mb-4">
                      <Icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-2">{feat.title}</h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed m-0">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </main>

          {/* Footer */}
          <footer className="relative z-10 py-8 px-6 text-center border-t border-white/[0.02]">
            <p className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">
              Autonomous Investment Intelligence © 2026. ALPHAMIND LABS.
            </p>
          </footer>
        </div>
      ) : (
        
        // 2. Application Core Shell
        <div className="w-full flex h-screen overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Right Main Container */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#050505] relative">
            <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none" />
            
            {/* Top Navigation */}
            <Navbar onSearch={handleSearch} isSearching={isSearching} />

            {/* Scrollable Work area */}
            <main className="flex-1 overflow-y-auto px-8 py-6 relative z-10">
              
              {/* DASHBOARD TAB */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Default State: No Active Search */}
                  {!isSearching && !analysisResult && !errorMsg && (
                    <div className="py-12">
                      <CompanySearch onSearch={handleSearch} isSearching={isSearching} />
                    </div>
                  )}

                  {/* Processing / Loading State */}
                  {isSearching && (
                    <div className="space-y-6 animate-pulse">
                      <h3 className="text-sm font-semibold font-mono uppercase tracking-widest text-neutral-500 text-left">
                        Agent Pipeline Processing: {searchSymbol}
                      </h3>
                      {/* Interactive Agent Graph */}
                      <AgentWorkflowGraph activeStep={activeStep} />
                      
                      {/* Loading Skeletons */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-32 bg-neutral-900/50 border border-panel-border rounded-2xl" />
                        ))}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="h-64 bg-neutral-900/50 border border-panel-border rounded-2xl md:col-span-2" />
                        <div className="h-64 bg-neutral-900/50 border border-panel-border rounded-2xl" />
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {errorMsg && (
                    <div className="max-w-md mx-auto py-12 px-6 glass-panel rounded-2xl border border-accent-sell/30 text-center">
                      <ShieldAlert className="w-12 h-12 text-accent-sell mx-auto mb-4" />
                      <h3 className="text-base font-bold text-white mb-2">Research Operation Failed</h3>
                      <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                        {errorMsg}
                      </p>
                      <button 
                        onClick={() => handleSearch(searchSymbol)}
                        className="px-4 py-2 bg-neutral-900 border border-panel-border hover:border-neutral-700 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 mx-auto transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Retry Request
                      </button>
                    </div>
                  )}

                  {/* Completed State: Show analysis dashboard */}
                  {!isSearching && analysisResult && (
                    <div className="space-y-6">
                      
                      {/* Dashboard Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-panel-border/40">
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary-glow">
                              {analysisResult.symbol}
                            </span>
                            <span className="text-xs font-mono text-neutral-500">Asset Profile resolved</span>
                          </div>
                          <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                            {analysisResult.company} Analysis Command
                          </h2>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleSaveReport}
                            className="px-4 py-2 bg-neutral-900 border border-panel-border hover:border-neutral-700 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm transition-colors"
                          >
                            <Award className="w-3.5 h-3.5 text-accent-premium" />
                            Save Report
                          </button>
                          <button
                            onClick={() => handleSearch(analysisResult.symbol)}
                            className="px-4 py-2 bg-neutral-900 border border-panel-border hover:border-neutral-700 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Re-Run Agents
                          </button>
                        </div>
                      </div>

                      {/* Step Completed Graph */}
                      <AgentWorkflowGraph activeStep="done" />

                      {/* Main Workspace Panels Layout */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Left column: Key Metrics & Gauge */}
                        <div className="space-y-6 md:col-span-2">
                          {/* Circular Gauge, Stance and Sentiment */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <ScoreGauge score={analysisResult.confidence} />
                            
                            {/* Recommendation Card */}
                            <div className="holo-card p-6 rounded-2xl preserve-3d flex flex-col justify-between text-left relative overflow-hidden h-full cursor-pointer">
                              <div className="scanner-line" />
                              <div className="cyber-corners absolute inset-0 rounded-2xl pointer-events-none" />
                              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.01] rounded-full blur-3xl pointer-events-none" />
                              <div>
                                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-3">
                                  Target Stance Signal
                                </span>
                                <h3 className={`text-5xl font-black tracking-tight font-mono ${
                                  analysisResult.recommendation === "BUY" ? "text-accent-buy text-glow-green" : analysisResult.recommendation === "HOLD" ? "text-accent-hold text-glow-blue" : "text-accent-sell text-glow-red"
                                }`}>
                                  {analysisResult.recommendation}
                                </h3>
                              </div>
                              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[9px] font-mono text-neutral-500 flex items-center justify-between">
                                <span>Recommendation Node</span>
                                <span className="text-white font-bold">{analysisResult.recommendation === "BUY" ? "ACCUMULATE" : analysisResult.recommendation === "HOLD" ? "STANDBY" : "LIQUIDATE"}</span>
                              </div>
                            </div>

                            {/* Market Sentiment Dial */}
                            <MarketSentiment companyData={analysisResult} />
                          </div>

                          {/* Financials Sheet Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <FinancialCard label="Price" value={analysisResult.financialData?.price} type="price" />
                            <FinancialCard label="Market Cap" value={analysisResult.financialData?.marketCap} type="cap" />
                            <FinancialCard label="Revenue" value={analysisResult.financialData?.revenue} type="revenue" />
                            <FinancialCard label="Operating Margin" value={analysisResult.financialData?.profitMargins} type="margin" />
                          </div>

                          {/* Charts view */}
                          <StockChart companyData={analysisResult} />

                          {/* Expansion AI Insights */}
                          <div className="space-y-4">
                            <AIInsightCard 
                              title="Competitive Advantage & Moat" 
                              content={analysisResult.analysis?.split("### Competitive Advantage & Moat")[1]?.split("###")[0]?.trim() || "Defensive moat derived from high brand value and localized ecosystem hooks."}
                              type="advantage"
                            />
                            <AIInsightCard 
                              title="Growth Catalyst Opportunities" 
                              content={analysisResult.analysis?.split("### Growth Catalyst Opportunities")[1]?.split("###")[0]?.trim() || "Expansion in localized software offerings and service subscriptions."}
                              type="growth"
                            />
                          </div>
                        </div>

                        {/* Right column: Live Reasoning Logs & Strengths/Risks */}
                        <div className="space-y-6">
                          <AgentActivityPanel activeStep="done" />
                          
                          {/* Two Column Strengths and Risks */}
                          <StrengthCard strengths={analysisResult.strengths || []} />
                          <RiskCard risks={analysisResult.risks || []} />
                        </div>
                      </div>

                      {/* PDF Printable report */}
                      <div className="pt-8">
                        <h3 className="text-sm font-semibold font-mono uppercase tracking-widest text-neutral-500 mb-4 text-left">
                          Full Equity Research Document
                        </h3>
                        <ReportViewer data={analysisResult} onSave={handleSaveReport} />
                      </div>

                      {/* System JSON Payload Readout */}
                      <div className="pt-8 text-left">
                        <JsonPayloadViewer data={analysisResult} />
                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* WATCHLIST TAB */}
              {activeTab === "watchlist" && (
                <div className="space-y-6">
                  <div className="text-left pb-4 border-b border-panel-border/40">
                    <h2 className="text-2xl font-black text-white tracking-tight">Watchlist Registry</h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Quick access to assets monitored by AlphaMind AI nodes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {watchlist.map((symbol) => (
                      <div key={symbol} className="glass-panel p-5 rounded-2xl border border-panel-border flex flex-col justify-between text-left relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-lg font-bold text-white font-mono">{symbol}</span>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono mt-0.5">Asset Registry</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveWatchlist(symbol)}
                            className="p-1.5 text-neutral-500 hover:text-accent-sell hover:bg-neutral-900 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleSearch(symbol)}
                            className="flex-1 py-2 bg-primary/10 border border-primary/20 hover:bg-primary/20 rounded-xl text-center text-xs font-semibold text-primary-glow transition-colors"
                          >
                            Analyze Now
                          </button>
                        </div>
                      </div>
                    ))}
                    {watchlist.length === 0 && (
                      <div className="text-sm text-neutral-500 italic py-12 text-center col-span-3">
                        No assets in watchlist. Start a search to monitor companies!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* REPORTS TAB */}
              {activeTab === "reports" && (
                <div className="space-y-6">
                  <div className="text-left pb-4 border-b border-panel-border/40">
                    <h2 className="text-2xl font-black text-white tracking-tight">Saved Equity Reports</h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Access previously generated, institutional-grade equity reports.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {savedReports.map((report) => (
                      <div key={report.symbol} className="glass-panel p-5 rounded-2xl border border-panel-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white font-mono">{report.symbol}</span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              Saved on: {new Date(report.savedAt).toLocaleString()}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold text-neutral-400 mt-1">{report.company}</h4>
                          <p className="text-[11px] text-neutral-500 mt-2 truncate max-w-xl">{report.summary}</p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setAnalysisResult(report);
                              setActiveTab("dashboard");
                            }}
                            className="px-3 py-1.5 bg-neutral-900 border border-panel-border hover:border-neutral-700 text-neutral-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                          
                          <button
                            onClick={() => handleRemoveReport(report.symbol)}
                            className="p-1.5 text-neutral-500 hover:text-accent-sell hover:bg-neutral-900 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {savedReports.length === 0 && (
                      <div className="text-sm text-neutral-500 italic py-12 text-center">
                        No reports saved. Run an analysis and save it to review later!
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === "settings" && (
                <div className="space-y-6 max-w-xl text-left">
                  <div className="pb-4 border-b border-panel-border/40">
                    <h2 className="text-2xl font-black text-white tracking-tight">System Configuration</h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      Configure AlphaMind AI operational node addresses and parameters.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* API Endpoint Address */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Operational Node Base URL
                      </label>
                      <input
                        type="text"
                        value={settings.apiUrl}
                        onChange={(e) => setSettings({ ...settings, apiUrl: e.target.value })}
                        className="block w-full px-4 py-3 bg-neutral-900/60 border border-panel-border rounded-xl text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    {/* LLM Model Target */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Target LLM Model Node
                      </label>
                      <select
                        value={settings.modelName}
                        onChange={(e) => setSettings({ ...settings, modelName: e.target.value })}
                        className="block w-full px-4 py-3 bg-neutral-900 border border-panel-border rounded-xl text-white text-xs focus:outline-none focus:border-primary/50 transition-colors"
                      >
                        <option value="gemini-3.5-flash">Gemini 3.5 Flash (Default)</option>
                        <option value="gemini-3.0-pro">Gemini 3.0 Pro</option>
                        <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                      </select>
                    </div>

                    {/* LLM Temperature */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                          Agent Creativity (Temperature)
                        </label>
                        <span className="text-xs font-mono text-primary font-bold">{settings.temperature}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={settings.temperature}
                        onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                        className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>

                    {/* Settings Toggles */}
                    <div className="flex items-center justify-between p-4 bg-neutral-950/60 border border-panel-border rounded-xl">
                      <div>
                        <h5 className="text-xs font-bold text-white m-0">Enable Node Caching</h5>
                        <p className="text-[10px] text-neutral-500 m-0 mt-0.5">Use cached metrics to speed up agent queries</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.useAgentCache}
                        onChange={(e) => setSettings({ ...settings, useAgentCache: e.target.checked })}
                        className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 accent-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
