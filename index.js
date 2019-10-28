
const Express = require('express')
               

const app = Express()
const express = require('express')

const bodyParser = require('body-parser')
const bodyParserMiddleWare = bodyParser.json()

const db = require('./db')
const UserRouter = require('./User/router');
const app = express()

const port = process.env.PORT || 4000


app.listen(port, () => console.log(`server is listening on ${port}!`))
app.get('/test', (req, res) => res.send('hello world'))

app.use(bodyParserMiddleWare)
app.use(UserRouter)

