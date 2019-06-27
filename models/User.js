const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Schema} = mongoose

const userSchema = new Schema({
    googleId:String,
    facebookId:String,
    email: String,
    password: String,
    credits:{
        type:Number,
        default:0
    }
})
userSchema.methods.validPassword = (password,userInput) =>{
    const hash =  bcrypt.compareSync(password,userInput)
    return hash
}
mongoose.model('users',userSchema)