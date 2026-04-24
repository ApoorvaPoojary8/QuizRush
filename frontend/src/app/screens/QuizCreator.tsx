import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Plus, Trash2, Save, ArrowLeft, Clock } from "lucide-react";

interface Answer {
  text: string;
  isCorrect: boolean;
  color: string;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
  timer: number;
}

export function QuizCreator() {
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "",
      answers: [
        { text: "", isCorrect: false, color: "bg-red-500" },
        { text: "", isCorrect: false, color: "bg-blue-500" },
        { text: "", isCorrect: false, color: "bg-yellow-500" },
        { text: "", isCorrect: false, color: "bg-green-500" },
      ],
      timer: 20,
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        answers: [
          { text: "", isCorrect: false, color: "bg-red-500" },
          { text: "", isCorrect: false, color: "bg-blue-500" },
          { text: "", isCorrect: false, color: "bg-yellow-500" },
          { text: "", isCorrect: false, color: "bg-green-500" },
        ],
        timer: 20,
      },
    ]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateAnswer = (qIndex: number, aIndex: number, text: string) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex].text = text;
    setQuestions(updated);
  };

  const setCorrectAnswer = (qIndex: number, aIndex: number) => {
    const updated = [...questions];
    updated[qIndex].answers = updated[qIndex].answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === aIndex,
    }));
    setQuestions(updated);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const saveQuiz = () => {
    console.log("Saving quiz:", { title: quizTitle, questions });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/dashboard")}
              className="text-white bg-white/10 backdrop-blur-lg p-3 rounded-xl hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-white text-3xl">Create Quiz</h1>
              <p className="text-white/70">Design your own quiz game</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveQuiz}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Quiz</span>
          </motion.button>
        </motion.div>

        {/* Quiz Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl mb-6"
        >
          <label className="text-white/70 mb-2 block">Quiz Title</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title..."
            className="w-full px-4 py-3 bg-white/90 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all text-lg"
          />
        </motion.div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: qIndex * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-xl">Question {qIndex + 1}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <Clock className="w-4 h-4 text-white" />
                    <input
                      type="number"
                      value={question.timer}
                      onChange={(e) => updateQuestion(qIndex, "timer", parseInt(e.target.value))}
                      className="w-16 bg-transparent text-white focus:outline-none"
                      min="5"
                      max="120"
                    />
                    <span className="text-white/70 text-sm">sec</span>
                  </div>
                  {questions.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteQuestion(qIndex)}
                      className="text-red-400 bg-red-500/20 p-2 rounded-xl hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>

              <input
                type="text"
                value={question.question}
                onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                placeholder="Enter your question..."
                className="w-full px-4 py-3 bg-white/90 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all mb-6 text-lg"
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                {question.answers.map((answer, aIndex) => (
                  <div key={aIndex} className="relative">
                    <input
                      type="text"
                      value={answer.text}
                      onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                      placeholder={`Answer ${aIndex + 1}`}
                      className={`w-full px-4 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all ${
                        answer.isCorrect ? "ring-4 ring-yellow-400" : ""
                      }`}
                    />
                    <div
                      className={`absolute top-0 right-0 w-4 h-4 ${answer.color} rounded-full -mt-1 -mr-1`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <p className="text-white/70 text-sm mb-2">Select correct answer:</p>
                <div className="flex gap-2">
                  {question.answers.map((answer, aIndex) => (
                    <motion.button
                      key={aIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCorrectAnswer(qIndex, aIndex)}
                      className={`flex-1 py-2 rounded-lg transition-all ${
                        answer.isCorrect
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {aIndex + 1}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Question Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addQuestion}
          className="w-full mt-6 bg-white/10 backdrop-blur-lg border-2 border-dashed border-white/30 text-white py-4 rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          <span className="text-lg">Add Question</span>
        </motion.button>
      </div>
    </div>
  );
}
