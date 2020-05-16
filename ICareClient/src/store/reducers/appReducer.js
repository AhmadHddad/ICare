import { PURGE, SHOW_MESSAGE } from "store/actions/app/appActionTypes";

const initialState = {
  message: null,
};
const appReducer = (state = initialState, { type, message }) => {
  switch (type) {
    case PURGE:
      return {
        ...initialState,
      };
    case SHOW_MESSAGE: {
      return {
        ...state,
        message: message,
      };
    }
    default:
      return state;
  }
};

export default appReducer;
