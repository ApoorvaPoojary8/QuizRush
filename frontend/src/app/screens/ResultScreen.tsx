import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Trophy, Home, RotateCcw, Share2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function ResultScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ["#FFD700", "#FFA500", "#FF69B4", "#9D50BB", "#4169E1"],
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 relative overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Winner Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-6"
          >
            <Trophy className="w-32 h-32 text-yellow-300" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-7xl mb-4"
          >
            Alex Wins!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-2xl mb-8"
          >
            Final Score: 850 points
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg px-8 py-4 rounded-2xl border border-white/20"
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <span className="text-white text-xl">Perfect Score Streak!</span>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-3 gap-6 mb-12 w-full max-w-3xl"
        >
          {[
            { label: "Questions", value: "10/10", color: "from-blue-400 to-purple-500" },
            { label: "Accuracy", value: "100%", color: "from-green-400 to-teal-500" },
            { label: "Avg Time", value: "5.2s", color: "from-yellow-400 to-orange-500" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center"
            >
              <div className={`inline-flex px-4 py-2 rounded-xl bg-gradient-to-r ${stat.color} mb-3`}>
                <span className="text-white text-3xl">{stat.value}</span>
              </div>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/lobby/123456")}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xl px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
          >
            <RotateCcw className="w-6 h-6" />
            <span>Play Again</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white text-xl px-10 py-4 rounded-2xl shadow-xl hover:bg-white/20 transition-all flex items-center gap-3"
          >
            <Home className="w-6 h-6" />
            <span>Home</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white text-xl px-10 py-4 rounded-2xl shadow-xl hover:bg-white/20 transition-all flex items-center gap-3"
          >
            <Share2 className="w-6 h-6" />
            <span>Share</span>
          </motion.button>
        </motion.div>

        {/* Encouraging Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-white/60 text-lg mt-12 text-center max-w-md"
        >
          Amazing performance! Keep the momentum going and challenge your friends to beat your score!
        </motion.p>
      </div>
    </div>
  );
}
