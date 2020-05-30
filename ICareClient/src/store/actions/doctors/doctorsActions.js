import { APIS, HTTP_REQUEST } from "constants/constants";
import { DOCTOR_GET_DOCTORS_LIST } from "./doctorsActionTypes";

const { apiCaller } = require("store/actions/app/appActions");

export function callGetDoctors(onStart, onSuccess, onFailure) {
  return apiCaller({
    url: APIS.doctors,
    method: HTTP_REQUEST.GET,
    actionType: DOCTOR_GET_DOCTORS_LIST,
    onStart,
    onSuccess,
    onFailure
  });
}
