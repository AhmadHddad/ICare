import {useState, useCallback, useRef} from "react";
import {PAGINATION, DEFAULT_PAGINATION_VALUES} from "constants/constants";
import {useDispatch} from "react-redux";

export function useIState(initialState) {
    const [state, setState] = useState(initialState);

    const isMounted = useRef(true);

    function setStateFunc(params) {
        if (isMounted.current) {
            setState(params);
        }
    }

    function unRegFunc() {
        isMounted.current = false;
    }

    const setStateCallback = useCallback(setStateFunc, []);
    const unRegFuncCallback = useCallback(unRegFunc, []);

    return [state, setStateCallback, unRegFuncCallback];
}

export function useFlag(initialKeys = [], initialValue = false) {
    const initialValues = {};
    initialKeys.forEach(key => {
        initialValues[key] = initialValue;
    });

    const [flags, setFlags, unReg] = useIState(initialValues);

    function getFlagFunc(flagName = String) {
        return flags[flagName];
    }

    function setFlagFunc(flagName = String, flagValue = Boolean) {
        setFlags(prev => ({...prev, [flagName]: flagValue}));
    }

    const setFlagConst = useCallback(setFlagFunc, []);

    return [getFlagFunc, setFlagConst, unReg];
}

export function useITablePagination(defaultPagination = DEFAULT_PAGINATION_VALUES) {
    const [pagination, setPagination, unReg] = useIState(defaultPagination);

    function onChangePage(newPage = 1, callback = Function) {
        setPagination({...pagination, currentPage: newPage + 1});
        callback && callback(`?${PAGINATION.pageNumber}=${newPage + 1}`);
    }

    function onChangeRowsPerPage(rowsPerPage = 5, callback = Function) {
        rowsPerPage = Number(rowsPerPage);

        callback &&
            callback(`?${PAGINATION.pageNumber}=${1}&${PAGINATION.pageSize}=${rowsPerPage}`);

        setPagination({
            ...pagination,
            itemsPerPage: rowsPerPage,
            currentPage: 1
        });
    }

    const onChangePageCallback = useCallback(onChangePage, []);
    const onChangeRowsPerPageCallback = useCallback(onChangeRowsPerPage, []);

    return [pagination, onChangePageCallback, onChangeRowsPerPageCallback, setPagination, unReg];
}
