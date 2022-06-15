import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AppRouter from "./routers";

export default function App() {
  const isDarkMode = useSelector((state: RootState) => state.themeSlice.isDark);
  return (
    <div className={`${isDarkMode ? "dark" : "light"}`}>
      <AppRouter />
    </div>
  );
}
