const passport = require('passport')
const mongoose = require('mongoose')

const User = mongoose.model('users')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    }))
      app.get('/auth/google/callback', passport.authenticate('google'),
        (req,res) =>{
            res.redirect('/surveys')
        }
    )
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook'),
        (req,res) =>{
            res.redirect('/surveys')
        }
    )
    app.post('/api/signup',async (req,res) =>{
       
        const {username,email,password} = req.body
        const existingUser = await User.findOne({email:email})
        
        if(existingUser){
            return res.status(400).send({error:'User already exists'})
        }
        const hash = bcrypt.hashSync(password,2)
        const user = await new User({
            username,
            email,
            password:hash

        }).save()
        res.send(user)
       

    })
    app.post('/api/login',passport.authenticate('local', { successRedirect: '/api/current_user',failureRedirect: '/api/login'}))
    

    app.get('/api/logout',(req,res)=>{
        req.logout()
        res.redirect('/')
    })
  
    app.get('/api/current_user',(req,res)=>{
        res.send(req.user)
    })

   
}