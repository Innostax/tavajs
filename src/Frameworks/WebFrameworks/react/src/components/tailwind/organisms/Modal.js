export default function ViceModal({
	children,
	open,
	handleClose,
	title,
	footer,
}) {
	return (
		<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  '>
			<div className='relative my-6 mx-auto w-96'>
				<div className='bg-white dark:text-white dark:bg-[#44403c] rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none'>
					<div className='flex items-start justify-between p-5  rounded-t '>
						<h3 className='text-3xl font-semibold '>{title}</h3>
						<button
							className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
							onClick={() => handleClose(false)}>
							<span className=' dark:text-white  h-6 w-6 text-2xl block outline-none focus:outline-none'>
								x
							</span>
						</button>
					</div>

					<div className='relative p-6 flex-auto '>
						<p className='my-4 text-lg leading-relaxed '>{children}</p>
					</div>

					<div className='flex items-center justify-end p-6 rounded-b '>
						{footer}
					</div>
				</div>
			</div>
		</div>
	)
}
