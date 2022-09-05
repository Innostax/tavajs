import {
	Table as TableMUI,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material'
import Delete from './DeleteConfirmation'

const Table = ({ keyField, data, columns }) => {
	return (
		<TableContainer component={Paper}>
			<TableMUI sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						{columns.map((column) => {
							return <TableCell key={column.dataField}>{column.text}</TableCell>
						})}
					</TableRow>
				</TableHead>
				<TableBody>
				{data.length === 0 ? (
						<TableCell sx={{ display: 'flex' }}>
							<b>No Data to display</b>
						</TableCell>
					) : (
						data.map((row) => {
							return (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.username}</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>
										<Delete id={row.id} />
									</TableCell>
									<TableCell>{columns[4].formatter(row.id, row)}</TableCell>
								</TableRow>
							)
						})
					)}
				</TableBody>
			</TableMUI>
		</TableContainer>
	)
}
export default Table
