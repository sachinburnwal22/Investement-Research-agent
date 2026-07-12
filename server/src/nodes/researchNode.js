const llm = require("../services/llm");
const { searchCompany } = require("../services/researchService");

async function researchNode(state) {
  console.log("Research Node");

  const webResearch = await searchCompany(state.company);

  const prompt = `

You are a financial research analyst.

Using the following web research:

${webResearch}


Create a concise company research report.

Include:

- What the company does
- Industry
- Main products/services
- Recent important developments

Do not give investment advice yet.

`;

  const response = await llm.invoke(prompt);

  return {
    research: response.content,
  };
}

module.exports = researchNode;
