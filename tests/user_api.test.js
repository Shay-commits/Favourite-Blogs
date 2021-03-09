const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



test('invalid users are not created if validation is not met', async () => {
    
    const user = new User({

        username: "jp",
        name: "hope",
        password: "ji"

    })

    await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
})


