const llm = require("../services/llm");

const analyzeCompany = async (req, res) => {
  try {
    if (!req.body) {
      console.warn(`[analyzeCompany] Request body is undefined. Make sure Content-Type is set to application/json.`);
      return res.status(400).json({
        message: "Invalid request: Request body is missing. Ensure your client is sending a JSON body with 'Content-Type: application/json'.",
      });
    }

    const { company } = req.body;
    if (!company) {
      console.warn(`[analyzeCompany] "company" field is missing in request body.`);
      return res.status(400).json({
        message: "Invalid request: 'company' field is required in the JSON body.",
      });
    }

    console.log(`[analyzeCompany] Received analysis request for company: "${company}"`);

    const prompt = `
You are an experienced investment analyst.

Analyze the company: ${company}

Provide:

1. Company overview
2. Strengths
3. Risks
4. Final recommendation
`;

    console.log(`[analyzeCompany] Invoking Gemini model through LangChain...`);
    const response = await llm.invoke(prompt);
    console.log(`[analyzeCompany] LLM response successfully received.`);

    res.json({
      company,
      analysis: response.content,
    });
  } catch (error) {
    console.error(`[analyzeCompany] Error occurred during company analysis:`, error);

    res.status(500).json({
      message: "Failed to analyze company",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeCompany,
};
