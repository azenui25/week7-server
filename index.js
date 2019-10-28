const express = require('express')
               







const app = express()
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server is listening on ${port}!`))
app.get('/', (req, res) => res.send('Hello World!'))