import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";

// require dentro do ternário: o webpack descarta o ramo não usado, então a build do tutorial
// não leva o código do Portal.
const ALVO = process.env.REACT_APP_ALVO;
const Raiz = ALVO === "tutorial-termo"
  ? require("./Pages/Guia/TutorialTermo").default
  : ALVO === "tutorial-helpdesk"
    ? require("./Pages/Guia/TutorialHelpdesk").default
    : require("./App").default;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Raiz />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
