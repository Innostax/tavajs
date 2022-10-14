module.exports = (sequelize, type) =>
	sequelize.define('<%= routeName %>', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: type.STRING,
			allowNull: false,
		},
		username: {
			type: type.STRING,
			allowNull: false,
		},
		email: {
			type: type.STRING,
			allowNull: false,
		},
	})


