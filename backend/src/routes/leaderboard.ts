import { Router, Response } from "express";
import { User } from "../models/User";
import { AuthRequest } from "../middleware/auth";

const router = Router();

// Get global leaderboard
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find()
      .select("name totalScore gamesPlayed correctAnswers")
      .sort({ totalScore: -1 })
      .limit(100);

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      name: user.name,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      correctAnswers: user.correctAnswers,
      accuracy: user.gamesPlayed > 0 ? (user.correctAnswers / user.gamesPlayed * 100).toFixed(2) : 0,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error("Get leaderboard error:", error);
    res.status(500).json({ error: "Failed to get leaderboard" });
  }
});

// Get user ranking
router.get("/user/:userId", async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const higherScores = await User.countDocuments({ totalScore: { $gt: user.totalScore } });
    const rank = higherScores + 1;

    res.json({
      rank,
      name: user.name,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      correctAnswers: user.correctAnswers,
    });
  } catch (error) {
    console.error("Get user ranking error:", error);
    res.status(500).json({ error: "Failed to get ranking" });
  }
});

export default router;
