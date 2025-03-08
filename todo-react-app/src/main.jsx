import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";  // ✅ Import Provider
import { store } from "./redux/store";  // ✅ Import Redux Store
import App from "./App";
import "./index.css";  // ✅ Ensure Tailwind is applied

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>  {/* ✅ Wrap App with Redux Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
