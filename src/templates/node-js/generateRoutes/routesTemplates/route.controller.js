// const { default: routeName } = require("../index.js")
const secondUser = require(`../Models/secondUser.models.js`)
// routeName
const find = (req, res, next) => {
	secondUser.find(function (err, data) {
		if (!err) {
			res.send(data)
		} else {
			res.send(err)
		}
	})
}

const create = (req, res, next) => {
	const newData = new secondUser({
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
	secondUser.updateOne(
		{ _id: req.params.id },
		{ $set: req.body },
		function (err, data) {
			if (!err) {
				secondUser.find(function (err, data) {
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
	secondUser.deleteMany(function (err) {
		if (!err) res.send('All deleted')
		else res.send(err)
	})
}

const removeById = (req, res, next) => {
	secondUser.deleteOne({ _id: req.params.id }, function (err, data) {
		if (data) {
			secondUser.find(function (err, data) {
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
	secondUser.findOne({ _id: req.params.id }, function (err, data) {
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
