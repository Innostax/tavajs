const File = () => {
	return (
		<form action='/action_page.php'>
			<label htmlFor='myfile'>Select files:</label>
			<input type='file' id='myfile' name='myfile' multiple />
			<br />
			<br />
		</form>
	)
}

export default File
