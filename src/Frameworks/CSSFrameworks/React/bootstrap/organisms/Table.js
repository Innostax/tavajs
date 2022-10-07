import BootstrapTable from "@musicstory/react-bootstrap-table-next";

const Table = ({ keyField, data, columns }) => {
    return (
        <BootstrapTable
            bordered={false}
            keyField={keyField}
            data={data}
            columns={columns}
            noDataIndication='No Data to display'
            wrapperClasses='table-responsive'
        />
    );
}
export default Table;
