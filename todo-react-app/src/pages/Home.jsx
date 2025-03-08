import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { BsSun, BsMoon } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { MdDateRange, MdMenu, MdClose } from "react-icons/md"; // Hamburger & Close Icons
import { FaSort, FaTasks, FaStar } from "react-icons/fa"; // Task Icons

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar State

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return isAuthenticated ? (
    <div
      className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"} min-h-screen flex`}
    >
      {/* Sidebar */}
      <aside
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } transition-all duration-300 shadow-lg flex flex-col justify-between 
        ${sidebarOpen ? "w-64 p-6" : "w-20 p-4"}`}
      >
        <div className="flex items-center justify-between">
          <h2 className={`${sidebarOpen ? "text-2xl font-bold" : "hidden"}`}>
            Dashboard
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-2xl focus:outline-none"
          >
            {sidebarOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        <ul className="space-y-4 mt-6">
          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
            <FaTasks />
            {sidebarOpen && "All Tasks"}
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
            <MdDateRange />
            {sidebarOpen && "Today"}
          </li>
          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
            <FaStar />
            {sidebarOpen && "Important"}
          </li>
        </ul>

        <div className="flex flex-col gap-4 mt-auto">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md transition-all"
          >
            {darkMode ? <BsSun /> : <BsMoon />} {sidebarOpen && (darkMode ? "Light Mode" : "Dark Mode")}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md transition-all hover:bg-red-600"
          >
            <FiLogOut /> {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? "ml-0" : "ml-0 md:ml-20"}`}>
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">To-Do List</h1>
         
        </div>

        <TaskInput darkMode={darkMode} />
        <TaskList darkMode={darkMode} />
      </main>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">Access Denied</h2>
        <p className="text-lg text-gray-600 mt-2">Please login to view tasks.</p>
      </div>
    </div>
  );
};

export default Home;
