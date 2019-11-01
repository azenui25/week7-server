const { Router } = require("express");
const Lobby = require("./model");
const User = require('../user/model')
const auth = require('../auth/middleware')
const Sse = require('json-sse')
const {toData} = require('../auth/jwt')

const stream = new Sse()

async function getAllData () {
    const lobbies = await Lobby.findAll({ include: [User] })

    return JSON.stringify(lobbies)
}

async function sendToClients () {
    const data = await getAllData()

    stream.send(data)
}

const router = new Router();

router.get('/stream', async (req, res) => {
    console.log('stream test')
    const data = await getAllData()

    stream.updateInit(data)
    stream.init(req, res)
})

// Create lobby with lobbyName and status
router.post('/lobby', async (req, res, next) => {
    try {
        const lobby = await Lobby.create({
            lobbyName: req.body.lobbyName,
            status:  'FREE',
            count: 0

        })

        await sendToClients()

        res
            .status(201)
            .send(lobby)
    } catch (error) {
        next(error)
    }
})

//Update the information of Player1 and Player2

router.put('/start/:lobbyId', auth, async (req, res, next) => {
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

      await sendToClients()
  
      res.status(200)
      res.send(updated).end()
    } catch (err){
      next(err)
    }
  })

router.put('/lobby/:lobbyId/join', auth, async (req, res, next) => {
    console.log("update the player1 and palyer2 in lobby table")
    const { lobbyId } = req.params

    const BearerPlusTokenInArray = req.headers.authorization && req.headers.authorization.split(' ')
    //BearerPlusTokenInArray[0] = 'Bearer'
    //BearerPlusTokenInArray[1] = '657689hgdehfkjhjflkdfst7sdsd6s78d' //jwt



    requestMaker = toData(BearerPlusTokenInArray[1])

    console.log("id2",myUserID)

    try {
        const lobby = await Lobby.findByPk(Number(lobbyId))

        //console.log("lobby found", lobby);
        if (lobby.status === 'FULL') {
            //console.log("room is full, try another room")
            return res.send({message: "lobby is full, please try another room :) "})
        }
        player = await User.findAll({ where: {
            id: requestMaker.userId
          }})
          console.log("myPlayer is", player[0])
        const updated = await player[0].update({ LobbyId: lobbyId})//lobbyId })

        await sendToClients()

        res.send(updated)
    } catch (error) {
        next(error)
    }
})

module.exports = router