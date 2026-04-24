import express, { Express, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { config } from "./config/env";
import { connectDB } from "./config/database";
import { setupSocketHandlers } from "./services/socketService";
import { authenticate } from "./middleware/auth";

// Routes
import authRoutes from "./routes/auth";
import quizRoutes from "./routes/quizzes";
import gameRoutes from "./routes/games";
import leaderboardRoutes from "./routes/leaderboard";
import userRoutes from "./routes/users";

const app: Express = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: config.frontendUrl,
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Socket handlers
setupSocketHandlers(io);

// Health check
app.get("/health", (_, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/auth", authRoutes);
app.use("/quizzes", quizRoutes);
app.use("/games", gameRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/users", userRoutes);

// 404 handler
app.use((_, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
httpServer.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`🌍 Frontend URL: ${config.frontendUrl}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n👋 Shutting down gracefully...");
  httpServer.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
