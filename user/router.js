const { Router } = require("express");
const User = require("./model");
const bcrypt = require('bcrypt')

const router = new Router();


router.get('/user', (req, res, next) => {
    User.findAll()
      .then(user => {
        res.send(user);
      })
      .catch(next);
  });


router.post('/user', (req,res) => {
    console.log("create user")
    User.create({
        email: req.body.email,
        password :  bcrypt.hashSync(req.body.password, 10)
    })
.then(user => {
    res
    .status(201)
    .send({message: "user created sucessfully"})
.catch(err => next(err))
})
})

module.exports = router