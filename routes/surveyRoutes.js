const _ = require('lodash')
const Path = require('path-parser').default
const {URL} = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const checkCredit = require('../middlewares/checkCredit')
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys')
const surveyTemplate = require('../services/emailTemplate/surveyTemplate')
module.exports = app => {
    app.post('/api/surveys/delete',requireLogin, async (req,res) =>{
        const { userId,surveyId } = req.body
        await Survey.deleteOne({_user:userId,_id:surveyId
            
        }).exec()
        const surveys = await Survey.find({_user:userId}).select({recipients:false})
        if(surveys){
            res.send(surveys)
        }
       
    })
    app.get('/api/surveys/:surveyId/:choice',(req,res)=>{
        res.send('Thank you for voting!')
    })
    app.get('/api/surveys',requireLogin,async ({user},res)=>{
        const surveys = await Survey.find({_user:user.id}).select({recipients:false})
        if(surveys){
            res.send(surveys)
        }
        else{
            res.send('You have no surveys')
        }

    })
    app.post('/api/surveys/webhooks',(req,res)=>{
       
        const events = req.body.map(({url,email}) =>{
            const pathname = new URL(url).pathname
            const p = new Path('/api/surveys/:surveyId/:choice')
            const match = p.test(pathname)
            if(match){
                return {email,surveyId:match.surveyId,choice:match.choice}
            }
        })
        const compactEvents = events.filter(event => event != null )
        const uniqueEvents = _.uniqBy(compactEvents,'email','surveyId')
        uniqueEvents.forEach(({surveyId,choice,email}) => {
            Survey.updateOne({_id:surveyId,
                recipients:{
                    $elemMatch:{email:email,response:false}
                }
            },{
                $inc :{[choice]:1},
                $set:{'recipients.$.response':true},
                lastResponded: new Date()
            }).exec()
        })
        res.send({})
       
    })
    app.post('/api/surveys',requireLogin,checkCredit,async (req,res)=>{
        const {title,subject,body,recipients,from} = req.body
        const survey = new Survey({
            title,
            subject,
            body,
            recipients:recipients.split(',').map(email => {return {email:email.trim()}}),
            from,
            _user:req.user.id,
            dateSent:Date.now()


        })
        
        const mailer = new Mailer(survey,surveyTemplate(survey))
        try{
            await mailer.send()
            await survey.save()
            req.user.credits -= 1
            const user = await req.user.save()
            res.send(user)
        } catch (err){
            res.status(422).send(err)
        }
        

    })
}
