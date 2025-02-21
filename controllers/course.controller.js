const courseService = require('../services/course.service');
// Create course
const createCourse = async (req, res) => {
  const data= await courseService.createCourse(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Get course list
const getCourseList = async (req, res) => {
  const data= await courseService.getAllCourse(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


// Get By id 
const getCourseById = async (req, res) => {
  const data= await courseService.getCourseById(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


const deleteCourse = async (req, res) => {
  const data= await courseService.deleteCour(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


const updateCourse = async (req, res) => {
  const data= await courseService.updateCou(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
module.exports = {deleteCourse,updateCourse, createCourse, getCourseList, getCourseById };
