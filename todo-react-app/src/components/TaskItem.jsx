import { useDispatch } from "react-redux";
import { deleteTask, prioritizeTask, toggleTaskCompletion } from "../redux/features/taskSlice";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const TaskItem = ({ task, darkMode }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(task.completed || false);

  const getPriorityColor = (priority) => {
    switch (priority.trim()) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-black";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleCompletionToggle = () => {
    setCompleted(!completed);
    dispatch(toggleTaskCompletion(task.id));
  };

  return (
    <div
      className={`flex flex-col  gap-3 md:flex-row justify-between items-center p-4 rounded-lg shadow-md transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } ${completed ? "opacity-50 line-through" : ""}`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="mr-4 cursor-pointer"
        checked={completed}
        onChange={handleCompletionToggle}
      />

      {/* Task Description */}
      <span className="text-lg font-medium flex-1">{task.text}</span>

      {/* Priority Selector */}
      <div className="relative">
        <select
          className={`appearance-none px-4 py-2 text-base font-medium rounded-lg cursor-pointer border-2 transition-all ${getPriorityColor(
            task.priority
          )}`}
          value={task.priority.trim()}
          onChange={(e) =>
            dispatch(prioritizeTask({ id: task.id, priority: e.target.value }))
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <BsChevronDown
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-current opacity-70 pointer-events-none"
          size={16}
        />
      </div>

      {/* Delete Button */}
      <button
        className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
        onClick={() => dispatch(deleteTask(task.id))}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
