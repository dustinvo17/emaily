const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const FacebookStrategy = require('passport-facebook')
const LocalStrategy = require('passport-local')
const keys = require('../config/keys')
const mongoose = require('mongoose')


const User = mongoose.model('users')
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
})
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
        googleId: profile.id
    })

    if (existingUser) {
        done(null, existingUser)
    } else {
        const user = await new User({
                googleId: profile.id
            })
            .save()
        done(null, user)

    }


}))
//facebook strategy
passport.use(new FacebookStrategy({
    clientID:keys.fbClientID,
    clientSecret:keys.fbClientSecret,
    callbackURL:'/auth/facebook/callback',
},async (accessToken,refreshToken,profile,done)=>{
    const existingUser = await User.findOne({
        facebookId:profile.id
    })
    if(existingUser){
        done(null,existingUser)
    }else{
        const user = await new User({
            facebookId:profile.id
        }).save()
        done(null,user)
    }
}
))
// local strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
},
  async (email,password, done) => {
    await User.findOne({email},async (err,user)=>{
        if(err) {return done(err)}
        if(!user) {return done(null,false,{message:'Incorrect email'})}
        
        if(!user.validPassword(password,user.password)){
          return done(null, false, { message: 'Incorrect password.' });
        }
       
        return done(null,user)
    });
   
     
    
     
  }
));