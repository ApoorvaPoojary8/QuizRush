import { Router, Response } from "express";
import { Quiz } from "../models/Quiz";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Create a new quiz
router.post("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, questions, category, difficulty, isPublic } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ error: "Title and questions are required" });
    }

    const quiz = new Quiz({
      title,
      description,
      creatorId: req.userId,
      questions,
      category,
      difficulty,
      isPublic,
    });

    await quiz.save();

    res.status(201).json({
      id: quiz._id,
      title: quiz.title,
      totalPoints: quiz.totalPoints,
      questionCount: quiz.questions.length,
    });
  } catch (error) {
    console.error("Create quiz error:", error);
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

// Get all public quizzes
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const quizzes = await Quiz.find({ isPublic: true })
      .select("_id title description category difficulty creatorId totalPoints questions")
      .limit(50);

    const formattedQuizzes = quizzes.map((quiz) => ({
      id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      difficulty: quiz.difficulty,
      totalPoints: quiz.totalPoints,
      questionCount: quiz.questions.length,
    }));

    res.json(formattedQuizzes);
  } catch (error) {
    console.error("Get quizzes error:", error);
    res.status(500).json({ error: "Failed to get quizzes" });
  }
});

// Get quiz by ID
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json({
      id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      category: quiz.category,
      difficulty: quiz.difficulty,
      questions: quiz.questions,
      totalPoints: quiz.totalPoints,
      timeLimit: quiz.timeLimit,
    });
  } catch (error) {
    console.error("Get quiz error:", error);
    res.status(500).json({ error: "Failed to get quiz" });
  }
});

// Get my quizzes
router.get("/my/quizzes", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const quizzes = await Quiz.find({ creatorId: req.userId }).select("_id title totalPoints questions");

    const formattedQuizzes = quizzes.map((quiz) => ({
      id: quiz._id,
      title: quiz.title,
      totalPoints: quiz.totalPoints,
      questionCount: quiz.questions.length,
    }));

    res.json(formattedQuizzes);
  } catch (error) {
    console.error("Get my quizzes error:", error);
    res.status(500).json({ error: "Failed to get quizzes" });
  }
});

// Update quiz
router.put("/:id", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.creatorId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { title, description, questions, category, difficulty, isPublic } = req.body;

    if (title) quiz.title = title;
    if (description) quiz.description = description;
    if (questions) quiz.questions = questions;
    if (category) quiz.category = category;
    if (difficulty) quiz.difficulty = difficulty;
    if (isPublic !== undefined) quiz.isPublic = isPublic;

    await quiz.save();

    res.json({
      id: quiz._id,
      title: quiz.title,
      totalPoints: quiz.totalPoints,
    });
  } catch (error) {
    console.error("Update quiz error:", error);
    res.status(500).json({ error: "Failed to update quiz" });
  }
});

// Delete quiz
router.delete("/:id", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    if (quiz.creatorId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Quiz.deleteOne({ _id: req.params.id });

    res.json({ message: "Quiz deleted" });
  } catch (error) {
    console.error("Delete quiz error:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

export default router;
