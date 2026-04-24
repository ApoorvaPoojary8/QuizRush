import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";

// Mock quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    timeLimit: 20,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    timeLimit: 20,
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
    timeLimit: 20,
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"],
    correctAnswer: 1,
    timeLimit: 20,
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    timeLimit: 20,
  },
];

const answerColors = [
  { bg: "bg-red-500", hover: "hover:bg-red-600", border: "border-red-600" },
  { bg: "bg-blue-500", hover: "hover:bg-blue-600", border: "border-blue-600" },
  { bg: "bg-yellow-500", hover: "hover:bg-yellow-600", border: "border-yellow-600" },
  { bg: "bg-green-500", hover: "hover:bg-green-600", border: "border-green-600" },
];

export function QuizQuestion() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quizQuestions[0].timeLimit);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && selectedAnswer === null) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && selectedAnswer === null) {
      handleTimeout();
    }
  }, [timeLeft, selectedAnswer]);

  const handleTimeout = () => {
    setShowFeedback(true);
    setTimeout(moveToNextQuestion, 2000);
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === currentQuestion.correctAnswer) {
      const points = Math.ceil((timeLeft / currentQuestion.timeLimit) * 1000);
      setScore(score + points);
    }

    setTimeout(moveToNextQuestion, 2000);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(quizQuestions[currentQuestionIndex + 1].timeLimit);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz finished
      navigate("/result", { state: { score, totalQuestions: quizQuestions.length } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex flex-col p-6">
      {/* Timer bar */}
      <div className="mb-6">
        <div className="bg-white/30 rounded-full h-3 overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / currentQuestion.timeLimit) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-white font-bold text-sm">
            Question {currentQuestionIndex + 1}/{quizQuestions.length}
          </span>
          <span className="text-white font-bold text-lg">
            ⏱️ {timeLeft}s
          </span>
        </div>
      </div>

      {/* Score */}
      <div className="mb-6 text-center">
        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
          <span className="text-white font-bold text-xl">Score: {score}</span>
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col justify-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, index) => {
              const color = answerColors[index];
              const isCorrect = index === currentQuestion.correctAnswer;
              const isSelected = selectedAnswer === index;
              const shouldShowCorrect = showFeedback && isCorrect;
              const shouldShowWrong = showFeedback && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`${color.bg} ${selectedAnswer === null ? color.hover : ""} text-white rounded-2xl p-6 shadow-xl font-bold text-lg flex items-center justify-between transition-all disabled:cursor-not-allowed relative overflow-hidden`}
                  whileHover={selectedAnswer === null ? { scale: 1.03 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="flex-1 text-left">{option}</span>
                  {shouldShowCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                  )}
                  {shouldShowWrong && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                    >
                      <XCircle className="w-8 h-8" />
                    </motion.div>
                  )}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 border-4 border-white rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="mt-6 bg-white/30 rounded-full h-2 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
