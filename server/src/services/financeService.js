const YahooFinance = require("yahoo-finance2").default;
const yahooFinance = new YahooFinance();

async function getFinancialData(ticker) {
  const quote = await yahooFinance.quote(ticker);

  const summary = await yahooFinance.quoteSummary(ticker, {
    modules: ["financialData", "defaultKeyStatistics"],
  });

  return {
    price: quote.regularMarketPrice,
    marketCap: quote.marketCap,
    revenue: summary.financialData.totalRevenue,
    profitMargins: summary.financialData.profitMargins,
    debtToEquity: summary.financialData.debtToEquity,
  };
}

module.exports = {
  getFinancialData,
};
