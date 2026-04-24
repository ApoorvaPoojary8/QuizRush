import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, Check, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  points: number;
}

export function CreateQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    timeLimit: 20,
    points: 1000,
  });

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleSave = () => {
    // Mock save functionality
    console.log("Question saved:", currentQuestion);
    // Reset form
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      timeLimit: 20,
      points: 1000,
    });
  };

  const isValid =
    currentQuestion.question.trim() &&
    currentQuestion.options.every((opt) => opt.trim());

  const optionColors = [
    "border-red-400 focus:border-red-500 bg-red-50",
    "border-blue-400 focus:border-blue-500 bg-blue-50",
    "border-yellow-400 focus:border-yellow-500 bg-yellow-50",
    "border-green-400 focus:border-green-500 bg-green-50",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={() => navigate("/")}
          className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </motion.button>

        <motion.h1
          className="text-2xl font-bold text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Create Quiz
        </motion.h1>

        <div className="w-12" />
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Question input */}
          <motion.div
            className="bg-white rounded-3xl p-6 shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-gray-700 font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Question
            </label>
            <textarea
              value={currentQuestion.question}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, question: e.target.value })
              }
              placeholder="Enter your question here..."
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none resize-none"
              rows={3}
            />
          </motion.div>

          {/* Answer options */}
          <motion.div
            className="bg-white rounded-3xl p-6 shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-700 font-bold mb-4">
              Answer Options
            </label>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-colors ${optionColors[index]}`}
                    />
                  </div>
                  <button
                    onClick={() =>
                      setCurrentQuestion({ ...currentQuestion, correctAnswer: index })
                    }
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      currentQuestion.correctAnswer === index
                        ? "bg-green-500 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <Check className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              ✓ Click the checkmark to select the correct answer
            </p>
          </motion.div>

          {/* Settings */}
          <motion.div
            className="bg-white rounded-3xl p-6 shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-700 font-bold mb-4">
              Settings
            </label>

            {/* Time limit */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Time Limit
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {currentQuestion.timeLimit}s
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={currentQuestion.timeLimit}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    timeLimit: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-blue-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10s</span>
                <span>60s</span>
              </div>
            </div>

            {/* Points */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Points
                </span>
                <span className="text-2xl font-bold text-yellow-600">
                  {currentQuestion.points}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={currentQuestion.points}
                onChange={(e) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    points: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-yellow-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-yellow-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>100</span>
                <span>2000</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex gap-3">
        <motion.button
          onClick={handleSave}
          disabled={!isValid}
          className="flex-1 bg-white text-purple-600 rounded-2xl p-5 shadow-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.95 } : {}}
        >
          <Plus className="w-6 h-6" />
          Add Question
        </motion.button>

        <motion.button
          onClick={() => navigate("/")}
          className="bg-white/20 backdrop-blur-sm text-white rounded-2xl px-6 shadow-xl font-bold text-lg border-2 border-white/40"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Done
        </motion.button>
      </div>
    </div>
  );
}
