export const REGEX = {
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  number: /^[0-9][A-Za-z0-9 -]*$/
};

export const APIS = {
  login: "auth/login",
  register: "auth/register",
  patients: "patients",
  records: "records",
  statistics: "patients/statistics",
  doctors: "doctors"
};

export const MESSAGE_TYPES = {
  error: "error",
  success: "success"
};

export const HTTP_REQUEST = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
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
