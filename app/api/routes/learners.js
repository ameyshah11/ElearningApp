//express is used for routing and for creating the server
const express = require('express');

// Const router is using router from express
const router = express.Router();

// Importing learners controller
const learnersController = require('../controllers/learners');


// Register learner route
router.post('/register',learnersController.createLearner);

// Login learner route
router.post('/login',learnersController.loginLearner);


// Export router so it can be used by all
module.exports = router;