const Sequelize = require('sequelize');
const db = require('../db')


const Player = db.define('Player',{
        player : Sequelize.STRING,
        score : Sequelize.INTEGER,   
        //lobbyId : Sequelize.INTEGER   this will generate automatically but at the time of creating data we hv to insert values
    })


module.exports = Player