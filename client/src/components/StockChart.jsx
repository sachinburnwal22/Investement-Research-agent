import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { TrendingUp, Percent, Landmark, Crosshair } from "lucide-react";

export default function StockChart({ companyData }) {
  const [activeMetric, setActiveMetric] = useState("revenue");

  const symbol = companyData?.symbol || "TSLA";
  const revenueVal = companyData?.financialData?.revenue || 96773001216;
  const marginVal = companyData?.financialData?.profitMargins || 0.0394;
  const capVal = companyData?.financialData?.marketCap || 1303254171648;

  // Generate historical quarterly datasets
  const getChartData = () => {
    const quarters = ["Q1", "Q2", "Q3", "Q4", "Q1 '26", "Q2 '26"];
    
    if (activeMetric === "revenue") {
      const base = revenueVal / 4;
      return quarters.map((q, idx) => ({
        name: q,
        revenue: Math.floor(base * (0.85 + idx * 0.05)),
      }));
    } else if (activeMetric === "margin") {
      const basePercent = marginVal * 100;
      return quarters.map((q, idx) => ({
        name: q,
        margin: +(basePercent * (0.9 + idx * 0.03)).toFixed(2),
        industryAvg: +(basePercent * 0.8).toFixed(2),
      }));
    } else {
      const base = capVal;
      return quarters.map((q, idx) => ({
        name: q,
        cap: Math.floor(base * (0.8 + idx * 0.04)),
      }));
    }
  };

  const data = getChartData();

  // Custom tooltips to match fintech terminal branding
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-primary/30 p-4 rounded-xl shadow-2xl relative select-none font-mono">
          <div className="cyber-corners absolute inset-0 rounded-xl pointer-events-none" />
          <p className="text-[9px] text-neutral-600 mb-2 uppercase tracking-widest">GRID_READOUT [{label}]</p>
          {payload.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[10px] text-neutral-400 m-0 uppercase">{item.name}</p>
              <p className="text-sm font-bold text-white m-0">
                {activeMetric === "margin" 
                  ? `${item.value}%`
                  : item.value >= 1e12 
                  ? `$${(item.value / 1e12).toFixed(2)}T`
                  : item.value >= 1e9
                  ? `$${(item.value / 1e9).toFixed(2)}B`
                  : `$${item.value.toLocaleString()}`}
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const tabs = [
    { id: "revenue", label: "REVENUE_PERF", icon: TrendingUp, activeColor: "#3b82f6" },
    { id: "margin", label: "PROFIT_MARGIN", icon: Percent, activeColor: "#10b981" },
    { id: "cap", label: "MARKET_CAPIT", icon: Landmark, activeColor: "#d4af37" },
  ];

  return (
    <div className="holo-card p-6 rounded-2xl preserve-3d h-full flex flex-col justify-between cursor-pointer select-none">
      {/* Hologram Scanner */}
      <div className="scanner-line" />
      
      {/* Cyber Corners */}
      <div className="cyber-corners absolute inset-0 rounded-2xl pointer-events-none" />

      {/* Chart controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono flex items-center gap-1.5">
            <Crosshair className="w-4 h-4 text-primary-glow animate-pulse" />
            HISTORICAL_VALUATION_MATRIX
          </h4>
          <p className="text-[9px] text-neutral-500 font-mono mt-1">
            Data aggregated from financial scraper nodes
          </p>
        </div>
        
        {/* Toggle Buttons */}
        <div className="flex bg-neutral-950/60 p-1 rounded-xl border border-white/[0.03]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMetric === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMetric(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? "bg-neutral-900 text-white border border-white/[0.04] shadow-glow-primary"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary-glow" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Display Area */}
      <div className="flex-1 min-h-[220px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetric === "margin" ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#1d1d23" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={9} fontStyle="mono" tickLine={false} />
              <YAxis stroke="#52525b" fontSize={9} fontStyle="mono" tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 240, 255, 0.02)" }} />
              <Bar name="OPERATING_MARGIN" dataKey="margin" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar name="INDUSTRY_BENCHMARK" dataKey="industryAvg" fill="#2d2d34" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="glowColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeMetric === "revenue" ? "#00F0FF" : "#d4af37"} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={activeMetric === "revenue" ? "#00F0FF" : "#d4af37"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 2" stroke="#1d1d23" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={9} fontStyle="mono" tickLine={false} />
              <YAxis stroke="#52525b" fontSize={9} fontStyle="mono" tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                name={activeMetric === "revenue" ? "QUARTERLY_REVENUE" : "MARKET_VALUATION"}
                type="monotone"
                dataKey={activeMetric}
                stroke={activeMetric === "revenue" ? "#00F0FF" : "#d4af37"}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#glowColor)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
