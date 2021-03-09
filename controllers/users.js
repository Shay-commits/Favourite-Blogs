const userRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')


userRouter.get('/', async (req,res) => {
    const users = await User.find({}).populate('blogs')
    res.json(users)
})

userRouter.post('/', async (req,res) => {
    pass = req.body.password
    
    if (req.body.username === undefined || pass.length < 3) {
        res.status(400).json({error: 'invalid username or password'})
    }
    // Need to check database to see if username already exists 
    else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
      
      const user = new User({
        username: req.body.username,
        name: req.body.name,
        password: passwordHash
    })
    const savedUser = await user.save((err, user) => {
        if (err) {return err }
        console.log(user)

        const usertoken = {
            username : user.username,
            id: user._id 
          }
        const signedtoken = jwt.sign(usertoken, config.SECRET)
          
        res.status(200).send({token: signedtoken, username: user.username, name: user.name })
    })

}})

module.exports = userRouter