import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const ImportantTasks = ({ darkMode }) => {
  const tasks = useSelector((state) => state.tasks);

  const highPriorityTasks = tasks.filter((task) => task.priority === "High");

  return (
    <div className="mt-6">
      <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
        🔥 Important Tasks
      </h2>
      <div className="space-y-4">
        {highPriorityTasks.length === 0 ? (
          <p className="text-center text-gray-500">No important tasks</p>
        ) : (
          highPriorityTasks.map((task) => <TaskItem key={task.id} task={task} darkMode={darkMode} />)
        )}
      </div>
    </div>
  );
};

export default ImportantTasks;
