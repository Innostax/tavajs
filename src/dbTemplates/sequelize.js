const Sequelize = require('sequelize');
var UserModel = require('./models/<%= defaultRoute %>')
const sequelize = new Sequelize(process.env.DATABASE_URL)
const <%= defaultRoute %> = UserModel(sequelize, Sequelize)
    try {
      sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

  sequelize.sync({alter:true})
    .then(() => {
      console.log(`Database & tables created!`)
    })
  

module.exports = {
 <%= defaultRoute %>
}

  

