function InputForm({ placeholder, type, onChange, id, value, name, title }) {
	return (
		<div className='items-start'>
			<span
				htmlFor={id}
				className='text-left text-md  font-semibold block py-1 px-2 mb-1 rounded dark:text-white dark:bg-[#44403c]'
			>
				{title}
			</span>
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				required
				onChange={onChange}
				value={value}
				name={name}
				className='px-2 py-1 mb-2 placeholder-slate-300 text-slate-900 relative bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring w-full'
			/>
		</div>
	)
}
export default InputForm
