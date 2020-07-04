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
    patients: "patients",
    records: "records",
    statistics: "patients/statistics",
    doctors: {
        getDoctors: {url: "doctors", method: HTTP_REQUEST.GET},
        getDoctorById: {url: "doctors/{id}", method: HTTP_REQUEST.GET},
        deleteDoctor: {url: "doctors/{id}", method: HTTP_REQUEST.DELETE},
        addDoctor: {url: "doctors", method: HTTP_REQUEST.POST},
        editDoctor: {url: "doctors", method: HTTP_REQUEST.PUT},
        assignPatient: {url: "doctors/{doctorId}/{patientId}", method: HTTP_REQUEST.POST}
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
