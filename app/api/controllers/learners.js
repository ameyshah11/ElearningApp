//Bcrypt for password encryption
const bcrypt = require('bcrypt');
// jwt for access token
const jwt = require('jsonwebtoken');
//Importing leaners model
const learnersModel = require('../models/learners');

// Create learner function
const createLearner = (req,res,next)=>{
    const {learner_name,learner_email,learner_password} = req.body
    learnersModel.create({
        learner_name,
        learner_email,
        learner_password
    },(err,result)=>
    {
        if(err)
        {
            next(err);
        }
        else
        {
            res.json({
                status:"Success",
                message:"Learner Details Added Successfully",
                data:result
            })
        }
    })
}

// Login learner function
const loginLearner = (req,res,next) => {
    learnersModel.findOne({learner_email:req.body.learner_email},(err,result) =>
    {
        if(err)
        {
            next(err);
        }
        else
        {
            if(bcrypt.compare(req.body.learner_password,result.learner_password))
            {
                const token = jwt.sign({id:result._id},req.app.get('secretKey'), {expiresIn:'1h'})
                res.json({
                    status:"Success",
                    message:"You are Logged In Successfully",
                    data:{
                        learner:result,
                        token:token
                    }
                })
            }
        }
    })
}

//Exporting create and login learner controller
module.exports = {createLearner,loginLearner}