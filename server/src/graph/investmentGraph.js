const { StateGraph, START, END } = require("@langchain/langgraph");

const InvestmentState = require("./state");

const researchNode = require("../nodes/researchNode");
const analysisNode = require("../nodes/analysisNode");
const decisionNode = require("../nodes/decisionNode");

// Create the graph
const graph = new StateGraph(InvestmentState);

// Register the nodes
graph.addNode("researchNode", researchNode);
graph.addNode("analysisNode", analysisNode);
graph.addNode("decisionNode", decisionNode);

// Connect the nodes
graph.addEdge(START, "researchNode");
graph.addEdge("researchNode", "analysisNode");
graph.addEdge("analysisNode", "decisionNode");
graph.addEdge("decisionNode", END);

// Compile the graph
const investmentGraph = graph.compile();

// Export it
module.exports = investmentGraph;
