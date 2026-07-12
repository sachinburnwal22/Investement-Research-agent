const llm = require("../services/llm");

async function researchNode(state) {
  console.log("Research Node");

  const prompt = `
Research the company ${state.company}.

Provide only a concise overview of:
- What the company does
- Industry
- Main products
`;

  const response = await llm.invoke(prompt);

  return {
    research: response.content,
  };
}

module.exports = researchNode;
