import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login functionality
    console.log("Login data:", formData);
    navigate("/");
  };

  const isValid = formData.email && formData.password;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex flex-col p-6">
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
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-white/90 text-lg">
                Log in to continue your journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email input */}
              <motion.div
                className="bg-white rounded-2xl p-5 shadow-xl"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-gray-600 font-semibold mb-2 text-sm">
                  Email
                </label>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="flex-1 text-lg focus:outline-none"
                  />
                </div>
              </motion.div>

              {/* Password input */}
              <motion.div
                className="bg-white rounded-2xl p-5 shadow-xl"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-600 font-semibold mb-2 text-sm">
                  Password
                </label>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    className="flex-1 text-lg focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Forgot password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-white/90 text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login button */}
              <motion.button
                type="submit"
                disabled={!isValid}
                className="w-full bg-white text-indigo-600 rounded-2xl p-6 shadow-xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={isValid ? { scale: 1.05 } : {}}
                whileTap={isValid ? { scale: 0.95 } : {}}
              >
                Log In
              </motion.button>
            </form>

            {/* Signup link */}
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-white/90">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="font-bold underline"
                >
                  Sign Up
                </button>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
