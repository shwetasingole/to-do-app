import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ darkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login());
    navigate("/home"); // Redirect to Home after login
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
      }`}
    >
      <motion.div
        className={`p-8 rounded-lg shadow-lg w-96 transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-semibold text-center mb-6">
          {darkMode ? "🌙" : "☀️"} Welcome Back!
        </h1>

        <div className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className={`w-full border p-3 rounded-lg focus:outline-none transition-all ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={`w-full border p-3 rounded-lg focus:outline-none transition-all ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            className="w-full py-3 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-all"
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
          >
            Login
          </motion.button>

          <p className="text-center text-sm mt-2">
            Don't have an account? <span className="text-blue-500 cursor-pointer">Sign up</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
