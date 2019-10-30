const Sequelize = require('sequelize');
const db = require('../db')


const Player = db.define('Player',{
        player1 : Sequelize.STRING,
        player2 : Sequelize.STRING,
        score1 : Sequelize.INTEGER, 
        score2 : Sequelize.INTEGER,  
        //lobbyId : Sequelize.INTEGER   this will generate automatically but at the time of creating data we hv to insert values
    })


module.exports = Player