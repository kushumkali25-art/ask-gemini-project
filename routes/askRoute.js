import express from "express";
import { callGemini } from "../services/geminiService.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await callGemini(question);
    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Error in /ask route:", err.message);
    return res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

export default router;