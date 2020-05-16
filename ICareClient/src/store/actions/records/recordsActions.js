import { apiCaller } from "../app/appActions";
import { APIS, HTTP_REQUEST } from "../../../constants/constants";
import {
  RECORDS_ADD_NEW_RECORD,
  RECORDS_UPDATE_RECORD,
} from "./recordsActionTypes";

export const callUpdateRecord = (record, onStart, onSuccess, onFailure) => {
  return apiCaller({
    method: HTTP_REQUEST.PUT,
    data: record,
    url: APIS.records,
    actionType: RECORDS_UPDATE_RECORD,
    onStart,
    onSuccess,
    onFailure,
    successMsg: "Record Updated Successfully",
  });
};

export const callAddNewRecord = (record, onStart, onSuccess, onFailure) => {
  return apiCaller({
    method: HTTP_REQUEST.POST,
    data: record,
    url: APIS.records,
    actionType: RECORDS_ADD_NEW_RECORD,
    onStart,
    onSuccess,
    onFailure,
    successMsg: "Record Added Successfully",
  });
};
