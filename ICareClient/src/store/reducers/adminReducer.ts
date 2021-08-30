import {IReducerOtherParams} from "interfaces/IReducer";
import {PURGE} from "store/actions/app/appActionTypes";

const initialState = {
    usersList: []
};

function adminReducer(state = initialState, {type}: IReducerOtherParams<any>) {
    switch (type) {
        case PURGE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}

export default adminReducer;
