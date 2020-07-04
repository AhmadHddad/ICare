import {PURGE} from "store/actions/app/appActionTypes";
import {
    DOCTOR_GET_DOCTORS_LIST_SUCCESS,
    DOCTOR_ADD_DOCTOR_SUCCESS,
    DOCTOR_DELETE_DOCTOR_SUCCESS,
    DOCTOR_EDIT_DOCTOR_SUCCESS
} from "store/actions/doctors/doctorsActionTypes";
import {updateEntityList} from "utils/reducerUtils";

const initialState = {
    doctorsList: []
};
const doctorsReducer = (state = initialState, {data, type, id}) => {
    let updatedDoctorsList = [...state.doctorsList];

    switch (type) {
        case DOCTOR_GET_DOCTORS_LIST_SUCCESS:
            updatedDoctorsList = data;
            return {
                ...state,
                doctorsList: updatedDoctorsList
            };

        case DOCTOR_ADD_DOCTOR_SUCCESS:
            updatedDoctorsList.push(data);
            return {
                ...state,
                doctorsList: updatedDoctorsList
            };
        case DOCTOR_DELETE_DOCTOR_SUCCESS:
            return {
                ...state,
                doctorsList: updatedDoctorsList.fill()
            };
        case DOCTOR_EDIT_DOCTOR_SUCCESS: {
            updatedDoctorsList = updateEntityList(updatedDoctorsList, data);
            console.log("doctorsReducer -> updatedDoctorsList", updatedDoctorsList);

            return {
                ...state,
                doctorsList: updatedDoctorsList
            };
        }
        case PURGE:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default doctorsReducer;
