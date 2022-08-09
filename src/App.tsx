import React from "react";
import AppRouter from "./routers";
import { BrowserRouter as Router } from "react-router-dom";
// import useLoadingWithAuth0 from "./hooks/useLoadingWithAuth0";

export default function App() {
  // const { loading } = useLoadingWithAuth0();

  return (
    <Router>
      <div>
        <AppRouter />
      </div>
    </Router>
  );
}
