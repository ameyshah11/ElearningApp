//express is used for routing and for creating the server
const express = require('express');

// Const router is using router from express
const router = express.Router();

// importing courses controller
const courseController = require('../controllers/courses');

// Create route for courses
router.post('/create',courseController.createCourse);

// Reading all courses route
router.get('/fetchCourse',courseController.fetchAllCourses);

// Read courses by id route
router.get('/fetchCourseById/:id',courseController.fetchCourseById);

// Read courses by field name route
router.get('/fetchCourseByField/:course_name',courseController.fetchCourseByField);

//Update course by id route
router.put('/updateCourseById/:id',courseController.updateCourseById);

//Delete course by id route
router.delete('/deleteCourseById/:id',courseController.deleteCourseById);

// exporting route so it can be access by all
module.exports = router;