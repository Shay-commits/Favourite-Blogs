const mongoose = require('mongoose')




const userSchema = new mongoose.Schema({

    username: {type: String, required: true, unique: true, minlength: 3 },
    password: {type: String, required: true },
    name: {type: String},
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]

})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // password should not be revealed
        delete returnedObject.password 
    }
})




module.exports = mongoose.model('User', userSchema)