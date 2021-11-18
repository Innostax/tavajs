import BootstrapTable from 'react-bootstrap-table-next'

const Table = ({ keyField, data, columns }) => (
	<BootstrapTable
		bordered={false}
		keyField={keyField}
		data={data}
		columns={columns}
		rowStyle={{ color: 'red', backgroundColor: 'white' }}
	/>
)

export default Table
