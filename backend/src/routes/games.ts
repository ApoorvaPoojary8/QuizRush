import { Router, Response } from "express";
import { GameSession } from "../models/GameSession";
import { Quiz } from "../models/Quiz";
import { User } from "../models/User";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Create a new game session
router.post("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { quizId } = req.body;

    if (!quizId) {
      return res.status(400).json({ error: "Quiz ID is required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const gameSession = new GameSession({
      quizId,
      hostId: req.userId,
      participants: [req.userId],
    });

    await gameSession.save();

    res.status(201).json({
      id: gameSession._id,
      pin: gameSession.pin,
      quizId: gameSession.quizId,
      hostId: gameSession.hostId,
    });
  } catch (error) {
    console.error("Create game error:", error);
    res.status(500).json({ error: "Failed to create game" });
  }
});

// Join game by PIN
router.post("/join", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { pin } = req.body;

    if (!pin) {
      return res.status(400).json({ error: "PIN is required" });
    }

    const gameSession = await GameSession.findOne({ pin, isActive: true });

    if (!gameSession) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Add participant if not already there
    if (!gameSession.participants.includes(req.userId as any)) {
      gameSession.participants.push(req.userId as any);
      await gameSession.save();
    }

    res.json({
      id: gameSession._id,
      pin: gameSession.pin,
      quizId: gameSession.quizId,
      currentQuestionIndex: gameSession.currentQuestionIndex,
    });
  } catch (error) {
    console.error("Join game error:", error);
    res.status(500).json({ error: "Failed to join game" });
  }
});

// Get game session details
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const gameSession = await GameSession.findById(req.params.id)
      .populate("quizId")
      .populate("participants", "name email");

    if (!gameSession) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json({
      id: gameSession._id,
      pin: gameSession.pin,
      quizId: gameSession.quizId,
      currentQuestionIndex: gameSession.currentQuestionIndex,
      isActive: gameSession.isActive,
      participants: gameSession.participants,
    });
  } catch (error) {
    console.error("Get game error:", error);
    res.status(500).json({ error: "Failed to get game" });
  }
});

// Submit answer
router.post("/:id/answer", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { questionIndex, selectedOption, timeTaken } = req.body;

    const gameSession = await GameSession.findById(req.params.id);
    if (!gameSession) {
      return res.status(404).json({ error: "Game not found" });
    }

    const quiz = await Quiz.findById(gameSession.quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const question = quiz.questions[questionIndex];
    const isCorrect = question.correctAnswer === selectedOption;
    const pointsEarned = isCorrect ? question.points : 0;

    const answer = {
      playerId: req.userId as any,
      questionIndex,
      selectedOption,
      isCorrect,
      timeTaken,
      pointsEarned,
    };

    gameSession.answers.push(answer);
    await gameSession.save();

    res.json({
      isCorrect,
      pointsEarned,
      correctAnswer: question.correctAnswer,
    });
  } catch (error) {
    console.error("Submit answer error:", error);
    res.status(500).json({ error: "Failed to submit answer" });
  }
});

// End game session
router.post("/:id/end", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const gameSession = await GameSession.findById(req.params.id);

    if (!gameSession) {
      return res.status(404).json({ error: "Game not found" });
    }

    if (gameSession.hostId.toString() !== req.userId) {
      return res.status(403).json({ error: "Only host can end the game" });
    }

    gameSession.isActive = false;
    gameSession.endedAt = new Date();
    await gameSession.save();

    // Update user stats
    const playerAnswers = new Map<string, { correct: number; total: number; score: number }>();

    for (const answer of gameSession.answers) {
      const playerId = answer.playerId.toString();
      if (!playerAnswers.has(playerId)) {
        playerAnswers.set(playerId, { correct: 0, total: 0, score: 0 });
      }

      const stats = playerAnswers.get(playerId)!;
      stats.total++;
      if (answer.isCorrect) stats.correct++;
      stats.score += answer.pointsEarned;
    }

    for (const [playerId, stats] of playerAnswers) {
      const user = await User.findById(playerId);
      if (user) {
        user.gamesPlayed++;
        user.correctAnswers += stats.correct;
        user.totalScore += stats.score;
        await user.save();
      }
    }

    res.json({ message: "Game ended", playersStats: Object.fromEntries(playerAnswers) });
  } catch (error) {
    console.error("End game error:", error);
    res.status(500).json({ error: "Failed to end game" });
  }
});

// Get game results
router.get("/:id/results", async (req: AuthRequest, res: Response) => {
  try {
    const gameSession = await GameSession.findById(req.params.id)
      .populate("participants", "name email")
      .populate("quizId");

    if (!gameSession) {
      return res.status(404).json({ error: "Game not found" });
    }

    const results = gameSession.participants.map((participant: any) => {
      const playerAnswers = gameSession.answers.filter(
        (a) => a.playerId.toString() === participant._id.toString()
      );

      const totalScore = playerAnswers.reduce((sum, a) => sum + a.pointsEarned, 0);
      const correctCount = playerAnswers.filter((a) => a.isCorrect).length;

      return {
        playerId: participant._id,
        playerName: participant.name,
        score: totalScore,
        correct: correctCount,
        total: playerAnswers.length,
        percentage: Math.round((correctCount / playerAnswers.length) * 100) || 0,
      };
    });

    res.json({
      gameId: gameSession._id,
      results: results.sort((a, b) => b.score - a.score),
    });
  } catch (error) {
    console.error("Get results error:", error);
    res.status(500).json({ error: "Failed to get results" });
  }
});

export default router;
