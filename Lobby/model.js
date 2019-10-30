const Sequelize = require('sequelize');
const db = require('../db')
const Player = require('../Player/model')


const Lobby = db.define('Lobby',{
        lobbyName : Sequelize.STRING,
        player1: Sequelize.STRING,
        player2: Sequelize.STRING,
        turn: Sequelize.INTEGER,
        count : Sequelize.INTEGER,
        status : Sequelize.STRING
    })

Lobby.hasMany(Player)
Player.belongsTo(Lobby)


module.exports = Lobby