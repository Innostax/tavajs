const Sequelize = require('sequelize');
const UserModel = require('./models/users')
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING)
const <%= defaultRoute %> = UserModel(sequelize, Sequelize)
    try {
      sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

  sequelize.sync()
    .then(() => {
      console.log(`Database & tables created!`)
    })
  

module.exports = {
 <%= defaultRoute %>
}

  

