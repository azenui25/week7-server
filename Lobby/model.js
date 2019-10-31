const Sequelize = require('sequelize');
const db = require('../db')
const User = require('../Player/model')

const Lobby = db.define('Lobby',{
    lobbyName : Sequelize.STRING,
    turn: Sequelize.INTEGER,
    count : Sequelize.INTEGER,
    status : Sequelize.STRING
})

Lobby.hasMany(User)
User.belongsTo(Lobby)

module.exports = Lobby