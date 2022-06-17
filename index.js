/**
 * Application : E-learning CRUD Application
 * Author: Amey Shah
 * Version : 1.0
 * Description : E-learning CRUD Application performs all CRUD operations
 *              (CREATE,READ,UPDATE,DELETE)
 *              
 *              Features of the website
 *              
 *              Learner
 *              -------
 *              1. Create User
 *              2. Login User
 *                  (Generate a access-token)
 * 
 *              Courses
 *              -------
 *              1. Create course
 *              2. Read all courses
 *              3. Read courses by id
 *              4. Update course by id
 *              5. Delete course by id
 * 
 *              NOTE: User should be logged in to perform this operations
 *                    as it generate the access-token for the API access               
 */

//express is used for routing and for creating the server
const express = require('express');

// Mongoose is used for database connection 
const mongoose = require('mongoose');

// Logger is from morgan which is used for loggs in terminal
const logger = require('morgan');

// BodyParser is used for passing json based data
const bodyParser = require('body-parser');

// JWT is Used for token verification
const jwt = require('jsonwebtoken');

// app is a constant which now consist everything of express
// and can be used for middleware
const app = express();

// port constant consist of port information from process env or else it will use port 5000
const port = process.env.PORT||5000;
require('dotenv').config();

// with the help of use keyword we are using middleware bodyparser to send json data for express to use
app.use(bodyParser.json());

// Logger is being initialized for express to use
app.use(logger('dev'));

//Home page routing using slash ('/')
app.get('/',(req,res)=>{
    res.json({
        "App":"JWT Based E-learning Applicatin",
        "message":"Successfully running the E learning application"
    })
})

// listen function for listening to port 
app.listen(port || 80,()=>{
    console.log(`Successfully running on the port ${port}`);
})

// Database Connection
const mongoDBURI = "mongodb+srv://ameyshah11:amey123@cluster0.utzxr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDBURI)
.then(()=>{
    console.log("Database Connection Established!");
})
.catch((err)=>{
    console.log(err);
})

app.set('secretKey','aposdfulbbsstjl')

// Jwt token validation and verification
const learnerValidation = (req,res,next) => {
    jwt.verify(req.headers['learner-token'],req.app.get('secretKey'),(err,result)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        next(err);
    })
}

// routing for learners and courses routes
const learnersRoute = require('./app/api/routes/learners');
const coursesRoute = require('./app/api/routes/courses');


app.use('/learner',learnersRoute);
app.use('/course',learnerValidation,coursesRoute);