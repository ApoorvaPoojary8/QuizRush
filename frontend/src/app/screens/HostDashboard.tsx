import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Plus, Play, Users, Clock, BarChart3, Settings, Home } from "lucide-react";

export function HostDashboard() {
  const navigate = useNavigate();

  const quizzes = [
    { id: 1, title: "Science Trivia", questions: 10, plays: 234, lastPlayed: "2 days ago" },
    { id: 2, title: "World Geography", questions: 15, plays: 456, lastPlayed: "1 week ago" },
    { id: 3, title: "Pop Culture 2026", questions: 12, plays: 189, lastPlayed: "3 days ago" },
    { id: 4, title: "Math Challenge", questions: 20, plays: 567, lastPlayed: "Yesterday" },
  ];

  const recentGames = [
    { pin: "123456", quiz: "Science Trivia", players: 24, date: "Today" },
    { pin: "789012", quiz: "World Geography", players: 18, date: "Yesterday" },
    { pin: "345678", quiz: "Pop Culture 2026", players: 32, date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 min-h-screen p-6"
        >
          <div className="mb-8">
            <h2 className="text-white text-2xl mb-2">BrainRush</h2>
            <p className="text-white/70 text-sm">Host Dashboard</p>
          </div>

          <nav className="space-y-2">
            {[
              { icon: Home, label: "Home", path: "/" },
              { icon: BarChart3, label: "My Quizzes", active: true },
              { icon: Plus, label: "Create New Quiz", path: "/create" },
              { icon: Clock, label: "Recent Games" },
              { icon: Settings, label: "Settings" },
            ].map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 4 }}
                onClick={() => item.path && navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-white text-4xl mb-2">My Quizzes</h1>
            <p className="text-white/70">Create, manage, and host your quiz games</p>
          </motion.div>

          {/* Create New Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/create")}
            className="mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3"
          >
            <Plus className="w-6 h-6" />
            <span className="text-lg">Create New Quiz</span>
          </motion.button>

          {/* Quizzes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white text-xl">{quiz.title}</h3>
                  <div className="bg-purple-500/30 px-3 py-1 rounded-lg">
                    <span className="text-white text-sm">{quiz.questions} Q</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{quiz.plays} plays</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Last played {quiz.lastPlayed}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/lobby/${Math.floor(100000 + Math.random() * 900000)}`)}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Game</span>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Recent Games */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-white text-2xl mb-6">Recent Games</h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left text-white/70 px-6 py-4">Game PIN</th>
                    <th className="text-left text-white/70 px-6 py-4">Quiz</th>
                    <th className="text-left text-white/70 px-6 py-4">Players</th>
                    <th className="text-left text-white/70 px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentGames.map((game, index) => (
                    <tr key={index} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                      <td className="text-white px-6 py-4">{game.pin}</td>
                      <td className="text-white px-6 py-4">{game.quiz}</td>
                      <td className="text-white px-6 py-4">{game.players}</td>
                      <td className="text-white/70 px-6 py-4">{game.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
