const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const User = require('../user/model')
const bcrypt = require('bcrypt')
const router = new Router()

// define endpoints here
router.post('/login', (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({ message: 'Please give me some credentials, stranger' })
    }
    else {
      User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(entity => {
    if (!entity) {
      res.status(400).send({
        message: 'User with that email does not exist'
      })
    }
    else if (bcrypt.compareSync(req.body.password, entity.password)) {
      res.send({
        jwt: toJWT({ userId: entity.id })
      })
    }
    else {
      res.status(400).send({
        message: 'Password was incorrect'
      })
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: 'Something went wrong'
    })
  })
}})
    
    


module.exports = router