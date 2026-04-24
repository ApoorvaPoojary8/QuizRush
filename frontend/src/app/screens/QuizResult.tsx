import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Trophy, Share2, RotateCcw, Home, Star } from "lucide-react";
import { useEffect, useState } from "react";

export function QuizResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Get score from navigation state or use default
  const score = location.state?.score || 3250;
  const totalQuestions = location.state?.totalQuestions || 5;
  const percentage = Math.round((score / (totalQuestions * 1000)) * 100);
  const rank = 3;

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const getRankMessage = () => {
    if (percentage >= 80) return "Outstanding! 🎉";
    if (percentage >= 60) return "Great Job! 🌟";
    if (percentage >= 40) return "Good Effort! 👍";
    return "Keep Practicing! 💪";
  };

  const handleShare = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: "QuizMaster Result",
        text: `I scored ${score} points and ranked #${rank} in QuizMaster! Can you beat my score?`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex flex-col p-6 relative overflow-hidden">
      {/* Animated background elements */}
      {showConfetti && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-yellow-300 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: Math.random() * 360,
                opacity: 0,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "linear",
              }}
            />
          ))}
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Trophy icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white rounded-full p-8 shadow-2xl">
            <Trophy className="w-20 h-20 text-yellow-500" />
          </div>
        </motion.div>

        {/* Result message */}
        <motion.h1
          className="text-4xl font-bold text-white mb-2 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {getRankMessage()}
        </motion.h1>

        <motion.p
          className="text-white/90 text-lg mb-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You finished the quiz
        </motion.p>

        {/* Score card */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-2xl mb-8 w-full max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Score */}
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-purple-600 mb-2">
              {score.toLocaleString()}
            </div>
            <div className="text-gray-600 text-lg font-semibold">
              Total Points
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            {/* Rank */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-3 rounded-xl">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-semibold">Your Rank</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">#{rank}</span>
            </div>

            {/* Accuracy */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">Accuracy</span>
              <span className="text-2xl font-bold text-purple-600">
                {percentage}%
              </span>
            </div>

            {/* Questions */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-semibold">Questions</span>
              <span className="text-2xl font-bold text-purple-600">
                {totalQuestions}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.6, duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="w-full max-w-md space-y-4">
          <motion.button
            onClick={() => navigate("/quiz")}
            className="w-full bg-white text-purple-600 rounded-2xl p-5 shadow-xl font-bold text-lg flex items-center justify-center gap-3"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-6 h-6" />
            Play Again
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="w-full bg-white/20 backdrop-blur-sm text-white rounded-2xl p-5 shadow-xl font-bold text-lg flex items-center justify-center gap-3 border-2 border-white/40"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-6 h-6" />
            Share Result
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            className="w-full bg-white/20 backdrop-blur-sm text-white rounded-2xl p-5 shadow-xl font-bold text-lg flex items-center justify-center gap-3 border-2 border-white/40"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-6 h-6" />
            Home
          </motion.button>
        </div>
      </div>
    </div>
  );
}
