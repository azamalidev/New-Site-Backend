const companyService = require('../services/course.service');
// Create course
const createCourse = async (req, res) => {
  const data= await companyService.createCourse(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Get course list
const getCourseList = async (req, res) => {
  const data= await companyService.getAllCourse(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


// Get By id 
const getCourseById = async (req, res) => {
  const data= await companyService.getCourseById(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
module.exports = { createCourse, getCourseList, getCourseById };
