const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const learnersSChema = new mongoose.Schema({
    learner_name:{
        type:String,
        required:true
    },
    learner_email:{
        type:String,
        required:true
    },
    learner_password:{
        type:String,
        required:true
    }
})

learnersSChema.pre('save',function(next){
    const saltRounds=15;
    this.learner_password = bcrypt.hashSync(this.learner_password,saltRounds);
    next()
})

module.exports = mongoose.model('Learners',learnersSChema);