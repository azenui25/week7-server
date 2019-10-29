const { Router } = require("express");
const Lobby = require("./model");

const router = new Router();

//get information of all rooms available in lobby
router.get('/lobby', (req, res, next) => {
    Lobby.findAll()
      .then(lobby => {
        res.send(lobby);
      })
      .catch(next);
  });


// get information of room thru id
  router.get('/lobby/:id', (req, res, next) => {
    Lobby.findByPk(req.params.id)
      .then(lobby => {
        res.send(lobby);
      })
      .catch(next);
  });

// Create lobby with lobbyName and status
router.post('/lobby', (req,res) => {
    console.log("create lobby")
    Lobby.create({
        lobbyName : req.body.lobbyName,
        status :  req.body.status
        })
        .then(lobby => {
            res
            .status(201)
            .send({message: "Lobby created sucessfully"})
    .catch(err => next(err))
})
})

//Update the information of Player1 and Player2

router.put('/lobby/:lobbyId', (req,res) => {
    console.log("update the player1 and palyer2 in lobby table")
    Lobby.findByPk(req.params.lobbyId)
    .then(lobby     => {
        console.log("lobby found", lobby);
        if (lobby.status=='FULL') {
            console.log("room is full, try another room")
            res.send({message: "lobby is full, please try another room :) "}).end();
        }

        else if (lobby.player1==null){
            lobby.update({
                player1 : req.body.player,
                status : 'waiting'
            })
            .then(lobby => res.send(lobby))
        }

        else if (lobby.player2==null){
            lobby.update({
                player2 : req.body.player,
                status : 'FULL'
        })
            .then(lobby => res.send(lobby))
        }
    })
})

module.exports = router