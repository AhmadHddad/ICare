import { PURGE } from "store/actions/app/appActionTypes";
import { RECORDS_GET_RECORDS_LIST_SUCCESS } from "../actions/records/recordsActionTypes";
const initialState = {
  recordList: [],
};
const recordsReducer = (state = initialState, { data, type }) => {
  let updatedRecordList = [...state.recordList];

  switch (type) {
    case RECORDS_GET_RECORDS_LIST_SUCCESS:

    case PURGE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default recordsReducer;
