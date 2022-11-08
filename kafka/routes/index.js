const users = require(`./users.routes`);

const selectionRoute = (app) => {
	
	app.use(`/users`, users);
}
module.exports = { selectionRoute }
