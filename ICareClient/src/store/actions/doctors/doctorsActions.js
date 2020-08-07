import {APIS} from "constants/constants";
import {
    DOCTOR_GET_DOCTORS_LIST,
    DOCTOR_ADD_DOCTOR,
    DOCTOR_DELETE_DOCTOR,
    DOCTOR_GET_DOCTOR_BY_ID,
    DOCTOR_EDIT_DOCTOR,
    DOCTOR_GET_ASSIGNED_PATIENTS,
    DOCTOR_ASSIGN_PATIENT
} from "./doctorsActionTypes";
import {formatParameterizedURL} from "utils/utils";

const {apiCaller} = require("store/actions/app/appActions");

export function callGetDoctors(paginationQuery, onStart, onSuccess, onFailure) {
    return apiCaller({
        url: APIS.doctors.getDoctors.url + paginationQuery,
        method: APIS.doctors.getDoctorById.method,
        actionType: DOCTOR_GET_DOCTORS_LIST,
        onStart,
        onSuccess,
        onFailure
    });
}

export function callAddDoctor(data, onStart, onSuccess, onFailure) {
    const api = APIS.doctors.addDoctor;
    return apiCaller({
        data,
        url: api.url,
        method: api.method,
        actionType: DOCTOR_ADD_DOCTOR,
        onStart,
        onSuccess,
        onFailure
    });
}

export function callDeleteDoctor(id, onStart, onSuccess, onFailure) {
    const api = APIS.doctors.deleteDoctor;
    return apiCaller({
        url: formatParameterizedURL(api.url, {id}),
        method: api.method,
        actionType: DOCTOR_DELETE_DOCTOR,
        onStart,
        onSuccess,
        onFailure
    });
}

export function callGetDoctorById(id, onStart, onSuccess, onFailure) {
    const api = APIS.doctors.getDoctorById;
    return apiCaller({
        url: formatParameterizedURL(api.url, {id}),
        method: api.method,
        actionType: DOCTOR_GET_DOCTOR_BY_ID,
        onStart,
        onSuccess,
        onFailure
    });
}

export function callGetAssignedPatients(id, query, onStart, onSuccess, onFailure) {
    const api = APIS.doctors.getAssignedPatients;

    query = query || "";

    return apiCaller({
        url: formatParameterizedURL(api.url, {id}) + `${query}`,
        method: api.method,
        actionType: DOCTOR_GET_ASSIGNED_PATIENTS,
        onStart,
        onSuccess,
        onFailure
    });
}

export function callEditDoctor(data, onStart, onSuccess, onFailure) {
    const api = APIS.doctors.editDoctor;
    return apiCaller({
        data,
        url: api.url,
        method: api.method,
        actionType: DOCTOR_EDIT_DOCTOR,
        onStart,
        onSuccess,
        onFailure,
        successMsg: "Doctor Updated Successfully"
    });
}

export function callAssignPatient(doctorId, patientId, onStart, onSuccess, onFailure) {
    const api = APIS.doctors.assignPatient;
    return apiCaller({
        url: formatParameterizedURL(api.url, {doctorId, patientId}),
        method: api.method,
        actionType: DOCTOR_ASSIGN_PATIENT,
        onStart,
        onSuccess,
        onFailure
    });
}
