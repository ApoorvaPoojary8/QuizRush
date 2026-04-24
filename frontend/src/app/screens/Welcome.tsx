import { useNavigate } from "react-router";
import { Play, PlusCircle, Users, LogIn, UserPlus } from "lucide-react";
import { motion } from "motion/react";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-green-400 rounded-full opacity-30 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400 rounded-full opacity-20 blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Auth buttons at top */}
        <motion.div
          className="flex gap-3 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/login")}
            className="flex-1 bg-white/20 backdrop-blur-sm text-white rounded-xl px-4 py-3 font-semibold flex items-center justify-center gap-2 border-2 border-white/30 hover:bg-white/30 transition-all"
          >
            <LogIn className="w-5 h-5" />
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="flex-1 bg-white text-purple-600 rounded-xl px-4 py-3 font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
          >
            <UserPlus className="w-5 h-5" />
            Sign Up
          </button>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
        >
          <div className="inline-block bg-white rounded-3xl p-6 shadow-2xl mb-4">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl">
              <Play className="w-10 h-10 text-white fill-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">QuizMaster</h1>
          <p className="text-white/90 text-lg">Learn. Play. Win!</p>
        </motion.div>

        {/* Action buttons */}
        <div className="space-y-4">
          <motion.button
            onClick={() => navigate("/quiz")}
            className="w-full bg-white text-purple-600 rounded-2xl p-6 shadow-xl flex items-center justify-between hover:scale-105 transition-transform active:scale-95"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Play className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xl font-bold">Play Now</span>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">→</span>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate("/create")}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl p-6 shadow-xl flex items-center justify-between hover:scale-105 transition-transform active:scale-95"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Create Quiz</span>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white">→</span>
            </div>
          </motion.button>

          <motion.button
            onClick={() => navigate("/join")}
            className="w-full bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-2xl p-6 shadow-xl flex items-center justify-between hover:scale-105 transition-transform active:scale-95"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Join Game</span>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white">→</span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}