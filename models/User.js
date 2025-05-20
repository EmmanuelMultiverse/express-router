const Sequelize = require("sequelize");
const db = require("../db/connection");

const User = db.define("user", {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    
})

module.exports = User;