const Sequelize = require('sequelize');

const { Router } = require("express");
const Player = require("./model");
const Lobby = require('../Lobby/model')

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

//Post the players for available lobby id only 
//************************************** // 
router.post('/player/:lobbyId', async (req, res) => {
  //let score=0;
  
  let randomNumber = Math.floor((Math.random() * 6) + 1);
  console.log("random number value: ", randomNumber)     //between the range 1 to 6
  // Lobby.findByPk(req.params.lobbyId).then(lobby => {
  const lobby = await Lobby.findByPk(req.params.lobbyId, { includes: [Player] })
  const turn = lobby.turn

  const player1=lobby.player1
  const player2=lobby.player2

if(lobby.status==='FULL'){
  console.log("value of turn : ", lobby.turn)
  console.log("player1: ", player1)
  console.log("player2: ", player2)
  console.log("value of count : ", lobby.count)
    if(lobby.count < 4){
        if(turn==1){
          //score=randomNumber
          //console.log("score of player1: ", score)
          const player = await Player.create({
            player: player1,
            score : randomNumber,
            LobbyId: req.params.lobbyId
          })
          const updated = await Lobby.update(
            {
              turn: 2,
              count:lobby.count+1
            },
            {
              where: {
                id: req.params.lobbyId
              }
            }
          )
          
        }
        else{
          //score=randomNumber
          //console.log("score of player2: ", score)
          const player = await Player.create({
            player: player2,
            score : randomNumber,
            LobbyId: req.params.lobbyId
          })
          const updated = await Lobby.update(
            {
              turn: 1,
              count: lobby.count+1
            },
            {
              where: {
                id: req.params.lobbyId
              }
            }
          )
        }
    
        res
        .status(201)
        .send({message : "player and lobby tables are updated"})
        .catch(err => console.log(err))  }
    else{
      res
        .status(201)
        .send({message : "game is over, see your result :)"})
        .catch(err => console.log(err))
    }
    
}
})

//get the total scores of players 
//************************************** // 
// still working on that 
//************************************** //


router.get('/result/:lobbyId', async (req, res, next) => {
  const lobby = await Lobby.findByPk(req.params.lobbyId, { includes: [Player] })
  const player1=lobby.player1
  console.log("player1 : ", player1)
  const player2=lobby.player2

  const ScoreOfPlayer1 = await Player.findAll(
    //{
   // 
   
    {
    where :{
      LobbyId : req.params.lobbyId,
      player : player1
    },
    attributes: [
      [Sequelize.fn('sum', Sequelize.col('score')),'total'],
      [Sequelize.fn('min', Sequelize.col('score')),'total22']
    ]
  }

 
    

  )
  console.log("total score of player1 : ", ScoreOfPlayer1[0])
    
  
  // .then(player => {
  //     res
  //     .status(200)
  //     .send(player);
  //   })
  //   .catch(next);
})

// const ScoreOfPlayer2 = await Player.findAll({})

;


module.exports = router