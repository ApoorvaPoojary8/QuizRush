import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  totalScore: number;
  gamesPlayed: number;
  correctAnswers: number;
  rank: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

export const Leaderboard = mongoose.model<ILeaderboardEntry>("Leaderboard", leaderboardSchema);
