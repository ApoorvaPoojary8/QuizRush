import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Trophy, Medal, Award, Crown } from "lucide-react";

// Mock leaderboard data
const leaderboardData = [
  { id: 1, name: "You", score: 4250, rank: 3, isCurrentUser: true },
  { id: 2, name: "Alex Johnson", score: 4890, rank: 1, isCurrentUser: false },
  { id: 3, name: "Sarah Miller", score: 4560, rank: 2, isCurrentUser: false },
  { id: 4, name: "Mike Chen", score: 3980, rank: 4, isCurrentUser: false },
  { id: 5, name: "Emma Davis", score: 3750, rank: 5, isCurrentUser: false },
  { id: 6, name: "James Wilson", score: 3420, rank: 6, isCurrentUser: false },
  { id: 7, name: "Lisa Brown", score: 3100, rank: 7, isCurrentUser: false },
  { id: 8, name: "Tom Anderson", score: 2890, rank: 8, isCurrentUser: false },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-400" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-orange-600" />;
    default:
      return null;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "from-yellow-400 to-orange-400";
    case 2:
      return "from-gray-300 to-gray-400";
    case 3:
      return "from-orange-400 to-orange-600";
    default:
      return "from-blue-400 to-purple-400";
  }
};

export function LiveScore() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col p-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-3xl p-4 mb-4">
          <Trophy className="w-12 h-12 text-yellow-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-white/90 text-lg">Top performers</p>
      </motion.div>

      {/* Leaderboard */}
      <div className="flex-1 space-y-3 mb-6">
        {leaderboardData.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div
              className={`${
                player.isCurrentUser
                  ? "bg-white border-4 border-yellow-400 shadow-2xl scale-105"
                  : "bg-white/95 border-2 border-white/20"
              } rounded-2xl p-5 flex items-center gap-4 transition-all`}
            >
              {/* Rank */}
              <div className="flex-shrink-0">
                {player.rank <= 3 ? (
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${getRankColor(
                      player.rank
                    )} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    {getRankIcon(player.rank)}
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow">
                    <span className="text-xl font-bold text-gray-700">
                      {player.rank}
                    </span>
                  </div>
                )}
              </div>

              {/* Player info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`font-bold text-lg ${
                      player.isCurrentUser ? "text-purple-600" : "text-gray-800"
                    }`}
                  >
                    {player.name}
                  </h3>
                  {player.isCurrentUser && (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                      YOU
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getRankColor(
                        player.rank
                      )}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(player.score / 5000) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="flex-shrink-0">
                <div className="text-right">
                  <div
                    className={`text-2xl font-bold ${
                      player.isCurrentUser ? "text-purple-600" : "text-gray-800"
                    }`}
                  >
                    {player.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action button */}
      <motion.button
        onClick={() => navigate("/result")}
        className="w-full bg-white text-purple-600 rounded-2xl p-6 shadow-xl font-bold text-xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Results
      </motion.button>
    </div>
  );
}
