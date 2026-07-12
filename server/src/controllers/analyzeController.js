const investmentGraph = require("../graph/investmentGraph");

const analyzeCompany = async (req, res) => {
  try {
    const { company } = req.body;

    // Basic validation
    if (!company) {
      return res.status(400).json({
        message: "Company name is required",
      });
    }

    const result = await investmentGraph.invoke({
      company,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Graph Execution Error:", error);

    res.status(500).json({
      message: "Failed to analyze company",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeCompany,
};
