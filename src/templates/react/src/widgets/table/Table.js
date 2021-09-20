import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import './Table.css'

const Table = ({
	columns,
	data = [],
	keyField,
	...props
}) => {
	return (
		<BootstrapTable
			keyField={keyField}
			data={data}
			columns={columns}
			// wrapperClasses='table-responsive mb-25'
			{...props}
		/>
	)
}

export default Table
