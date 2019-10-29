const { Router } = require("express");
const Game = require("./model");

const router = new Router();


router.get('/game', (req, res, next) => {
    Game.findAll()
      .then(game => {
        res.send(game);
      })
      .catch(next);
  });






router.post('/game/:gameId', (req,res) => {
  //set the variables which are required in the logic
  let i=0;
  let turn;
  let score;
  let score1=0;
  let score2=0;
  let randomNumber = Math.floor((Math.random() * 6) + 1);
  console.log("random number value: ", randomNumber)     //between the range 1 to 6
  //get the values of player1 and player2 from lobby_table
  const player1='pp'
  const player2='qq'
  //game is always start with player1 click 
  
  if(i<8){   //for(i=0;i<4;i++)
    turn=player1
    console.log("value of turn : ", turn)
    console.log("value of the i : ", i)
    if(turn==player1){
      score=score1+randomNumber
      player =turn    //turn ==player1

      turn=player2;
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
    Game.create({
        gameId : req.params.gameId,     //will take from lobbyid, lobbyid == gameid
        player: player,
        score : score,
    })
    .then(game => {
    res
    .status(201)
    .send(game)
.catch(err => next(err))
})
})


module.exports = router