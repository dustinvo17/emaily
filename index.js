const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
require('./models/User')
require('./models/Survey')
app.use(bodyParser.json())
app.use(cookieSession({
    maxAge: 30*24*60*60*1000 ,// 30 days
    keys:[keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongoURI,{ useNewUrlParser: true })
require('./services/passport')


const PORT = process.env.PORT || 5000

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,() =>{
    console.log('app running on 5000')
})


