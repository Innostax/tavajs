import Dropzone from 'react-dropzone'
import Button from './Button'

const File = ({ setUploadedFiles, uploadFiletypes }) => {
	const onDropHandle = (acceptedFiles) => {
		const uploads = []
		acceptedFiles &&
			acceptedFiles.forEach((file) => {
				const reader = new FileReader()
				reader.onload = (r) => {
					uploads.push({
						base64Data: r.target.result,
						fileName: file.name,
						fileType: file.type,
						size: file.size,
					})
					setUploadedFiles(uploads)
				}
				reader.readAsDataURL(file)
			})
	}
	return (
		<Dropzone onDrop={onDropHandle} accept={uploadFiletypes}>
			{({ getRootProps, getInputProps }) => (
				<section>
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						<div className='d-flex align-items-center'>
							<div className='flex-fill mr-3'>Please upload your Files</div>
							<Button variant='rounded-lg' />
						</div>
					</div>
				</section>
			)}
		</Dropzone>
	)
}

export default File
