import { Router, Response } from "express";
import { User } from "../models/User";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Get user profile
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
      correctAnswers: user.correctAnswers,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Update user profile
router.put("/:id", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (req.params.id !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { ...(name && { name }) },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      totalScore: user.totalScore,
      gamesPlayed: user.gamesPlayed,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

export default router;
