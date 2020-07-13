import {useState, useCallback} from "react";
import {PAGINATION, DEFAULT_PAGINATION_VALUES} from "constants/constants";

export function useFlag(initialKeys = [], initialValue = false) {
    const initialValues = {};
    initialKeys.forEach(key => {
        initialValues[key] = initialValue;
    });

    const [flags, setFlags] = useState(initialValues);

    const getFlagFunc = useCallback(
        function (flagName = String) {
            return flags[flagName];
        },
        [flags]
    );

    const setFlagFunc = useCallback(
        function (flagName = String, flagValue = Boolean) {
            setFlags({...flags, [flagName]: flagValue});
        },
        [flags]
    );

    return [getFlagFunc, setFlagFunc];
}

export function useITablePagination(defaultPagination = DEFAULT_PAGINATION_VALUES) {
    const [pagination, setPagination] = useState(defaultPagination);

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

    return [pagination, onChangePage, onChangeRowsPerPage, setPagination];
}
