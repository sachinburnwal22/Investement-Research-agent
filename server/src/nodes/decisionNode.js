const llm = require("../services/llm");
const { z } = require("zod");

const investmentSchema = z.object({
  recommendation: z.enum(["BUY", "HOLD", "PASS"]),

  confidence: z.number(),

  strengths: z.array(z.string()),

  risks: z.array(z.string()),

  summary: z.string(),
});

const structuredLLM = llm.withStructuredOutput(investmentSchema);

async function decisionNode(state) {
  console.log("Decision Node");

  const prompt = `

You are an expert investment analyst.

Company:
${state.company}


Research:
${state.research}


Analysis:
${state.analysis}


Based on this information:

Return:

- investment recommendation
- confidence score from 0-100
- strengths
- risks
- summary


`;

  const response = await structuredLLM.invoke(prompt);

  return {
    recommendation: response.recommendation,

    confidence: response.confidence,

    strengths: response.strengths,

    risks: response.risks,

    summary: response.summary,
  };
}

module.exports = decisionNode;
