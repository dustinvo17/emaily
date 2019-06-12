const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')


require('./models/User')
app.use(cookieSession({
    maxAge: 30*24*60*60*1000 ,// 30 days
    keys:[keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true })
require('./services/passport')


const PORT = process.env.PORT || 5000

authRoutes(app)
app.listen(PORT,() =>{
    console.log('app running on 5000')
})