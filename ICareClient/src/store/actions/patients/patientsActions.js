import {apiCaller} from "../app/appActions";
import {APIS} from "constants/constants";
import {
    PATIENT_GET_PATIENTS_LIST,
    PATIENT_DELETE_PATIENT,
    PATIENT_GET_PATIENT_BY_ID,
    PATIENT_ADD_NEW_PATIENT,
    PATIENT_EDIT_PATIENT,
    PATIENT_GET_PATIENT_STATISTICS
} from "./patientsActionTypes";
import {formatParameterizedURL} from "utils/utils";

export const callGetPatientsList = (paginationQuery, onStart, onSuccess, onFailure) => {
    let rout = APIS.patients.getPatients;

    return apiCaller({
        method: rout.method,
        url: rout.url + paginationQuery,
        actionType: PATIENT_GET_PATIENTS_LIST,
        onStart,
        onSuccess,
        onFailure
    });
};

export const callDeletePatient = (id, onStart, onSuccess, onFailure) => {
    let rout = APIS.patients.deletePatient;

    return apiCaller(
        {
            method: rout.method,
            url: formatParameterizedURL(rout.url, {id}),
            actionType: PATIENT_DELETE_PATIENT,
            onStart,
            onSuccess,
            onFailure,
            successMsg: "Deleted"
        },
        {id}
    );
};

export const callGetPatientById = (id, onStart, onSuccess, onFailure, query) => {
    let rout = {...APIS.patients.getPatientById};
    let url = rout.url;

    if (query) {
        url = rout.url.concat(query);
    }

    return apiCaller({
        method: rout.method,
        url: formatParameterizedURL(url, {id}),
        actionType: PATIENT_GET_PATIENT_BY_ID,
        onStart,
        onSuccess,
        onFailure
    });
};

export const callAddNewPatient = (patient, onStart, onSuccess, onFailure) => {
    const rout = APIS.patients.addPatients;

    return apiCaller({
        method: rout.method,
        url: rout.url,
        data: patient,
        actionType: PATIENT_ADD_NEW_PATIENT,
        onStart,
        onSuccess,
        onFailure,
        successMsg: "Patient Added Successfully"
    });
};

export const callEditPatient = (patient, onStart, onSuccess, onFailure) => {
    const rout = APIS.patients.editPatients;

    return apiCaller({
        method: rout.method,
        data: patient,
        url: rout.url,
        actionType: PATIENT_EDIT_PATIENT,
        onStart,
        onSuccess,
        onFailure,
        successMsg: "Patient Updated Successfully"
    });
};

export const callGetPatientStatistics = (patientId, onStart, onSuccess, onFailure) => {
    const rout = APIS.patients.getPatientStatistics;
    return apiCaller({
        method: rout.method,
        url: formatParameterizedURL(rout.url, {id: patientId}),
        actionType: PATIENT_GET_PATIENT_STATISTICS,
        onStart,
        onSuccess,
        onFailure
    });
};
