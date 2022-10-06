const { exec } = require('child_process')
const fs = require('fs')

if (!fs.existsSync('node_modules')) {
	if (fs.existsSync('package.json')) {
		console.log('installing node_modules...')
		const process = exec('npm install', (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`)
				return
			}
			console.log(`${stdout}`)
		})
	} else {
		console.log('installing node_modules...')
		const process = exec('yarn install', (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`)
				return
			}
			console.log(`stdout: ${stdout}`)
			console.error(`stderr: ${stderr}`)
		})
	}
}
