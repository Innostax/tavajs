import BootstrapTable from '@musicstory/react-bootstrap-table-next'

const Table = ({ keyField, data, columns }) => (
	<>

			<BootstrapTable
				bordered={false}
				keyField={keyField}
				data={data}
				columns={columns}
				noDataIndication='No Data to display'
			/>

	</>
)
export default Table
