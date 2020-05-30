import { combineReducers } from "redux";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import patientsReducer from "./patientsReducer";
import doctorsReducer from "./doctorsReducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  appReducer: appReducer,
  patientsReducer: patientsReducer,
  doctorsReducer: doctorsReducer
});

export default rootReducer;
