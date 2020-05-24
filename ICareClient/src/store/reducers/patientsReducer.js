import { PURGE } from "store/actions/app/appActionTypes";
import {
  PATIENT_GET_PATIENTS_LIST_SUCCESS,
  PATIENT_DELETE_PATIENT_SUCCESS,
  PATIENT_UPDATE_PATIENT_SUCCESS,
  PATIENT_ADD_NEW_PATIENT_SUCCESS
} from "store/actions/patients/patientsActionTypes";

const initialState = {
  patientsList: []
};
const patientsReducer = (state = initialState, { data, type, id }) => {
  let updatedPatientsList = [...state.patientsList];

  switch (type) {
    case PATIENT_GET_PATIENTS_LIST_SUCCESS:
      return {
        ...state,
        patientsList: data
      };
    case PATIENT_DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        patientsList: updatedPatientsList.filter(p => p.id !== id)
      };
    case PATIENT_ADD_NEW_PATIENT_SUCCESS:
      return {
        ...state,
        patientsList: updatedPatientsList.concat(data)
      };
    case PATIENT_UPDATE_PATIENT_SUCCESS:
      updatedPatientsList = updatedPatientsList.map(patient => {
        if (patient.id === data.id) {
          return data;
        } else {
          return patient;
        }
      });
      return {
        ...state,
        patientsList: updatedPatientsList
      };
    case PURGE:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default patientsReducer;
