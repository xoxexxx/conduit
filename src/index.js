import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import Rout from "./Rout";
import { TopBar } from "./components/topBar";
import { CurrentUserProvider } from "./context/currentUser";
import { UserChecker } from "./components/userChecker";
import { FooterBar } from "./components/footerBar";

import "./index.css";


const App = () => {
  return (
    <>
      <CurrentUserProvider>
        <UserChecker>
          <HashRouter>
            <TopBar />
            <Rout />
            <FooterBar />
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
