import { createSlice } from "@reduxjs/toolkit";

const loadAuth = () => localStorage.getItem("isAuthenticated") === "true";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: loadAuth() },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
