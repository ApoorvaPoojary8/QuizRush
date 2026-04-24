import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IPlayerAnswer {
  playerId: mongoose.Types.ObjectId;
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
  timeTaken: number;
  pointsEarned: number;
}

export interface IGameSession extends Document {
  pin: string;
  quizId: mongoose.Types.ObjectId;
  hostId: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  currentQuestionIndex: number;
  isActive: boolean;
  answers: IPlayerAnswer[];
  startedAt: Date;
  endedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const playerAnswerSchema = new Schema<IPlayerAnswer>({
  playerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questionIndex: {
    type: Number,
    required: true,
  },
  selectedOption: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  timeTaken: {
    type: Number,
    default: 0,
  },
  pointsEarned: {
    type: Number,
    default: 0,
  },
});

const gameSessionSchema = new Schema<IGameSession>(
  {
    pin: {
      type: String,
      required: true,
      unique: true,
      default: () => Math.random().toString(36).substring(2, 8).toUpperCase(),
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    currentQuestionIndex: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    answers: [playerAnswerSchema],
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const GameSession = mongoose.model<IGameSession>("GameSession", gameSessionSchema);
