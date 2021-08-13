import {lazy} from "react";

// Icons
import AirlineSeatFlatIcon from "@material-ui/icons/AirlineSeatFlat";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import {ROUTES_NAME_ENUM, ROUTES_PATH_ENUM} from "constants/routesPathEnum";

// Lazy Imports
const lazyPatientsList = lazy(() => import("containers/patients/patientsList/PatientsList"));
const lazyPatientDetails = lazy(() => import("containers/patients/patientDetails/PatientDetails"));
const lazyLoginAndRegister = lazy(() => import("containers/login/LoginAndRegister"));
const lazyDoctorsList = lazy(() => import("containers/doctors/doctorsList/DoctorsList"));
const lazyDoctorDetails = lazy(() => import("containers/doctors/doctorDetails/DoctorDetails"));

const routs = [
    {
        id: 1,
        name: ROUTES_NAME_ENUM.PatientsList,
        path: ROUTES_PATH_ENUM.PatientsList,
        component: lazyPatientsList,
        icon: AirlineSeatFlatIcon,
        isMain: true
    },
    {
        id: 1,
        name: ROUTES_NAME_ENUM.AdminConsole,
        path: ROUTES_PATH_ENUM.AdminConsole,
        component: lazyPatientsList,
        icon: AirlineSeatFlatIcon,
        isMain: true
    },
    {
        id: 2,
        name: ROUTES_NAME_ENUM.PatientDetails,
        path: `${ROUTES_PATH_ENUM.PatientDetails}/:id`,
        component: lazyPatientDetails,
        hidden: true
    },
    {
        id: 3,
        name: ROUTES_NAME_ENUM.DoctorsList,
        path: ROUTES_PATH_ENUM.DoctorsList,
        component: lazyDoctorsList,
        icon: AssignmentIndIcon
    },
    {
        id: 4,
        name: ROUTES_NAME_ENUM.DoctorDetails,
        path: `${ROUTES_PATH_ENUM.DoctorDetails}/:id`,
        component: lazyDoctorDetails,
        hidden: true
    }
];

export const loginPage = {
    name: ROUTES_NAME_ENUM.Login,
    path: ROUTES_PATH_ENUM.Login,
    component: lazyLoginAndRegister
};

export default routs;
