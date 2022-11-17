import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import Rout from "./Rout";
import { TopBar } from "./components/topBar";
import { CurrentUserProvider } from "./context/currentUser";
import { UserChecker } from "./components/userChecker";

import "./index.css";

const App = () => {
  return (
    <>
      <CurrentUserProvider>
        <UserChecker>
          <HashRouter>
            <TopBar />
            <Rout />
          </HashRouter>
        </UserChecker>
      </CurrentUserProvider>
    </>
  );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
