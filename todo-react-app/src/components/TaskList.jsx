import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { useState } from "react";

const TaskList = ({ darkMode }) => {
  const tasks = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState("all");

  // Get today's date
  const today = new Date().toISOString().split("T")[0];

  // Filter tasks based on selected filter
  const filterTasks = (tasks, filter) => {
    return tasks.filter((task) => {
      const taskDate = task.date || today; // Default to today if no date is set

      if (filter === "today") return taskDate === today;
      if (filter === "future") return taskDate > today;
      if (filter === "past") return taskDate < today;
      return true; // Show all tasks
    });
  };

  const sortedTasks = filterTasks(tasks, filter);

  return (
    <div className="mt-6">
      {/* Sorting Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
          Your Tasks
        </h2>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "today" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setFilter("today")}
          >
            Today
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "future" ? "bg-green-500 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setFilter("future")}
          >
            Future
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              filter === "past" ? "bg-red-500 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setFilter("past")}
          >
            Past
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className={`max-h-[400px] overflow-y-auto rounded-lg p-2 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {sortedTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks to display</p>
        ) : (
          <div className="space-y-4">
            {sortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
