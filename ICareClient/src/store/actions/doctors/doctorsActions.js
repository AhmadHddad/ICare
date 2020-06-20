import {APIS} from "constants/constants";
import {
    DOCTOR_GET_DOCTORS_LIST,
    DOCTOR_ADD_DOCTOR,
    DOCTOR_DELETE_DOCTOR
} from "./doctorsActionTypes";

const {apiCaller} = require("store/actions/app/appActions");

export function callGetDoctors(onStart, onSuccess, onFailure) {
    return apiCaller({
        url: APIS.doctors.getDoctors.url,
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
        url: api.url.replace("{id}", id),
        method: api.method,
        actionType: DOCTOR_DELETE_DOCTOR,
        onStart,
        onSuccess,
        onFailure
    });
}
