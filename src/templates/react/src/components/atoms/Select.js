import React, { useState } from 'react'

const Select = ({ label, options, handleInputChange }) => {
	const [selectedOne, setSelectedOne] = useState('Select AnyOne')
	const handleInputChange = (e) => {
		setSelectedOne(e.target.value)
	}

	return (
			<div className='form-row'>
				<div className='form-group col-md-6'>
					<label>
						{label} :{selectedOne}
					</label>
					<select
						className='form-control'
						name={label}
						onChange={handleInputChange}
					>
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
