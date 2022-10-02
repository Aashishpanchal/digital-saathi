import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// node libraries
import "regenerator-runtime/runtime";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
// material libraries
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
