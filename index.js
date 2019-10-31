const Express = require('express')
const app = Express()
const cors = require('cors')


const bodyParser = require('body-parser')
const bodyParserMiddleWare = bodyParser.json()

const db = require('./db')
const middleware = cors()

//routers 
const UserRouter = require('./user/router');
const UserLogin = require('./auth/router')
const LobbyRouter = require('./Lobby/router')
const PlayerRouter = require('./Player/router')


const port = process.env.PORT || 4000


app.listen(port, () => console.log(`server is listening on ${port}!`))
app.get('/test', (req, res) => res.send('hello world'))

app.use(middleware)
app.use(bodyParserMiddleWare)
app.use(UserRouter)
app.use(UserLogin)
app.use(LobbyRouter)
app.use(PlayerRouter)


