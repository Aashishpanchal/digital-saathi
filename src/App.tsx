import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AppRouter from "./routers";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  const isDarkMode = useSelector((state: RootState) => state.themeSlice.isDark);
  return (
    <Router>
      <div className={`${isDarkMode ? "dark" : "light"}`}>
        <AppRouter />
      </div>
    </Router>
  );
}
