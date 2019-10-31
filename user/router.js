const { Router } = require("express");
const User = require("./model");
const bcrypt = require('bcrypt')

const router = new Router();

router.post('/user', async (req, res, next) => {
  console.log("create user")
  try {
    const user = await User.create({
        email: req.body.email,
        password :  bcrypt.hashSync(req.body.password, 10)
    })

    res
      .status(201)
      .send(user)
      .catch(err => next(err))
  } catch (error) {
    next(error)
  }
})

module.exports = router