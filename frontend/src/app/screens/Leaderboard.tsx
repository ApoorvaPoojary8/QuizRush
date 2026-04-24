import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Trophy, Medal, Crown, Zap, ArrowRight } from "lucide-react";

interface Player {
  name: string;
  score: number;
  streak: number;
}

const INITIAL_PLAYERS: Player[] = [
  { name: "Alex", score: 850, streak: 3 },
  { name: "Jordan", score: 820, streak: 2 },
  { name: "Taylor", score: 780, streak: 4 },
  { name: "Morgan", score: 750, streak: 2 },
  { name: "Casey", score: 720, streak: 1 },
  { name: "Riley", score: 690, streak: 3 },
  { name: "Sam", score: 650, streak: 2 },
  { name: "Quinn", score: 620, streak: 1 },
];

export function Leaderboard() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const sortedPlayers = [...INITIAL_PLAYERS].sort((a, b) => b.score - a.score);

    sortedPlayers.forEach((player, index) => {
      setTimeout(() => {
        setPlayers(prev => [...prev, player]);
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-4"
          >
            <Trophy className="w-16 h-16 text-yellow-300" />
          </motion.div>
          <h1 className="text-white text-5xl mb-2">Leaderboard</h1>
          <p className="text-white/70 text-xl">Top Performers</p>
        </motion.div>

        {/* Top 3 Podium */}
        <div className="w-full max-w-4xl mb-12">
          <div className="flex items-end justify-center gap-4 mb-12">
            <AnimatePresence>
              {players.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl p-6 w-40 h-48 flex flex-col items-center justify-end shadow-2xl border-4 border-white/30 mb-4">
                    <Medal className="w-12 h-12 text-white mb-2" />
                    <p className="text-white text-xl">{players[1].name}</p>
                    <p className="text-white/80 text-lg">{players[1].score}</p>
                  </div>
                  <div className="bg-gray-400/30 backdrop-blur-lg rounded-t-2xl w-40 h-24 flex items-center justify-center border-t-4 border-white/30">
                    <span className="text-white text-4xl">2</span>
                  </div>
                </motion.div>
              )}

              {players.length >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 w-44 h-56 flex flex-col items-center justify-end shadow-2xl border-4 border-yellow-300 mb-4">
                    <Crown className="w-16 h-16 text-white mb-2" />
                    <p className="text-white text-2xl">{players[0].name}</p>
                    <p className="text-white/90 text-xl">{players[0].score}</p>
                  </div>
                  <div className="bg-yellow-400/30 backdrop-blur-lg rounded-t-2xl w-44 h-32 flex items-center justify-center border-t-4 border-yellow-300">
                    <span className="text-white text-5xl">1</span>
                  </div>
                </motion.div>
              )}

              {players.length >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 w-40 h-40 flex flex-col items-center justify-end shadow-2xl border-4 border-white/30 mb-4">
                    <Medal className="w-10 h-10 text-white mb-2" />
                    <p className="text-white text-xl">{players[2].name}</p>
                    <p className="text-white/80 text-lg">{players[2].score}</p>
                  </div>
                  <div className="bg-orange-400/30 backdrop-blur-lg rounded-t-2xl w-40 h-16 flex items-center justify-center border-t-4 border-white/30">
                    <span className="text-white text-4xl">3</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rest of Rankings */}
          <div className="space-y-3">
            <AnimatePresence>
              {players.slice(3).map((player, index) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 3) * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">{index + 4}</span>
                    </div>
                    <div>
                      <p className="text-white text-xl">{player.name}</p>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/70 text-sm">{player.streak} streak</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-white text-2xl">{player.score}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/result")}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
        >
          <span>Continue</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
