import * as React from "react";
import ICTable from "common/table/ICTable";

interface IAdminConsoleProps {}

const AdminConsole: React.FunctionComponent<IAdminConsoleProps> = props => {

    

    return (
        <ICTable
            // onChangePage={onChangePage}
            // onChangeRowsPerPage={onChangeRowsPerPage}
            // page={pagination?.currentPage}
            // rowsPerPage={pagination?.itemsPerPage}
            // totalItems={pagination?.totalItems}
            // addPagination
            // isLoading={isLoadingData}
            // rows={tableDataRows}
            // headers={tableHeaders}
        />
    );
};

export default AdminConsole;
