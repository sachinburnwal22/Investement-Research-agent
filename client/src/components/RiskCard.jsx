import React from "react";
import { AlertTriangle } from "lucide-react";

export default function RiskCard({ risks }) {
  return (
    <div className="glass-panel p-6 rounded-2xl border border-panel-border h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-accent-sell" />
        <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
          AI-Identified Risk Vectors
        </h4>
      </div>

      <ul className="space-y-3.5">
        {risks.map((risk, index) => (
          <li key={index} className="flex items-start gap-3 text-left">
            <AlertTriangle className="w-4 h-4 text-accent-sell shrink-0 mt-0.5" />
            <span className="text-xs text-neutral-300 leading-relaxed font-sans">
              {risk}
            </span>
          </li>
        ))}
        {risks.length === 0 && (
          <div className="text-xs text-neutral-500 italic py-4">No risks identified.</div>
        )}
      </ul>
    </div>
  );
}
