import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/features/taskSlice";
import { getTaskSuggestion } from "../utils/api";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa"; // Calendar Icon

const TaskInput = ({ darkMode }) => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Low");
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState(""); // Task Due Date
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    if (!taskText.trim() || !dueDate) return;

    setLoading(true);
    setSuggestion(null); 

    try {
      const aiResponse = await getTaskSuggestion(taskText, priority);
      setSuggestion(aiResponse || "No AI suggestions available.");
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
      setSuggestion("Failed to fetch AI suggestions.");
    }

    dispatch(
      addTask({
        id: Date.now(),
        text: taskText,
        priority,
        date: dueDate, // Store Task Due Date
      })
    );
    setTaskText("");
    setPriority("Low");
    setDueDate("");
    setLoading(false);
  };

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">Add a Task</h2>

      {/* Task Input Fields */}
      <div className="grid  md:grid-cols-12 flex-row gap-4 items-center">
        <input
          type="text"
          className={`w-full md:col-span-7 px-4 py-3 rounded-lg border-2 outline-none transition-all ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-gray-100 border-gray-300 text-black"
          }`}
          placeholder="Enter a task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />

        {/* Date Picker */}
        <div className="relative w-full md:col-span-2">
          <input
            type="date"
            className={`w-full px-4 py-3 rounded-lg border-2 cursor-pointer transition-all text-gray-800 ${darkMode ? "text-white":"text-black"}`}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Priority Dropdown */}
        <select
          className={`w-full md:w-auto px-4 py-3 rounded-lg border-2 cursor-pointer ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-gray-100 border-gray-300 text-black"
          }`}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Add Button */}
        <button
          className="w-full md:col-span-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md"
          onClick={handleAddTask}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Add Task"}
        </button>
      </div>

      {/* AI Suggestion Display */}
      {suggestion && (
        <motion.div
          className="mt-4 p-4 bg-gray-100 text-gray-700 italic rounded-xl shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {Array.isArray(suggestion) ? (
            <ul>
              {suggestion.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          ) : (
            <p>{suggestion}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskInput;
