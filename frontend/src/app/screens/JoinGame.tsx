import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Hash } from "lucide-react";
import { motion } from "motion/react";

export function JoinGame() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const handleJoin = () => {
    if (pin.length >= 4) {
      navigate("/quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 flex flex-col p-6">
      {/* Header */}
      <motion.button
        onClick={() => navigate("/")}
        className="self-start mb-8 p-3 bg-white/20 rounded-full backdrop-blur-sm"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </motion.button>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <Hash className="w-16 h-16 text-teal-500" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white text-center mb-3">
              Join Game
            </h1>
            <p className="text-white/90 text-center mb-12 text-lg">
              Enter the game PIN to join
            </p>

            {/* PIN Input */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
              <label className="block text-gray-600 mb-3 font-semibold">
                Game PIN
              </label>
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter PIN"
                maxLength={8}
                className="w-full text-4xl font-bold text-center tracking-wider p-6 bg-gray-100 rounded-2xl border-4 border-transparent focus:border-teal-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Join button */}
            <motion.button
              onClick={handleJoin}
              disabled={pin.length < 4}
              className="w-full bg-white text-teal-600 rounded-2xl p-6 shadow-xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={pin.length >= 4 ? { scale: 1.05 } : {}}
              whileTap={pin.length >= 4 ? { scale: 0.95 } : {}}
            >
              Join Game
            </motion.button>

            {/* Help text */}
            <p className="text-white/70 text-center mt-6">
              Ask your host for the game PIN
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
