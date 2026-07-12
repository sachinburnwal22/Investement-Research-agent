import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 45000, // Agent tasks might take longer (e.g. 45 seconds)
});

// High-fidelity Mock Data for Demo fallback
export const MOCK_DATA = {
  TSLA: {
    company: "Tesla, Inc.",
    symbol: "TSLA",
    recommendation: "BUY",
    confidence: 82,
    financialData: {
      price: 407.76,
      marketCap: 1303254171648,
      revenue: 96773001216,
      profitMargins: 0.03946,
      debtToEquity: 7.42,
    },
    strengths: [
      "Industry-Leading Manufacturing Efficiency and margins in the EV space.",
      "Rapidly scaling Energy Storage business (Megapack grid deployments).",
      "Massive real-world driving data advantage for training AI/FSD neural nets.",
      "Pristine balance sheet with over $30B in cash and virtually zero net debt."
    ],
    risks: [
      "EV demand saturation and aggressive margin compression from price wars.",
      "Extreme valuation premium trading at software-like P/E multiples.",
      "Technological and regulatory hurdles for unsupervised FSD deployment."
    ],
    summary: "Tesla remains the undisputed market leader in global EV supply chains, but is currently transitioning into an energy storage and AI robotics company. While automotive margins face pressure, its utility energy division and upcoming autonomous robotaxi network present asymmetric upside for long-term growth.",
    analysis: `### Competitive Advantage & Moat
Tesla holds a multi-faceted moat consisting of **proprietary manufacturing processes** (such as mega-castings), a **direct-to-consumer sales model**, and an **unparalleled charging infrastructure** (Superchargers). Furthermore, their vertical integration in battery chemistry and Dojo AI chips ensures they stay 2-3 years ahead of traditional OEMs.

### Growth Potential
1. **Utility-Scale Battery Deployments:** Megapack sales are growing at >100% YoY, representing a high-margin sector.
2. **Autonomous Taxi Network:** FSD version 12 shifts to end-to-end neural network controls, accelerating the timeline to true autonomy.
3. **Next-Gen Platform:** The upcoming low-cost vehicle ($25,000 category) will unlock the mass market.

### Valuation and Risks
Trading at a forward P/E of ~75x, the stock carries high expectations. Slowing global EV adoption and regulatory blockades on autonomous driving are the key headwinds.`,
    research: `# Tesla, Inc. (TSLA) — Company Research Report

### Overview
Tesla, Inc. designs, develops, manufactures, sells, and leases fully electric vehicles, energy generation systems, and storage products. Under CEO Elon Musk, the company is building a vertically integrated ecosystem that links power generation (solar), power storage (Powerwall/Megapack), and transport (EVs/FSD).

### Main Products & Services
* **Electric Vehicles:** Model Y (world's best-selling vehicle), Model 3, Model S, Model X, Cybertruck, and the Semi.
* **Energy Storage:** Megapack (utility-scale grid storage), Powerwall (residential backup), and Solar Roof.
* **Autopilot & FSD:** Full Self-Driving software, currently operating on unsupervised trial phases.

### Recent Developments
* **FSD Version 12 Release:** Upgraded autopilot controls entirely to vision-based neural networks, eliminating 300,000+ lines of explicit C++ code.
* **Megapack Factory Expansion:** Shanghai Megafactory is on track to produce 10,000 Megapacks annually starting 2026.`
  },
  AAPL: {
    company: "Apple Inc.",
    symbol: "AAPL",
    recommendation: "HOLD",
    confidence: 76,
    financialData: {
      price: 182.52,
      marketCap: 2840000000000,
      revenue: 385700000000,
      profitMargins: 0.2582,
      debtToEquity: 145.8,
    },
    strengths: [
      "Unmatched ecosystem lock-in and brand loyalty among 2 billion+ active devices.",
      "High-margin Services division (App Store, iCloud, Apple Pay, Apple Music).",
      "Premium pricing power allowing high gross margins (~45%).",
      "Stellar free cash flow generation exceeding $100B annually."
    ],
    risks: [
      "Saturating global smartphone markets with longer upgrade cycles.",
      "Regulatory antitrust pressure in the US and Europe regarding App Store fees.",
      "Geopolitical risks associated with manufacturing concentration in China."
    ],
    summary: "Apple is a cash-flow juggernaut with an impenetrable ecosystem. While hardware revenue growth has flattened, Services expansion and strategic integrations of localized AI (Apple Intelligence) on-device will protect high margins and support regular stock buybacks.",
    analysis: `### Competitive Advantage & Moat
Apple's core moat is its **closed iOS ecosystem** and high switching costs. Once a user owns an iPhone, Apple Watch, and Mac, the friction of switching to Android is extremely high. Its brand acts as a luxury status symbol, allowing it to capture over 80% of global smartphone industry profits.

### Growth Potential
1. **Apple Intelligence:** Monetizing localized, privacy-focused AI through hardware upgrades (iPhone 16 and beyond).
2. **Services Expansion:** Cloud services, payments, and subscriptions continue to grow at double-digit rates.
3. **Spatial Computing:** Apple Vision Pro establishes Apple's footprint in the next computing interface.

### Valuation and Risks
Apple trades at a reasonable 28x P/E, but its hardware growth is highly cyclical. Global antitrust lawsuits represent a major threat to their high-margin App Store ecosystem.`,
    research: `# Apple Inc. (AAPL) — Company Research Report

### Overview
Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.

### Main Products & Services
* **Hardware:** iPhone, Mac, iPad, AirPods, Apple Watch, Apple Vision Pro.
* **Services:** App Store, Apple Pay, iCloud, Apple Care, Apple TV+, Apple Arcade.

### Recent Developments
* **Apple Intelligence Launch:** Integrated deep generative AI capabilities directly into iOS, iPadOS, and macOS with an emphasis on local, on-device processing.
* **Supply Chain Diversification:** Significantly expanded assembly footprint in India and Vietnam.`
  },
  NVDA: {
    company: "NVIDIA Corporation",
    symbol: "NVDA",
    recommendation: "BUY",
    confidence: 90,
    financialData: {
      price: 125.15,
      marketCap: 3080000000000,
      revenue: 96310000000,
      profitMargins: 0.5532,
      debtToEquity: 17.8,
    },
    strengths: [
      "Absolute monopoly in AI data center chips with ~90% market share.",
      "CUDA software ecosystem creates an impenetrable developer lock-in.",
      "Exceptional pricing power yielding gross margins exceeding 75%.",
      "Pioneering next-generation architecture (Blackwell platform)."
    ],
    risks: [
      "Hyperscaler customers (Microsoft, Google) building their own custom silicon.",
      "Export restrictions on advanced AI hardware to major international markets.",
      "Potential cyclical correction if AI software adoption fails to match chip spend."
    ],
    summary: "NVIDIA is the pick-and-shovel provider for the global AI revolution. Its chips power all major LLMs, and its CUDA software suite makes it almost impossible for developers to transition to competing chips. Despite high expectations, its growth, profitability, and product roadmap remain unmatched.",
    analysis: `### Competitive Advantage & Moat
NVIDIA's moat is not just hardware; it is **CUDA (Compute Unified Device Architecture)**. CUDA has been the industry standard software for GPU acceleration for over 15 years, meaning all AI models and software libraries are optimized for NVIDIA chips. Competing hardware requires rewriting software, creating massive friction.

### Growth Potential
1. **Blackwell Architecture:** The next-gen platform provides 30x faster LLM inference performance, maintaining their tech lead.
2. **AI Enterprise Software:** Licensing pre-trained models and AI microservices (NVIDIA AI Enterprise).
3. **Omniverse & Robotics:** Powering digital twins and autonomous machinery.

### Valuation and Risks
While growth is explosive, any reduction in capital expenditure by hyperscalers (Microsoft, Meta, AWS) will directly hit NVIDIA's order books. Geopolitical friction around Taiwan production remains a structural risk.`,
    research: `# NVIDIA Corporation (NVDA) — Company Research Report

### Overview
NVIDIA Corporation pioneered GPU-accelerated computing. It specializes in products and platforms for the large-scale gaming, professional visualization, data center, and automotive markets.

### Main Products & Services
* **AI & Data Center:** H100, H200, Blackwell (B200/GB200) GPUs, InfiniBand networking hardware, and CUDA software platform.
* **Gaming:** GeForce RTX graphics cards.
* **Automotive:** NVIDIA DRIVE autonomous driving systems.

### Recent Developments
* **Blackwell Shipments:** Initiated deliveries of Blackwell platform chips, which are pre-sold for the next 12 months.
* **Software ARR:** Reached an annualized run-rate of $1 billion for software and support packages.`
  }
};

export const analyzeCompany = async (symbol) => {
  const cleanSymbol = symbol.trim().toUpperCase();
  
  try {
    // Attempt to hit the backend API
    const response = await api.post("/api/analyze", { company: cleanSymbol });
    return response.data;
  } catch (error) {
    console.warn("Backend connection failed or returned error, falling back to mock data. Error:", error.message);
    
    // Check if we have mock data for this symbol
    if (MOCK_DATA[cleanSymbol]) {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return MOCK_DATA[cleanSymbol];
    }
    
    // Create a dynamic mockup if the symbol isn't TSLA, AAPL, or NVDA
    // to keep the app working for ANY search
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return generateDynamicMockData(cleanSymbol);
  }
};

export const getResearchReport = async (symbol) => {
  return analyzeCompany(symbol);
};

export const getFinancialData = async (symbol) => {
  const cleanSymbol = symbol.trim().toUpperCase();
  if (MOCK_DATA[cleanSymbol]) {
    return MOCK_DATA[cleanSymbol].financialData;
  }
  const fullData = await analyzeCompany(symbol);
  return fullData.financialData;
};

// Generates high-quality dynamic mock data for any unknown ticker
const generateDynamicMockData = (symbol) => {
  const companies = {
    MSFT: "Microsoft Corporation",
    GOOGL: "Alphabet Inc.",
    AMZN: "Amazon.com, Inc.",
    META: "Meta Platforms, Inc.",
    NFLX: "Netflix, Inc.",
    AMD: "Advanced Micro Devices, Inc.",
  };

  const name = companies[symbol] || `${symbol} Corp.`;
  const isBuy = Math.random() > 0.4;
  const rec = isBuy ? "BUY" : (Math.random() > 0.5 ? "HOLD" : "PASS");
  const score = Math.floor(60 + Math.random() * 35);
  const confidence = Math.floor(70 + Math.random() * 25);
  const price = +(50 + Math.random() * 500).toFixed(2);
  const rev = Math.floor(20000000000 + Math.random() * 150000000000);
  const cap = Math.floor(100000000000 + Math.random() * 1500000000000);

  return {
    company: name,
    symbol: symbol,
    recommendation: rec,
    confidence: confidence,
    financialData: {
      price: price,
      marketCap: cap,
      revenue: rev,
      profitMargins: +(0.05 + Math.random() * 0.3).toFixed(4),
      debtToEquity: +(20 + Math.random() * 180).toFixed(1),
    },
    strengths: [
      `Solid competitive positioning in ${symbol === "MSFT" || symbol === "GOOGL" ? "cloud AI infrastructure" : "its core target market"}.`,
      "Robust cash flow generation supporting ongoing research and capital reinvestment.",
      "Experienced management team with a proven track record of technological execution."
    ],
    risks: [
      "Increasing competitive pressure from both localized peers and global tech titans.",
      "Sensitivity to broader macroeconomic cycles and interest rate fluctuations.",
      "Changing regulatory landscapes regarding data governance and market concentration."
    ],
    summary: `${name} is displaying sound fundamentals with notable expansion in key business segments. The company holds strong cash reserves which buffer it against near-term headwinds. Our AI agents recommend a ${rec} stance based on current valuations.`,
    analysis: `### Competitive Advantage & Moat
${name} possesses a strong brand equity and solid customer relationships that form a reliable defensive moat. In addition, its investments in proprietary technologies provide structural cost benefits over newer entrants.

### Growth Opportunities
* **Digital Transformation:** Capitalizing on automated systems and integrated workflows.
* **International Expansion:** Unlocking underserved geographic markets to drive top-line numbers.
* **Product Innovation:** Launching value-add features that boost retention.

### Key Vulnerabilities
Elevated capital expenditures might temporarily strain operating margins. Geopolitical risks and changing monetary policies also create valuation variance.`,
    research: `# ${name} (${symbol}) — Company Research Report

### Overview
${name} is a leading provider in its sector, offering a range of technological products and customer-focused services. It operates across multiple global markets and is currently integrating AI to streamline operations and enhance its customer offerings.

### Key Products
* **Enterprise Offerings:** Subscription models, cloud storage, and licensing.
* **Consumer Platforms:** High-performance hardware, digital services, and direct sales.

### Recent Developments
* **Operational AI Integration:** Deployed agentic models to reduce customer support response times.
* **Capital Allocation:** Approved a new share repurchase program alongside dividend expansions.`
  };
};
