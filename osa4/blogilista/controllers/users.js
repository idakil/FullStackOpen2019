const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const saltRounds = 10
    if(body.password.length < 3){
      return response.status(400).json({error:'password too short'}).end();
    }
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    const savedUser = await user.save((err)=>{
      if(err) response.status(400).send({error: err.message})
      else{
        response.json(savedUser)

      }
    })
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {author:1, title:1, url:1})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async(req,res) => {
  try{
    const user = await User.findById(req.params.id)
    res.json(user)
  }catch(exception){
    next(exception)
  }

})

module.exports = usersRouter