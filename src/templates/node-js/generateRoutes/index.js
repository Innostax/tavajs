#! node
const inquirer = require('inquirer')
const fs = require('fs')
const fsExtra = require('fs-extra')
const CURR_DIR = process.cwd()
const path = require('path')

const shell = require('shelljs')
const QUESTIONS = [
	{
		name: 'routeName',
		type: 'input',
		message: 'what will be the Service name?',
		validate: function (input) {
			if (/^([A-Za-z\-\_\d])+$/.test(input)) return true
			else
				return 'Route name may only include letters, numbers, underscores and hashes.'
		},
	},
]
 // var routeName="";
inquirer.prompt(QUESTIONS).then((answers) => {
	//  routeName = answers['routeName']
	 const routeName = 'secondUser'

	var destination = `${CURR_DIR}/Models/${routeName}.models.js`
	var source = 'generateRoutes/routesTemplates/route.model.js'
	fs.copyFileSync(source, destination)

	var destination = `${CURR_DIR}/Routes/${routeName}.routes.js`
	var source = 'generateRoutes/routesTemplates/route.routes.js'
	fs.copyFileSync(source, destination)

	var destination = `${CURR_DIR}/Controllers/${routeName}.controllers.js`
	var source = 'generateRoutes/routesTemplates/route.controller.js'
	fs.copyFileSync(source, destination)
	
})