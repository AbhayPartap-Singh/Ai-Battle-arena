import { StateGraph, type GraphNode, StateSchema, START,END, CompiledStateGraph } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import z from "zod";

import { coheremodel, geminimodel, mistralaimodel } from "./model.ai.js";

// --------------------
// STATE SCHEMA
// --------------------
const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reason: z.string().default(""),
    solution_2_reason: z.string().default("")
  })
});

// --------------------
// SOLUTION NODE
// --------------------
const solutionNode: GraphNode<typeof state> = async (state, _config) => {
  const [mistralRes, cohereRes] = await Promise.all([
    mistralaimodel.invoke(state.problem),
    coheremodel.invoke(state.problem)
  ]);

  return {
    solution_1: mistralRes.text,
    solution_2: cohereRes.text
  };
};

// --------------------
// JUDGE NODE
// --------------------
const judgeNode: GraphNode<typeof state> = async (state, _config) => {
  const { problem, solution_1, solution_2 } = state;

  const judgePrompt = `
You are a fair judge.

Problem:
${problem}

Solution 1:
${solution_1}

Solution 2:
${solution_2}

Evaluate both solutions.

Return ONLY valid JSON in this format:
{
  "solution_1_score": number (0-10),
  "solution_2_score": number (0-10),
  "solution_1_reason": string,
  "solution_2_reason": string
}
`;

  const response = await geminimodel.invoke([
    new HumanMessage(judgePrompt)
  ]);

  let parsed;

  try {
    parsed = JSON.parse(response.text);
  } catch (err) {
    // fallback if model gives bad JSON
    parsed = {
      solution_1_score: 5,
      solution_2_score: 5,
      solution_1_reason: "Parsing failed, default score",
      solution_2_reason: "Parsing failed, default score"
    };
  }

  return {
    judge: {
      solution_1_score: parsed.solution_1_score ?? 0,
      solution_2_score: parsed.solution_2_score ?? 0,
      solution_1_reason: parsed.solution_1_reason ?? "",
      solution_2_reason: parsed.solution_2_reason ?? ""
    }
  };
};

// --------------------
// GRAPH BUILD
// --------------------
const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node",END)
  .compile()

export default async function runGraph(problem: string) {
  const result = await graph.invoke({
    problem:problem
  })

  return result
  }