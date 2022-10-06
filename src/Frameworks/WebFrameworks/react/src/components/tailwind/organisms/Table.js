const Table = ({ data, columns }) => {
	return (
		<>
			<div className='overflow-x-auto relative '>
				<table className='w-full text-sm text-left dark:text-white dark:bg-[#1d1717]'>
					<thead className='text-xs uppercase'>
						<tr>
							{columns.map((column) => {
								return (
									<th
										scope='col'
										className='py-6 px-8 dark:text-white'
										key={column.dataField}
									>
										{column.text}
									</th>
								)
							})}
						</tr>
					</thead>
					<tbody>
						{data.length === 0 ? (
							<tr>
								<td className='py-6 px-8'>
									<b>No Data to display</b>
								</td>
							</tr>
						) : (
							data.map((row) => {
								return (
									<tr className='' key={row.key}>
										<td className='py-6 px-8 '>{row.name}</td>
										<td className='py-6 px-8 '>{row.username}</td>
										<td className='py-6 px-8 '>{row.email}</td>
										<td className='py-4 px-6 flex justify-end'>
											{columns[3].formatter(row.id, row)}
										</td>
										<td className='py-4 px-6'>
											{columns[4].formatter(row.id, row)}
										</td>
									</tr>
								)
							})
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}
export default Table
