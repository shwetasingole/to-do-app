import { createSlice } from "@reduxjs/toolkit";

// Load tasks from localStorage
const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadTasks(),
  reducers: {
    addTask: (state, action) => {
      const newState = [...state, action.payload];
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    deleteTask: (state, action) => {
      const newState = state.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    prioritizeTask: (state, action) => {
      const { id, priority } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.priority = priority;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    updateTaskDate: (state, action) => {
      const { id, date } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.date = date;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },
  },
});

export const { addTask, deleteTask, prioritizeTask, toggleTaskCompletion, updateTaskDate } = taskSlice.actions;
export default taskSlice.reducer;
