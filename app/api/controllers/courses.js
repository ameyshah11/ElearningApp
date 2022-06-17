// Importing courses model
const CoursesModel = require('../models/courses');

//Create Course

const createCourse = (req,res,next)=>{
    let {course_name,course_description} = req.body;

    CoursesModel.create({
        course_name,
        course_description
    }, (err,result)=>{

        if(err){
            next(err)
        }
        else
        {
            res.json({
                status:"Success",
                message:"Course added successfully",
                data : result
            })
        }
    })
}

// Read All courses

const fetchAllCourses = (req,res,next)=>{
    CoursesModel.find({},(err,result)=>{
        if(err)
        {
            next(err);
        }
        else
        {
            res.json({
                status:"Success",
                message:"All courses details",
                data:{
                    courses:result
                }
            })
        }
    })
}

// Read Course by id

const fetchCourseById = (req,res,next) => {
    CoursesModel.findById(req.params.id,(err,result)=>{
        if(err)
        {
            next(err);
        }
        else
        {
            res.json({
                status:"Success",
                message:"Here is the detail of course you searched for",
                data:{
                    courses : result
                }
            })
        }
    })
}

// Read course by field
const fetchCourseByField = (req,res,next) => {
    CoursesModel.findOne(req.params.course_name, (err,result) => {
        if(err)
        {
            next(err);
        }
        else
        {
            res.json({
                status:"Success",
                message:"Here is the course details by Field",
                data:{
                    course: result
                }
            })
        }       
    })
} 

// Update Course By Id
const updateCourseById = (req,res,next) =>{
    CoursesModel.findByIdAndUpdate(req.params.id,req.body,(err,result)=>{
        if(err)
        {
            next(err);
        }
        else
        {
            res.json({
                status:"Success",
                message:"Course updated successfully By Id",
                data:{
                    courses:result
                }
            })
        }
    })
}

// Delete Course By Id
const deleteCourseById = (req,res,next)=>{
    CoursesModel.findByIdAndRemove(req.params.id,(err,result)=>{
        if(err)
        {
            next(err)
        }
        else
        {
            res.json({
                status:"Success",
                message:"Course Deleted Successfully By Id",
                data:{
                    courses:result
                }
            })
        }
    })
}
module.exports = {createCourse,fetchAllCourses,fetchCourseById,fetchCourseByField,updateCourseById,deleteCourseById};
