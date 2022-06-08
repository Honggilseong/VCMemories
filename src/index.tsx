import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
