import { apiCaller } from "../app/appActions";
import { HTTP_REQUEST, APIS } from "constants/constants";
import {
  PATIENT_GET_PATIENTS_LIST,
  PATIENT_DELETE_PATIENT,
  PATIENT_GET_PATIENT_BY_ID,
  PATIENT_ADD_NEW_PATIENT,
  PATIENT_UPDATE_PATIENT,
  PATIENT_GET_PATIENT_STATISTICS
} from "./patientsActionTypes";

export const callGetPatientsList = (onStart, onSuccess, onFailure) => {
  return apiCaller({
    method: HTTP_REQUEST.GET,
    url: APIS.patients,
    actionType: PATIENT_GET_PATIENTS_LIST,
    onStart,
    onSuccess,
    onFailure
  });
};

export const callDeletePatient = (id, onStart, onSuccess, onFailure) => {
  return apiCaller(
    {
      method: HTTP_REQUEST.DELETE,
      url: `${APIS.patients}/${id}`,
      actionType: PATIENT_DELETE_PATIENT,
      onStart,
      onSuccess,
      onFailure,
      successMsg: "Deleted"
    },
    { id }
  );
};

export const callGetPatientById = (
  id,
  onStart,
  onSuccess,
  onFailure,
  query
) => {
  let url = `${APIS.patients}/${id}`;

  if (query) {
    url = url.concat(query);
  }

  return apiCaller({
    method: HTTP_REQUEST.GET,
    url: url,
    actionType: PATIENT_GET_PATIENT_BY_ID,
    onStart,
    onSuccess,
    onFailure
  });
};

export const callAddNewPatient = (patient, onStart, onSuccess, onFailure) => {
  return apiCaller({
    method: HTTP_REQUEST.POST,
    url: APIS.patients,
    data: patient,
    actionType: PATIENT_ADD_NEW_PATIENT,
    onStart,
    onSuccess,
    onFailure,
    successMsg: "Patient Added Successfully"
  });
};

export const callUpdatePatient = (patient, onStart, onSuccess, onFailure) => {
  return apiCaller({
    method: HTTP_REQUEST.PUT,
    data: patient,
    url: APIS.patients,
    actionType: PATIENT_UPDATE_PATIENT,
    onStart,
    onSuccess,
    onFailure,
    successMsg: "Patient Updated Successfully"
  });
};

export const callGetPatientStatistics = (
  patientId,
  onStart,
  onSuccess,
  onFailure
) => {
  return apiCaller({
    method: HTTP_REQUEST.GET,
    url: `${APIS.statistics}?id=${patientId}`,
    actionType: PATIENT_GET_PATIENT_STATISTICS,
    onStart,
    onSuccess,
    onFailure
  });
};
