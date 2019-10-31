const { Router } = require("express");
const Lobby = require("./model");
const User = require('../user/model')
const auth = require('../auth/middleware')

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
router.post('/lobby', async (req, res, next) => {
    try {
        const lobby = await Lobby.create({
            lobbyName: req.body.lobbyName,
            status:  'FREE',
            count: 0

        })

        res
            .status(201)
            .send(lobby)
    } catch (error) {
        next(error)
    }
})

//Update the information of Player1 and Player2


router.put('/lobby/:lobbyId/join', auth, async (req, res, next) => {
    console.log("update the player1 and palyer2 in lobby table")
    const { user } = req
    const { lobbyId } = req.params

    try {
        const lobby = await Lobby.findByPk(lobbyId)

        //console.log("lobby found", lobby);
        if (lobby.status === 'FULL') {
            //console.log("room is full, try another room")
            return res.send({message: "lobby is full, please try another room :) "})
        }

        const updated = await user.update({ lobbyId })

        res.send(updated)
    } catch (error) {
        next(error)
    }
})

module.exports = router