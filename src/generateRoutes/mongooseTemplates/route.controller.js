
const <%= routeName %> = require(`../Models/<%= routeName %>.js`)
const find = (req, res, next) => {
	<%= routeName %>.find(function (err, data) {
		if (!err) {
			res.send(data)
		} else {
			res.send(err)
		}
	})
}

const create = (req, res, next) => {
	const newData = new <%= routeName %>({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
	})
	newData.save(function (err, data) {
		if (!err) {
			res.send(data)
		} else {
			res.send(err)
		}
	})
}

const patch = (req, res, next) => {
	<%= routeName %>.updateOne(
		{ _id: req.params.id },
		{ $set: req.body },
		function (err, data) {
			if (!err) {
				<%= routeName %>.find(function (err, data) {
					if (!err) {
						res.send(data)
					} else {
						res.send(err)
					}
				})
			} else {
				res.send(err)
			}
		}
	)
}

const remove = (req, res, next) => {
	<%= routeName %>.deleteMany(function (err) {
		if (!err) res.send('All deleted')
		else res.send(err)
	})
}

const removeById = (req, res, next) => {
	<%= routeName %>.deleteOne({ _id: req.params.id }, function (err, data) {
		if (data) {
			<%= routeName %>.find(function (err, data) {
				if (!err) {
					res.send(data)
				} else {
					res.send(err)
				}
			})
		} else {
			res.send('No matching  was found.')
		}
	})
}

const findById = (req, res, next) => {
	<%= routeName %>.findOne({ _id: req.params.id }, function (err, data) {
		if (data) {
			res.send(data)
		} else {
			res.send('No matching found.')
		}
	})
}

module.exports = {
	find,
	create,
	patch,
	remove,
	findById,
	removeById,
}
