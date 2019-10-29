const Sequelize = require('sequelize');
const db = require('../db')
const Game = require('../Game/model')


const Lobby = db.define('Lobby',{
       lobbyName : Sequelize.STRING,
        player1: Sequelize.STRING,
        player2: Sequelize.STRING,
        status : Sequelize.STRING
        
       
    })

Lobby.hasMany(Game)
Game.belongsTo(Lobby)

module.exports = Lobby