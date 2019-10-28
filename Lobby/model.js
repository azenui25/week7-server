const Sequelize = require('sequelize');
const db = require('../db')


const Lobby = db.define('Lobby',{
        lobbyName : Sequelize.STRING,
        player1: Sequelize.STRING,
        player2: Sequelize.STRING,
        status : Sequelize.STRING
        
       
    })

module.exports = Lobby