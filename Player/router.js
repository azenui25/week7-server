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

//Put the players for available lobby id only 
//******************************************** // 
router.put('/player/:lobbyId', async (req, res, next) => {
  
  let randomNumber = Math.floor((Math.random() * 6) + 1);

  try{
    const lobby = await Lobby.findByPk(req.params.lobbyId, { include: [Player] })

    console.log("lobby found ??", lobby.id)
    const player1=lobby.player1
    const player2=lobby.player2  

    if(lobby.status==='FULL'){
        console.log("value of turn : ", lobby.turn)
        console.log("player1: ", player1)
        console.log("player2: ", player2)
        console.log("value of count : ", lobby.count)

        if(lobby.count < 8){
            if(lobby.turn==1){
              score=randomNumber
              console.log("score of player1: ", score)
              try {
                  
                const player = await Player.create({
                    player1: player1,
                    player2: player2,
                    score1 : randomNumber,
                    score2 : 0,
                    LobbyId: req.params.lobbyId
                    },
                    {
                        where: {LobbyId : req.params.lobbyId}
                    }
                    )
                    res.status(200)
                    res.send(player).end()

              } 
              

              
              catch (err){
                  console.log(err, req.body)
              }
                
               try{
                const updated = await Lobby.update(
                    {
                      turn: 2,
                      count: lobby.count + 1
                    },
                    {
                      where: {
                        id: req.params.lobbyId
                      }
                    }
                  )
                  res.status(200)
                  res.send(updated).end()

               } catch(err){
                   console.log(err, req.body)
               }
            }
                
              else{
         
                try{
                    const player = await Player.create({
                        player1: player1,
                        player2: player2,
                        score1 : 0,
                        score2 : randomNumber,
                        LobbyId: req.params.lobbyId
                      },
                      {
                          where: {LobbyId : req.params.lobbyId}
                      })
                      res.status(200)
                      res.send(player).end()
                } catch(err){
                    console.log(err, req.body)
                }
                
                try{
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
                      res.status(200)
                      res.send(updated).end()


                } catch(err){
                    console.log(err, req.body)
                }
               
                 } 
                 
               }
        else {
            res.status(200)
            res.send({message : "game is over, see your total scores :)"})
        }
            }
       
  }

  catch (err){
      console.log(err, req.body)
  }
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