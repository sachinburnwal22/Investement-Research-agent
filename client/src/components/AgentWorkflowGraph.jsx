import React from "react";
import { CheckCircle2, Loader2, Search, LineChart, FileText, Database, ShieldAlert, Cpu } from "lucide-react";

export default function AgentWorkflowGraph({ activeStep }) {
  const steps = [
    {
      id: "ticker",
      name: "TICKER_RESOLVER",
      desc: "Resolving asset symbol",
      icon: Search,
      log: "Agent [TickerResolver] initiated. Querying company name map...",
      successLog: "Symbol successfully resolved to ticker."
    },
    {
      id: "research",
      name: "RESEARCH_AGENT",
      desc: "Web intelligence scraping",
      icon: FileText,
      log: "Agent [ResearchAgent] active. Crawling news, files, and reports...",
      successLog: "Web research compiled successfully."
    },
    {
      id: "finance",
      name: "FINANCIAL_NODE",
      desc: "Fundamental metrics scrape",
      icon: Database,
      log: "Agent [FinancialNode] reading sheet metrics. Ingesting yahoo-finance2...",
      successLog: "Balance sheet, margins, and statistics loaded."
    },
    {
      id: "analysis",
      name: "ANALYSIS_ENGINE",
      desc: "Moat & competitive analysis",
      icon: LineChart,
      log: "Agent [AnalysisEngine] processing data. Running semantic thesis nodes...",
      successLog: "Competitive landscape and risk profiles generated."
    },
    {
      id: "decision",
      name: "DECISION_STANCE",
      desc: "Stance & score generation",
      icon: ShieldAlert,
      log: "Agent [DecisionStance] executing Zod schema. Generating structured outputs...",
      successLog: "BUY/HOLD/PASS recommendation compiled."
    },
  ];

  // Helper to determine step status
  const getStepStatus = (stepId) => {
    const stepOrder = ["ticker", "research", "finance", "analysis", "decision", "done"];
    const activeIndex = stepOrder.indexOf(activeStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < activeIndex) return "completed";
    if (stepIndex === activeIndex) return "active";
    return "idle";
  };

  // Get active step's live terminal log
  const getTerminalLog = () => {
    if (activeStep === "done") {
      return "✓ Pipeline complete. All agents resolved. Research report generated successfully.";
    }
    const current = steps.find(s => s.id === activeStep);
    return current ? `▸ ${current.log}` : "▸ Awaiting instruction...";
  };

  return (
    <div className="holo-card p-6 rounded-2xl border border-primary/20 shadow-glow-primary overflow-hidden relative select-none">
      {/* Laser Scanning Effect */}
      <div className="scanner-line" />
      
      {/* Cyber Corners */}
      <div className="cyber-corners absolute inset-0 rounded-2xl pointer-events-none" />

      {/* Futuristic Grid background */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      {/* Terminal Title */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.04] relative z-10">
        <div className="flex items-center gap-2">
          <Cpu className="w-4.5 h-4.5 text-primary-glow animate-pulse" />
          <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
            AUTONOMOUS_PIPELINE_EXECUTION_MATRIX
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 px-2.5 py-0.5 rounded bg-neutral-900 border border-white/[0.02]">
          STEP_COUNT: 05
        </span>
      </div>
      
      {/* Horizontal Pipeline Node Graph */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 mb-6">
        {steps.map((step, idx) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step Node */}
              <div className="flex flex-col items-center text-center w-full md:w-36 relative group preserve-3d">
                
                {/* Node Orb */}
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-700 relative ${
                    status === "completed"
                      ? "bg-accent-buy/15 border-accent-buy text-accent-buy shadow-glow-accent-buy scale-95"
                      : status === "active"
                      ? "bg-primary/20 border-primary-glow text-primary-glow shadow-glow-primary scale-110"
                      : "bg-neutral-950 border-neutral-900 text-neutral-600"
                  }`}
                >
                  {/* Concentric rotating dash border for active step */}
                  {status === "active" && (
                    <div className="absolute inset-[-4px] rounded-full border border-dashed border-primary-glow/60 animate-spin-slow" />
                  )}

                  <Icon className="w-5.5 h-5.5" />
                  
                  {/* Status Indicator Icon */}
                  {status === "completed" ? (
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-accent-buy fill-background" />
                    </div>
                  ) : status === "active" ? (
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border border-primary-glow">
                      <Loader2 className="w-4 h-4 text-primary-glow animate-spin" />
                    </div>
                  ) : null}
                </div>

                {/* Node Meta */}
                <div className="mt-4">
                  <h4 className={`text-[10px] font-bold tracking-widest font-mono uppercase ${
                    status === "active" ? "text-primary-glow" : status === "completed" ? "text-white" : "text-neutral-600"
                  }`}>
                    {step.name}
                  </h4>
                  <p className="text-[9px] text-neutral-500 mt-1 truncate max-w-full font-mono">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block flex-1 h-[2px] bg-neutral-950 relative z-0">
                  <div 
                    className={`absolute inset-0 transition-all duration-700 bg-gradient-to-r ${
                      status === "completed" 
                        ? "from-accent-buy to-neutral-900 w-full"
                        : status === "active"
                        ? "from-primary-glow to-neutral-900 w-1/2 animate-pulse"
                        : "w-0"
                    }`}
                  />
                  {status === "active" && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-glow animate-ping" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Cyberpunk Live Terminal Output logs */}
      <div className="relative z-10 bg-black/80 border border-white/[0.03] p-3.5 rounded-xl text-left font-mono">
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1.5 flex items-center justify-between">
          <span>Log stream console output</span>
          <span className="animate-pulse text-primary-glow">• ONLINE</span>
        </p>
        <div className="h-5 overflow-hidden">
          <p className={`text-[11px] m-0 ${activeStep === "done" ? "text-accent-buy" : "text-primary-glow"}`}>
            {getTerminalLog()}
          </p>
        </div>
      </div>
    </div>
  );
}
