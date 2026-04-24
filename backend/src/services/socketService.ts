import { Server, Socket } from "socket.io";
import { GameSession } from "../models/GameSession";
import { Quiz } from "../models/Quiz";

interface GameRoom {
  [gameId: string]: {
    players: Set<string>;
    currentQuestion: number;
  };
}

const gameRooms: GameRoom = {};

export function setupSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Join game room
    socket.on("join-game", async (data: { gameId: string; userId: string; userName: string }) => {
      try {
        const { gameId, userId, userName } = data;

        if (!gameRooms[gameId]) {
          gameRooms[gameId] = {
            players: new Set(),
            currentQuestion: 0,
          };
        }

        gameRooms[gameId].players.add(userId);
        socket.join(`game-${gameId}`);

        // Broadcast player joined
        io.to(`game-${gameId}`).emit("player-joined", {
          userId,
          userName,
          totalPlayers: gameRooms[gameId].players.size,
        });
      } catch (error) {
        console.error("Join game error:", error);
        socket.emit("error", { message: "Failed to join game" });
      }
    });

    // Send next question
    socket.on("next-question", async (data: { gameId: string; questionIndex: number }) => {
      try {
        const { gameId, questionIndex } = data;
        const gameSession = await GameSession.findById(gameId);

        if (!gameSession) {
          socket.emit("error", { message: "Game not found" });
          return;
        }

        const quiz = await Quiz.findById(gameSession.quizId);
        if (!quiz || !quiz.questions[questionIndex]) {
          socket.emit("error", { message: "Question not found" });
          return;
        }

        const question = quiz.questions[questionIndex];

        io.to(`game-${gameId}`).emit("question-sent", {
          questionIndex,
          question: question.question,
          options: question.options,
          timeLimit: question.timeLimit,
          totalQuestions: quiz.questions.length,
        });

        if (gameRooms[gameId]) {
          gameRooms[gameId].currentQuestion = questionIndex;
        }
      } catch (error) {
        console.error("Next question error:", error);
        socket.emit("error", { message: "Failed to send question" });
      }
    });

    // Player answered
    socket.on("answer-submitted", (data: { gameId: string; playerId: string; playerName: string }) => {
      io.to(`game-${gameId}`).emit("player-answered", {
        playerId: data.playerId,
        playerName: data.playerName,
      });
    });

    // Get live scores
    socket.on("get-scores", async (data: { gameId: string }) => {
      try {
        const { gameId } = data;
        const gameSession = await GameSession.findById(gameId);

        if (!gameSession) {
          socket.emit("error", { message: "Game not found" });
          return;
        }

        const scores = new Map<string, number>();

        for (const answer of gameSession.answers) {
          const playerId = answer.playerId.toString();
          scores.set(playerId, (scores.get(playerId) || 0) + answer.pointsEarned);
        }

        const scoresArray = Array.from(scores.entries()).map(([playerId, score]) => ({
          playerId,
          score,
        }));

        io.to(`game-${gameId}`).emit("scores-updated", {
          scores: scoresArray.sort((a, b) => b.score - a.score),
        });
      } catch (error) {
        console.error("Get scores error:", error);
        socket.emit("error", { message: "Failed to get scores" });
      }
    });

    // Leave game
    socket.on("leave-game", (data: { gameId: string; userId: string; userName: string }) => {
      const { gameId, userId, userName } = data;

      if (gameRooms[gameId]) {
        gameRooms[gameId].players.delete(userId);

        if (gameRooms[gameId].players.size === 0) {
          delete gameRooms[gameId];
        }
      }

      socket.leave(`game-${gameId}`);

      io.to(`game-${gameId}`).emit("player-left", {
        userId,
        userName,
        totalPlayers: gameRooms[gameId]?.players.size || 0,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
