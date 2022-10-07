import React from 'react'

function Select({ label, options, onChange, value }) {
	return (
		<div className='form-row'>
			<div className='form-group col-md-6'>
				<label>
					{label}
					{value}
				</label>
				<select className='form-control' name={label} onChange={onChange}>
					{options.map((each) => (
						<option value={each.value} key={each.value}>
							{each.name}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default Select
