export const REGEX = {
    email: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
    number: /^[0-9][A-Za-z0-9 -]*$/
};

export const HTTP_REQUEST = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
};

export const APIS = {
    login: "auth/login",
    register: "auth/register",
    records: "records",
    doctors: {
        getDoctors: {url: "doctors", method: HTTP_REQUEST.GET},
        getDoctorById: {url: "doctors/{id}", method: HTTP_REQUEST.GET},
        getAssignedPatients: {url: "doctors/{id}/assigned", method: HTTP_REQUEST.GET},
        getUnAssignedPatientsToDoctor: {url: "doctors/{id}/unAssigned", method: HTTP_REQUEST.GET},
        deleteDoctor: {url: "doctors/{id}", method: HTTP_REQUEST.DELETE},
        addDoctor: {url: "doctors", method: HTTP_REQUEST.POST},
        editDoctor: {url: "doctors", method: HTTP_REQUEST.PUT},
        deleteAssignedPatient: {url: "doctors/{doctorId}/{patientId}", method: HTTP_REQUEST.DELETE},
        assignPatient: {url: "doctors/{doctorId}/{patientId}", method: HTTP_REQUEST.POST}
    },
    patients: {
        getPatients: {url: "patients", method: HTTP_REQUEST.GET},
        editPatients: {url: "patients", method: HTTP_REQUEST.PUT},
        addPatients: {url: "patients", method: HTTP_REQUEST.POST},
        getPatientById: {url: "patients/{id}", method: HTTP_REQUEST.GET},
        deletePatient: {url: "patients/{id}", method: HTTP_REQUEST.DELETE},
        getPatientStatistics: {url: "patients/statistics/{id}", method: HTTP_REQUEST.GET}
    }
};

export const MESSAGE_TYPES = {
    error: "error",
    success: "success"
};

export const PAGINATION = {
    pageNumber: "pageNumber",
    pageSize: "pageSize"
};

export const DEFAULT_PAGINATION_VALUES = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 5
};
