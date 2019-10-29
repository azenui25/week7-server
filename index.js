const Express = require('express')
const app = Express()
const cors = require('cors')


const bodyParser = require('body-parser')
const bodyParserMiddleWare = bodyParser.json()

const db = require('./db')

//routers 
const UserRouter = require('./user/router');
const UserLogin = require('./login/auth/router')
const LobbyRouter = require('./Lobby/router')


const port = process.env.PORT || 4000

const middleware = cors()

app.listen(port, () => console.log(`server is listening on ${port}!`))
app.get('/test', (req, res) => res.send('hello world'))

app.use(middleware)
app.use(bodyParserMiddleWare)
app.use(UserRouter)
app.use(UserLogin)
app.use(LobbyRouter)


