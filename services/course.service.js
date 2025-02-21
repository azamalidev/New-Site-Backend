const Course = require('../models/course.model');
const mongoose = require('mongoose');
const { uploadImage } = require('../config/cloudinary');

const createCourse = async (req, res) => {
  try {
    let imageUrl1 = '';
    if (req?.body.courseImage) {
      try {
        formattedImage = `${req?.body.courseImage}`;
        const url = await uploadImage(formattedImage, 'course_pictures');
        imageUrl1 = url;
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
      }
    }
    req.body.courseImage = imageUrl1;
    const course = new Course(req.body);
    const courseAdded = await course.save();
    return {
      status: true,
      statusCode: 200,
      message: 'Course added successfully',
      data: courseAdded,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const getAllCourse = async (req, res) => {
  try {
    const courseList = await Course.find();
    return {
      status: true,
      statusCode: 200,
      message: 'Course list',
      data: courseList,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const getCourseById = async (req, res) => {
  try {
      const _id = new mongoose.Types.ObjectId(req.query?.id);
    
    const course = await Course.findOne({ _id: _id });
    return {
      status: true,
      statusCode: 200,
      message: 'Course by Id',
      data: course,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const deleteCour = async (req, res) => {
  try {
    if (!req.query?.id) {
      return {
        status: false,
        statusCode: 400,
        message: 'Company ID is required',
      };
    }

    const _id = new mongoose.Types.ObjectId(req.query?.id);
    const data = await Course.findByIdAndDelete(_id);
    return {
      status: true,
      statusCode: 200,
      message: 'Course deleted successfully',
      data: data,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const updateCou = async (req, res) => {
  try {
    if (!req.query?.id) {
      return {
        status: false,
        statusCode: 400,
        message: 'Company ID is required',
      };
    }
    let imageUrl;
    if (req?.body.courseImage && !req.body.courseImage.includes('https:')) {
      try {
        const url = await uploadImage(
          req?.body.courseImage,
          'profile_pictures'
        );
        req.body.courseImage = url;
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
      }
    }

    const _id = new mongoose.Types.ObjectId(req.query?.id);
    const data = await Course.findByIdAndUpdate(_id, req?.body);
    return {
      status: true,
      statusCode: 200,
      message: 'Course updated successfully',
      data: data,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

module.exports = {
  createCourse,
  getAllCourse,
  getCourseById,
  updateCou,
  deleteCour
};
