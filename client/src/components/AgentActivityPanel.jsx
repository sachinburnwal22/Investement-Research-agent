import React from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function AgentActivityPanel({ activeStep }) {
  const pipeline = [
    { id: "ticker", label: "Resolving Stock Ticker" },
    { id: "research", label: "Searching Company Information" },
    { id: "finance", label: "Collecting Financial Metrics" },
    { id: "analysis", label: "Evaluating Moats & Fundamentals" },
    { id: "decision", label: "Generating Recommendation Stance" }
  ];

  const getStepState = (stepId) => {
    const stepOrder = ["ticker", "research", "finance", "analysis", "decision", "done"];
    const activeIndex = stepOrder.indexOf(activeStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < activeIndex) return "completed";
    if (stepIndex === activeIndex) return "active";
    return "pending";
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-panel-border h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-primary-glow" /> AI Agent Live Reasoning
          </h4>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            LOG STREAM
          </span>
        </div>

        <div className="space-y-4">
          {pipeline.map((step, idx) => {
            const state = getStepState(step.id);
            return (
              <div 
                key={step.id} 
                className={`flex items-center gap-3.5 transition-all duration-300 ${
                  state === "active" ? "opacity-100" : state === "completed" ? "opacity-80" : "opacity-40"
                }`}
              >
                {/* Timeline Orb */}
                <div className="flex items-center justify-center shrink-0">
                  {state === "completed" ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-accent-buy" />
                  ) : state === "active" ? (
                    <Loader2 className="w-4.5 h-4.5 text-primary animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-neutral-700 bg-neutral-900" />
                  )}
                </div>

                {/* Text and Line */}
                <div className="flex-1 flex justify-between items-center text-left">
                  <span className={`text-xs ${state === "active" ? "text-primary font-medium" : "text-neutral-300"}`}>
                    {step.label}
                  </span>
                  
                  {state === "active" && (
                    <span className="text-[9px] font-mono text-primary animate-pulse bg-primary/5 px-2 py-0.5 rounded border border-primary/20">
                      THINKING
                    </span>
                  )}
                  {state === "completed" && (
                    <span className="text-[9px] font-mono text-neutral-500">
                      RESOLVED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-panel-border/30 bg-neutral-950/40 p-3 rounded-xl border border-panel-border/20 text-left">
        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
          Agent Logs Status
        </p>
        <p className="text-[11px] text-neutral-400 font-mono m-0 leading-relaxed truncate">
          {activeStep === "done" 
            ? "✓ System tasks completed. Analysis compiled." 
            : `System running task: [node.exec(${activeStep})]`}
        </p>
      </div>
    </div>
  );
}
