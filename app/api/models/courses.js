// Mongoose for database
const mongoose = require('mongoose');


// Creating courses schema
const CoursesSchema = new mongoose.Schema({
    course_name:{
        type:String,
        required:true
    },
    course_description:{
        type:String,
        required:true
    }
})

// exporting courses schema and creating courses collection
module.exports = mongoose.model('courses',CoursesSchema);

