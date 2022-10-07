import MaterialReactTable from "material-react-table";

const Table = ({ data, columns }) => {
    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnFilter={false}
            showColumnFilters={false}
            enablePagination={false}
            enableGlobalFilter={false}
            enableHiding={false}
            enableGlobalFilterRankedResults={false}
            enableMultiSort={false}
            enableSorting={false}
            enableColumnActions={false}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            enableTopToolbar={false}
            enableBottomToolbar={false}
            enableTableFooter={false}
        />
    );
}
export default Table;
