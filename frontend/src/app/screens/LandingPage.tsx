import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Sparkles, Trophy, Users, Zap } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();
  const [gamePin, setGamePin] = useState("");

  const handleJoinGame = () => {
    if (gamePin.trim()) {
      navigate(`/lobby/${gamePin}`);
    }
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
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <span className="text-white text-2xl">BrainRush</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-6"
          >
            <button
              onClick={() => navigate("/discover")}
              className="text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Discover
            </button>
            <button
              onClick={() => navigate("/create")}
              className="text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Create Quiz
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Host Game
            </button>
            <button
              onClick={() => setGamePin("")}
              className="text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
            >
              Join Game
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-20 h-20 text-yellow-300" />
          </motion.div>
          <h1 className="text-7xl text-white mb-4">
            BrainRush
          </h1>
          <p className="text-white/80 text-xl">Fast. Competitive. Fun.</p>
        </motion.div>

        {/* Game PIN Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <input
              type="text"
              value={gamePin}
              onChange={(e) => setGamePin(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleJoinGame()}
              placeholder="Enter Game PIN"
              className="w-full px-6 py-4 text-2xl text-center bg-white/90 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all mb-6"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinGame}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Join Game
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl"
        >
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Real-time multiplayer action", color: "from-yellow-400 to-orange-500" },
            { icon: Users, title: "Play Together", desc: "Compete with friends", color: "from-blue-400 to-purple-500" },
            { icon: Trophy, title: "Win Big", desc: "Climb the leaderboard", color: "from-pink-400 to-red-500" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 cursor-pointer"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-xl mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
