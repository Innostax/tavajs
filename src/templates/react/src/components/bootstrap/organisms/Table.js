import BootstrapTable from 'react-bootstrap-table-next'

const Table = ({ keyField, data, columns }) => (
	<BootstrapTable
		bordered={false}
		keyField={keyField}
		data={data}
		columns={columns}
	/>
)

export default Table
