const <%= defaultRoute %> = require(`./<%= defaultRoute %>.routes`);

const selectionRoute = (app) => {
	
	app.use(`/<%= defaultRoute %>`, <%= defaultRoute %>);
}
module.exports = { selectionRoute }
