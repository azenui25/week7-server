const { Router } = require("express");
const Player = require("./model");
const Lobby = require('../Lobby/model')

const router = new Router();


router.get('/player', (req, res, next) => {
    Player.findAll()
      .then(player => {
        res
        .status(200)
        .send(player);
      })
      .catch(next);
  });

  

router.post('/player/:lobbyId', async (req, res) => {
  //set the variables which are required in the logic
  // let i=0;
  // let turn;
  let score;
  let score1=0;
  let score2=0;

  let randomNumber = Math.floor((Math.random() * 6) + 1);
  console.log("random number value: ", randomNumber)     //between the range 1 to 6
  //get the values of player1 and player2 from lobby_table
  const player1='Player1'
  const player2='Player2'
  //game is always start with player1 click

  // Lobby.findByPk(req.params.lobbyId).then(lobby => {
  const lobby = await Lobby.findByPk(req.params.lobbyId, { includes: [Player] })
  const turn = lobby.turn
  // INCLUDES ONLY
  const players = lobby.players
  // [{ player: 'a', score: 10 }]
  const player = lobby.players[0]
  // { player: 'a', score: 10}
  const score = player.score
  // 10
  const count = player.count

  if(count<8){   //for(i=0;i<4;i++)
    //turn=player2
    
    console.log("value of turn : ", turn)
    console.log("value of the count : ", count)
    if(turn===1){
      score=score1+randomNumber
      //player = turn    //turn ==player1

      turn=2;
      i++
    }
    else{
      score=score2+randomNumber
      player =turn //turn==player2
      turn=player1
      i++
    }
  }

  console.log("create game table for storing the scores of players")
  const player = await Player.create({
    //gameId : req.params.lobbyId,     //will take from lobbyid, lobbyid == gameid
    player: player,
    score : score,
    lobbyId: req.params.lobbyId
  })  
   
  const updated = await Lobby.update()

  res
    .status(201)
    .send(updated)
})


module.exports = router