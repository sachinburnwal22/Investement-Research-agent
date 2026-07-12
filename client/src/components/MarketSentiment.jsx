import React from "react";
import { Gauge, Heart, Newspaper, MessageSquare, Zap } from "lucide-react";

export default function MarketSentiment({ companyData }) {
  // Compute semi-random or calculated sentiment scores based on recommendation
  const getSentimentMetrics = () => {
    const rec = companyData?.recommendation || "HOLD";
    
    if (rec === "BUY") {
      return {
        bullishPercent: 84,
        socialVolume: "HIGH",
        newsScore: 8.2,
        shortInterest: "LOW",
        signal: "ACCUMULATE_DYNAMIC"
      };
    } else if (rec === "HOLD") {
      return {
        bullishPercent: 58,
        socialVolume: "AVERAGE",
        newsScore: 6.1,
        shortInterest: "MODERATE",
        signal: "NEUTRAL_STANDBY"
      };
    } else {
      return {
        bullishPercent: 28,
        socialVolume: "HIGH",
        newsScore: 3.4,
        shortInterest: "ELEVATED",
        signal: "LIQUIDATE_PRECAUTION"
      };
    }
  };

  const metrics = getSentimentMetrics();

  return (
    <div className="holo-card p-6 rounded-2xl preserve-3d h-full flex flex-col justify-between cursor-pointer select-none">
      {/* Hologram Scanner */}
      <div className="scanner-line" />
      
      {/* Cyber Corners */}
      <div className="cyber-corners absolute inset-0 rounded-2xl pointer-events-none" />

      {/* Grid Bg */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/[0.04]">
          <h4 className="text-xs font-bold text-white tracking-widest uppercase font-mono flex items-center gap-1.5">
            <Gauge className="w-4.5 h-4.5 text-primary-glow animate-pulse" />
            MARKET_SENTIMENT_DIAL
          </h4>
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
            LIVE_INDEX
          </span>
        </div>

        {/* Holographic Sentiment slider */}
        <div className="space-y-4 my-2">
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className="text-neutral-500 uppercase">Bullish Index</span>
              <span className="text-accent-buy font-bold">{metrics.bullishPercent}%</span>
            </div>
            <div className="h-2 w-full bg-neutral-950 border border-white/[0.03] rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-accent-sell via-accent-hold to-accent-buy transition-all duration-1000"
                style={{ width: `${metrics.bullishPercent}%` }}
              />
              {/* Floating laser slider thumb indicator */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-glow-primary transition-all duration-1000"
                style={{ left: `${metrics.bullishPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-neutral-600 mt-1 uppercase">
              <span>Bearish</span>
              <span>Neutral</span>
              <span>Bullish</span>
            </div>
          </div>

          {/* Micro HUD data readouts */}
          <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-white/[0.03] font-mono text-left">
            <div className="p-2.5 bg-neutral-950/60 border border-white/[0.02] rounded-xl flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary-glow shrink-0" />
              <div>
                <p className="text-[8px] text-neutral-500 m-0 uppercase">Social Vol</p>
                <p className="text-xs font-bold text-white m-0">{metrics.socialVolume}</p>
              </div>
            </div>

            <div className="p-2.5 bg-neutral-950/60 border border-white/[0.02] rounded-xl flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-accent-premium shrink-0" />
              <div>
                <p className="text-[8px] text-neutral-500 m-0 uppercase">News Score</p>
                <p className="text-xs font-bold text-white m-0">{metrics.newsScore}/10</p>
              </div>
            </div>

            <div className="p-2.5 bg-neutral-950/60 border border-white/[0.02] rounded-xl flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent-sell shrink-0" />
              <div>
                <p className="text-[8px] text-neutral-500 m-0 uppercase">Short Int</p>
                <p className="text-xs font-bold text-white m-0">{metrics.shortInterest}</p>
              </div>
            </div>

            <div className="p-2.5 bg-neutral-950/60 border border-white/[0.02] rounded-xl flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent-buy shrink-0" />
              <div>
                <p className="text-[8px] text-neutral-500 m-0 uppercase">Node Signal</p>
                <p className="text-[10px] font-bold text-white m-0 truncate max-w-[80px]">{metrics.signal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
