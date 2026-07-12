# 🚀 AI Investment Research Agent

An AI-powered Investment Research Agent built using **React**, **Node.js**, **Express**, **LangChain.js**, **LangGraph.js**, and **Google Gemini**. The application researches a company, analyzes its financial and business outlook, evaluates risks and opportunities, and provides an investment recommendation with detailed reasoning.

---

# 📌 Overview

The AI Investment Research Agent helps investors quickly evaluate whether a company is worth investing in.

Instead of manually searching through multiple websites, the user simply enters a company name. The AI agent performs structured research, analyzes available information, and generates a comprehensive investment report containing:

- Company Overview
- Business Summary
- Financial Analysis
- Latest News Analysis
- Strengths
- Risks
- Investment Recommendation (BUY / HOLD / PASS)
- Confidence Score
- AI Reasoning

The project demonstrates modern AI application development using agent-based workflows instead of a single prompt.

---

# 🏗 Tech Stack

## Frontend

- React.js (Vite)
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js

## AI Stack

- LangChain.js
- LangGraph.js
- Google Gemini

## APIs

- Google Gemini API
- Tavily Search API
- Financial Data API
- News API

---

# 📂 Project Structure

```
investment-research-agent
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── hooks
│   │   ├── utils
│   │   └── App.jsx
│   └── package.json
│
├── server
│   ├── src
│   │   ├── agents
│   │   ├── controllers
│   │   ├── graph
│   │   ├── prompts
│   │   ├── routes
│   │   ├── services
│   │   ├── tools
│   │   ├── utils
│   │   └── app.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>

cd investment-research-agent
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

TAVILY_API_KEY=YOUR_TAVILY_API_KEY

NEWS_API_KEY=YOUR_NEWS_API_KEY

FINANCIAL_API_KEY=YOUR_FINANCIAL_API_KEY
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:5000
```

---

# 🧠 System Architecture

```
                    User
                      │
                      ▼
             React Frontend
                      │
                 Axios REST API
                      │
                      ▼
              Express Backend
                      │
               LangGraph Agent
                      │
      ┌───────────────┼────────────────┐
      │               │                │
      ▼               ▼                ▼
 Company Tool   Financial Tool    News Tool
      │               │                │
      └───────────────┼────────────────┘
                      ▼
                 Gemini LLM
                      ▼
          Structured Investment Report
                      ▼
             React Dashboard UI
```

---

# 🔄 Application Workflow

1. User enters a company name.

2. Frontend sends a request to the backend.

3. LangGraph orchestrates multiple AI nodes.

4. The Research Node gathers company information.

5. Financial Node evaluates financial metrics.

6. News Node gathers recent developments.

7. Risk Analysis Node identifies investment risks.

8. Opportunity Node identifies growth potential.

9. Gemini combines all gathered information.

10. Final report is returned to the frontend.

---

# 🤖 AI Agent Workflow

```
START

↓

Research Company

↓

Financial Analysis

↓

Latest News Analysis

↓

Risk Assessment

↓

Opportunity Assessment

↓

Investment Decision

↓

Generate Final Report

↓

END
```

---

# 📡 API Endpoint

## Analyze Company

**POST**

```
/api/analyze
```

### Request

```json
{
  "company": "Tesla"
}
```

### Response

```json
{
  "company": "Tesla",
  "recommendation": "BUY",
  "confidence": 92,
  "score": 86,
  "strengths": ["...", "..."],
  "risks": ["...", "..."],
  "reasoning": "..."
}
```

---

# 💡 Key Design Decisions

### Why LangChain?

LangChain provides a modular interface for interacting with Large Language Models and simplifies prompt management, tool integration, and model abstraction.

### Why LangGraph?

Instead of using one large prompt, LangGraph allows the AI workflow to be split into multiple specialized nodes, making the system more modular, maintainable, and easier to debug.

### Why Gemini?

Gemini offers fast inference, strong reasoning capabilities, and a generous free tier, making it suitable for AI-powered applications.

### Why Node.js?

Using JavaScript across both frontend and backend simplifies development and aligns with the project's production technology stack.

---

# ⚖️ Trade-offs

Current Version

- Uses public APIs for company research.
- Designed for educational and demonstration purposes.
- Investment recommendations should not be considered financial advice.

Possible Improvements

- Multi-company comparison.
- Portfolio optimization.
- Historical financial charts.
- Real-time stock market integration.
- User authentication.
- Report export (PDF).
- Investment watchlist.
- Database persistence.
- Caching API responses.
- Streaming AI responses.

---

# 📷 Example Run

### Input

```
Tesla
```

### Output

```
Recommendation

BUY

Confidence

91%

Strengths

• Strong revenue growth

• AI leadership

• Positive cash flow

Risks

• High valuation

• Increasing competition

Final Verdict

Tesla remains a strong long-term investment despite valuation concerns.
```

---

# 🧪 Future Enhancements

- Live Stock Prices
- SEC Filing Analysis
- Earnings Call Summaries
- Multi-Agent Collaboration
- RAG using Vector Database
- Portfolio Recommendation Engine
- Voice Interaction
- AI Chat Assistant
- Authentication & User Accounts
- Cloud Deployment

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Render / Railway

---

# 👨‍💻 Author

Sachin Burnwal

B.Tech CSE Student

Lovely Professional University

Built as part of the AI Product Development Engineer Internship Assignment.
