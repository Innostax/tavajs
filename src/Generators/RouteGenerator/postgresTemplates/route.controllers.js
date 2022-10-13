// const { <%= routeName %> } = require('../sequelize')

// const find = (req, res, next) => {
// 	<%= routeName %>.findAll().then((<%= routeName %>) => {
// 		if (<%= routeName %>.length > 0) res.json(<%= routeName %>)
// 		else res.send('no user found')
// 	})
// }

// const create = (req, res, next) => {
// 	<%= routeName %>
// 		.create(req.body)
// 		.then((user) => res.json(user))
// 		.catch((err) => res.send('User cannot be created'))
// }

// const patch = (req, res, next) => {
// 	<%= routeName %>
// 		.update(
// 			{ name: req.body.name, phone_number: req.body.phone_number },
// 			{ where: { id: req.params.id } }
// 		)
// 		.then((<%= routeName %>) => {
// 			if (<%= routeName %>[0]) res.send('User updated')
// 			else res.send("User with this ID can't be updated")
// 		})
// }

// const remove = (req, res, next) => {
// 	<%= routeName %>.destroy({
// 		truncate: true,
// 	})
// 	.then(()=>{res.send("<%= routeName %> table deleted")})
// }

// const removeById = (req, res, next) => {
// 	<%= routeName %>
// 		.destroy({
// 			where: {
// 				id: req.params.id,
// 			},
// 		})
// 		.then((<%= routeName %>) => {
// 			if (<%= routeName %>) res.send('user deleted')
// 			else res.send("User with this ID can't be found")
// 		})
// }

// const findById = (req, res, next) => {
// <%= routeName %>
// 		.findAll({
// 			where: {
// 				id: req.params.id,
// 			},
// 		})
// 		.then((<%= routeName %>) => {
// 			if (<%= routeName %>.length > 0) res.json(<%= routeName %>)
// 			else res.send('no user found')
// 		})
// }

// module.exports = {
// 	find,
// 	create,
// 	patch,
// 	remove,
// 	findById,
// 	removeById,
// }

const { <%= routeName %> } = require('../sequelize')

const find = (req, res, next) => {
	<%= routeName %>.findAll().then((<%= routeName %>) => res.json(<%= routeName %>))
}

const create = async (req, res, next) => {
	<%= routeName %>
		.create(req.body)
		.then((<%= routeName %>) => res.json(<%= routeName %>))
		.catch((err) => res.send('User cannot be created'))
}

const patch = (req, res, next) => {
	<%= routeName %>
		.update(
			{
				name: req.body.name,
				username: req.body.username,
				email: req.body.email,
			},
			{ where: { id: req.params.id }, returning: true, plain: true }
		)
		.then((<%= routeName %>) => {
			if (<%= routeName %>[1]) res.send('users updated')
			else res.send("users with this ID can't be found")
		})
}

const remove = (req, res, next) => {
	<%= routeName %>
		.destroy({
			truncate: true,
		})
		.then(() => {
			res.send('users updated')
		})
}

const removeById = (req, res, next) => {
	<%= routeName %>
		.destroy({
			where: {
				id: req.params.id,
			},
			returning: true,
			checkExistance: true,
		})
		.then((<%= routeName %>) => {
			if (<%= routeName %>) res.send('user deleted')
			else res.send("User with this ID can't be found")
		})
}

const findById = (req, res, next) => {
	<%= routeName %>
		.findAll({
			where: {
				id: req.params.id,
			},
		})
		.then((<%= routeName %>) => res.json(<%= routeName %>))
}

module.exports = {
	find,
	create,
	patch,
	remove,
	findById,
	removeById,
}
