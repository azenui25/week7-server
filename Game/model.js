const Sequelize = require('sequelize');
const db = require('../db')


const Game = db.define('Game',{
        //gameId : Sequelize.INTEGER,
        player : Sequelize.STRING,
        score : Sequelize.INTEGER,
        //turn : 
        
    })

module.exports = Game