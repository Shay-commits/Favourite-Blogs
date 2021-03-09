const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user');
const user = require('../models/user');
const config = require('../utils/config')




loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({username: req.body.username})
  
  const passwordCorrect = user === null? false : await bcrypt.compare(req.body.password, user.password)
  
  if(!(user && passwordCorrect)) {
    return res.status(401).json({error: 'invalid user or password'})
   }
  const usertoken = {
    username : user.username,
    id: user._id 
  }
  const signedtoken = jwt.sign(usertoken, config.SECRET)
  
  res.status(200).send({token: signedtoken, username: user.username, name: user.name })
})

module.exports = loginRouter

