import { useEffect, useState } from 'react'
import '../index.css'

const NetworkStatus = () => {
	const [online, isOnline] = useState(navigator.onLine)
	const [test, setTest] = useState(false)

	const setOnline = () => {
		isOnline(true)
		setTest(true)
		setTimeout(() => {
			setTest(false)
		}, 1000)
	}
	const setOffline = () => {
		isOnline(false)
	}

	// Register the event listeners

	useEffect(() => {
		window.addEventListener('offline', setOffline)
		window.addEventListener('online', setOnline)
		console.log('hello')

		// cleanup if we unmount
		return () => {
			console.log('hello return')
			window.removeEventListener('offline', setOffline)
			window.removeEventListener('online', setOnline)
		}
	}, [online])
	return (
		<div>
			{!online && (
				<div className='msg offline-msg'>
					<div className='icon'>
						<span></span>
					</div>
					<div className='content'>
						<div>
							{' '}
							<strong>Offline : </strong> Connection lost! You are not connected
							to internet
						</div>
					</div>
				</div>
			)}
			{test && (
				<div className='msg online-msg'>
					<div className='icon'>
						<img src='https://img.icons8.com/office/40/000000/high-connection.png' />
					</div>
					<div className='content'>
						<div>
							<strong>Online : </strong>Back to online
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default NetworkStatus
