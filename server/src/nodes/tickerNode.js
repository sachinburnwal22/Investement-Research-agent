const llm = require("../services/llm");

async function tickerNode(state) {
  console.log("Ticker Resolver Node");

  const prompt = `

You are a stock market assistant.

Return only the stock ticker symbol
for this company:

${state.company}

Example:

Tesla -> TSLA
Apple -> AAPL

Only return the ticker.

`;

  const response = await llm.invoke(prompt);

  return {
    symbol: response.content.trim(),
  };
}

module.exports = tickerNode;
