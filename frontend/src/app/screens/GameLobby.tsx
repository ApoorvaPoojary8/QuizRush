import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Users, Play, Crown, Zap } from "lucide-react";

export function GameLobby() {
  const navigate = useNavigate();
  const { pin } = useParams();
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    const mockPlayers = [
      "Alex", "Jordan", "Taylor", "Morgan", "Casey",
      "Riley", "Sam", "Quinn", "Avery", "Blake"
    ];

    const interval = setInterval(() => {
      if (players.length < mockPlayers.length) {
        setPlayers(prev => [...prev, mockPlayers[prev.length]]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [players.length]);

  const startGame = () => {
    navigate("/question/1");
  };

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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Game PIN Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <p className="text-white/70 text-xl mb-2">Game PIN</p>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-white/20 backdrop-blur-lg rounded-3xl px-12 py-6 border border-white/30 shadow-2xl"
          >
            <h1 className="text-white text-7xl tracking-wider">{pin}</h1>
          </motion.div>
        </motion.div>

        {/* Players Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-2xl border border-white/20"
        >
          <Users className="w-6 h-6 text-yellow-300" />
          <span className="text-white text-xl">{players.length} Players Joined</span>
        </motion.div>

        {/* Players Grid */}
        <div className="w-full max-w-4xl mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence>
              {players.map((player, index) => (
                <motion.div
                  key={player}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-xl"
                >
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl ${
                        index === 0 ? "bg-gradient-to-br from-yellow-400 to-orange-500" :
                        index === 1 ? "bg-gradient-to-br from-blue-400 to-purple-500" :
                        index === 2 ? "bg-gradient-to-br from-green-400 to-teal-500" :
                        "bg-gradient-to-br from-pink-400 to-red-500"
                      }`}
                    >
                      {index === 0 && <Crown className="w-6 h-6" />}
                      {index !== 0 && player.charAt(0)}
                    </motion.div>
                    <p className="text-white text-sm">{player}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Start Game Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-2xl px-16 py-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
          disabled={players.length === 0}
        >
          <Play className="w-8 h-8" />
          <span>Start Game</span>
        </motion.button>

        {/* Waiting Message */}
        {players.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-white/70 flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-5 h-5" />
            </motion.div>
            <span>Waiting for players to join...</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
