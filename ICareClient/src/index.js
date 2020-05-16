import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import "./index.css";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";

//reducers
import authReducer from "./store/reducers/authReducer";
import appReducer from "store/reducers/appReducer";
import patientsReducer from "store/reducers/patientsReducer";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.headers.common = {
  Authorization: `bearer ${localStorage.getItem("token")}`,
};

const rootReducer = combineReducers({
  authReducer: authReducer,
  appReducer: appReducer,
  patientsReducer: patientsReducer,
});

// MiddleWare
const logger = store => {
  return next => {
    return action => {
      // console.log("this is Logger (Middleware)", action);
      const result = next(action);
      // console.log("Middleware next state", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
