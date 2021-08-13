import {lazy} from "react";

// Icons
import AirlineSeatFlatIcon from "@material-ui/icons/AirlineSeatFlat";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {ROUTES_NAME_ENUM, ROUTES_PATH_ENUM} from "constants/routesPathEnum";

// Lazy Imports
const lazyPatientsList = lazy(() => import("containers/patients/patientsList/PatientsList"));
const lazyPatientDetails = lazy(() => import("containers/patients/patientDetails/PatientDetails"));
const lazyLoginAndRegister = lazy(() => import("containers/login/LoginAndRegister"));
const lazyDoctorsList = lazy(() => import("containers/doctors/doctorsList/DoctorsList"));
const lazyDoctorDetails = lazy(() => import("containers/doctors/doctorDetails/DoctorDetails"));
const lazyAdminConsole = lazy(() => import("containers/adminConsole/AdminConsole"));

const routs = [
    {
        name: ROUTES_NAME_ENUM.AdminConsole,
        path: ROUTES_PATH_ENUM.AdminConsole,
        component: lazyAdminConsole,
        icon: SupervisorAccountIcon,
        isMain: true
    },
    {
        name: ROUTES_NAME_ENUM.PatientsList,
        path: ROUTES_PATH_ENUM.PatientsList,
        component: lazyPatientsList,
        icon: AirlineSeatFlatIcon,
        isMain: true
    },

    {
        name: ROUTES_NAME_ENUM.PatientDetails,
        path: `${ROUTES_PATH_ENUM.PatientDetails}/:id`,
        component: lazyPatientDetails,
        hidden: true
    },
    {
        name: ROUTES_NAME_ENUM.DoctorsList,
        path: ROUTES_PATH_ENUM.DoctorsList,
        component: lazyDoctorsList,
        icon: AssignmentIndIcon
    },
    {
        name: ROUTES_NAME_ENUM.DoctorDetails,
        path: `${ROUTES_PATH_ENUM.DoctorDetails}/:id`,
        component: lazyDoctorDetails,
        hidden: true
    }
].map((rout, index) => Object.assign(rout, {id: index + 1}));

export const loginPage = {
    name: ROUTES_NAME_ENUM.Login,
    path: ROUTES_PATH_ENUM.Login,
    component: lazyLoginAndRegister
};

export default routs;
