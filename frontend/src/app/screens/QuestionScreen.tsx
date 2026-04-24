import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const MOCK_QUESTION = {
  question: "What is the largest planet in our solar system?",
  answers: [
    { text: "Earth", color: "bg-red-500 hover:bg-red-600" },
    { text: "Mars", color: "bg-blue-500 hover:bg-blue-600" },
    { text: "Jupiter", color: "bg-yellow-500 hover:bg-yellow-600", correct: true },
    { text: "Saturn", color: "bg-green-500 hover:bg-green-600" },
  ],
  timer: 20,
};

export function QuestionScreen() {
  const navigate = useNavigate();
  const { questionNumber } = useParams();
  const [timeLeft, setTimeLeft] = useState(MOCK_QUESTION.timer);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
      setTimeout(() => navigate("/leaderboard"), 3000);
    }
  }, [timeLeft, showResult, navigate]);

  const handleAnswerClick = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    setTimeout(() => {
      navigate("/leaderboard");
    }, 2000);
  };

  const progressPercentage = (timeLeft / MOCK_QUESTION.timer) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 flex flex-col">
      {/* Timer Bar */}
      <div className="relative h-3 bg-white/20">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          initial={{ width: "100%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Timer Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center py-6"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/20 shadow-xl flex items-center gap-3">
          <Clock className="w-6 h-6 text-yellow-300" />
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-white text-3xl"
          >
            {timeLeft}
          </motion.span>
        </div>
      </motion.div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl mb-12"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <p className="text-white/70 text-lg mb-2">Question {questionNumber}</p>
            <h2 className="text-white text-4xl text-center">{MOCK_QUESTION.question}</h2>
          </div>
        </motion.div>

        {/* Answer Grid */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_QUESTION.answers.map((answer, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = answer.correct;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!showResult ? { scale: 1.05, y: -8 } : {}}
                whileTap={!showResult ? { scale: 0.95 } : {}}
                onClick={() => handleAnswerClick(index)}
                disabled={showResult}
                className={`${answer.color} text-white p-8 rounded-2xl shadow-2xl transition-all text-2xl relative overflow-hidden ${
                  showCorrect ? "ring-8 ring-yellow-400 scale-105" : ""
                } ${
                  showIncorrect ? "opacity-50 scale-95" : ""
                }`}
              >
                {showCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-yellow-400/30 flex items-center justify-center"
                  >
                    <span className="text-6xl">✓</span>
                  </motion.div>
                )}
                {showIncorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-black/30 flex items-center justify-center"
                  >
                    <span className="text-6xl">✗</span>
                  </motion.div>
                )}
                <span className="relative z-10">{answer.text}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
