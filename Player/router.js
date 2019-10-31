const Sequelize = require('sequelize');
const { Router } = require("express");
const User = require("../User/model");
const Lobby = require('../Lobby/model')
const auth = require('../auth/middleware')

const router = new Router();

//get the details of full player tables
//************************************** //
router.get('/player', (req, res, next) => {
    Player.findAll()
      .then(player => {
        res
        .status(200)
        .send(player);
      })
      .catch(next);
  });

//Put the players for available lobby id only 
//******************************************** // 
router.put('/player/:lobbyId/start', auth, async (req, res, next) => {
  try {
    const lobby = await Lobby.findByPk(req.params.lobbyId, { include: [User] })

    console.log("lobby found ??", lobby.id)

    if (lobby.status !== 'FULL') {
      return res.send({ message: 'This game is waiting for more players' })
    }
  
    if (lobby.count !== 0) {
      res.status(200)
      return res.send({ message : "game has already started" })
    }

    const updated = await lobby.update({ turn: req.user.id, count: 1 })

    res.status(200)
    res.send(updated).end()
  } catch (err){
    next(err)
  }
})

router.put('/player/:lobbyId/move', async (req, res, next) => {
  let randomNumber = Math.floor((Math.random() * 6) + 1);

  // First, update the player score

  // Second, update the game turn
})


//get the total scores of players 
//************************************** // 

router.get('/result/:lobbyId', async (req, res, next) => {
  const lobby = await Lobby.findByPk(req.params.lobbyId, { includes: [Player] })

  const player1=lobby.player1
  console.log("player1 : ", player1)
  const player2=lobby.player2

  const ScoreOfPlayer1 = await Player.findAll(
    {
    where :{
      LobbyId : req.params.lobbyId,
        // player1 : player1
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('score1')),'total']
      //[Sequelize.fn('min', Sequelize.col('score')),'total22']
    ]
  })
  //console.log("total score of player1 : ", ScoreOfPlayer1[0].dataValues.total)
  let totalScore1 = ScoreOfPlayer1[0].dataValues.total
  console.log("score of player1 : ", totalScore1)

  const ScoreOfPlayer2 = await Player.findAll(
    {
    where :{
      LobbyId : req.params.lobbyId,
    //   player2 : player2
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('score2')),'total']]
  })
  //console.log("total score of player2 : ", ScoreOfPlayer2[0].dataValues.total)
  let totalScore2 = ScoreOfPlayer2[0].dataValues.total
  console.log("score of player2 : ", totalScore2)

   if (totalScore1 == totalScore2) {
    console.log("Oh, Both players have same scores :)")
    res.status(200)
    res.send({message: "Oh, Both players have same scores :)"})
   }
    if(totalScore1 > totalScore2){
     console.log(`Hurry ${player1} is winner`)
     res.status(200)
    res.send({message: `Hurry ${player1} is winner`})
   }
  else {
    console.log(`Hurry ${player2} is winner`)
    res.status(200)
    res.send({message : `Hurry ${player2} is winner`})
  }
  
})

module.exports = router