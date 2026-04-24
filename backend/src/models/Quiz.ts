import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  points: number;
}

export interface IQuiz extends Document {
  title: string;
  description: string;
  creatorId: mongoose.Types.ObjectId;
  questions: IQuestion[];
  category: string;
  difficulty: "easy" | "medium" | "hard";
  isPublic: boolean;
  timeLimit: number;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (v: string[]) => v.length === 4,
      message: "Must have exactly 4 options",
    },
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  timeLimit: {
    type: Number,
    default: 20,
  },
  points: {
    type: Number,
    default: 1000,
  },
});

const quizSchema = new Schema<IQuiz>(
  {
    title: {
      type: String,
      required: [true, "Please provide a quiz title"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [questionSchema],
    category: {
      type: String,
      default: "General",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    timeLimit: {
      type: Number,
      default: 0,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total points before saving
quizSchema.pre("save", function (next) {
  this.totalPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
  this.timeLimit = this.questions.reduce((sum, q) => sum + q.timeLimit, 0);
  next();
});

export const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);
