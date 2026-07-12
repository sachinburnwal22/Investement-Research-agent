const llm = require("../services/llm");

async function analysisNode(state) {
  console.log("Analysis Node");

  const prompt = `
Based on this company research:

${state.research}

Analyze:

- Competitive advantage
- Growth potential
- Risks

Keep it concise.
`;

  const response = await llm.invoke(prompt);

  return {
    analysis: response.content,
  };
}

module.exports = analysisNode;
