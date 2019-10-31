const Sequelize = require('sequelize');
const db = require('../db')


const User = db.define('User',{
    email : Sequelize.STRING,
    password : Sequelize.STRING,
    score: Sequelize.INTEGER
})

module.exports = User