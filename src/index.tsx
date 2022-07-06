import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-pwaq157w.us.auth0.com"
        clientId="VM9GUpn2ItQ6h4h9pZx7ALmTDO8O5MNE"
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
