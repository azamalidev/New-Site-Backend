const Videos = require('../models/courseVideo.model');
const { uploadImage } = require('../config/cloudinary');
const mongoose = require('mongoose');
const createVideos = async (req, res) => {
  try {
    if (req?.body?.thumbnail) {
      try {
        const url = await uploadImage(req?.body?.thumbnail, 'videos_pictures');
        req.body.thumbnail = url;
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
      }
    }

    const video = new Videos(req?.body);
    const savedVideo = await video.save();
    return {
      status: true,
      statusCode: 200,
      message: 'Video added Successfully!',
      data: savedVideo,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message };
  }
};

const getVideos = async (req, res) => {
  try {
    let { courseId } = req.query; // Get courseId from query parameters

    if (!courseId) {
      return {
        status: false,
        statusCode: 400,
        message: 'courseId is required',
      };
    }
    courseId = new mongoose.Types.ObjectId(courseId);
    let savedVideos = await Videos.find({ courseId: courseId });

    return {
      status: true,
      statusCode: 200,
      message: 'Course Video list',
      data: savedVideos,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 400,
      message: error.message,
    };
  }
};

const updateVideos = async (req, res) => {
  try {
    let imageUrl = req?.body.profilePhoto;
    let imageUrl1 = req?.body.QRCode;
    if (req?.body.profilePhoto && !req.body.profilePhoto.includes('https:')) {
      try {
        const url = await uploadImage(
          req?.body.profilePhoto,
          'profile_pictures'
        );
        imageUrl = url;
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
      }
    }
    if (req?.body.QRCode && !req?.body.QRCode.includes('https:')) {
      try {
        const url = await uploadImage(req?.body.QRCode, 'profile_pictures');
        imageUrl1 = url;
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
      }
    }
    req.body.profilePhoto = imageUrl;
    req.body.QRCode = imageUrl1;

    const _id = new mongoose.Types.ObjectId(req.query?.id);
    const data = await Videos.findByIdAndUpdate(_id, req?.body, { new: true });
    return {
      status: false,
      statusCode: 200,
      message: 'Profile is updated successfully',
      data: data,
    };
  } catch (err) {
    res.status(400).send({
      status: false,
      statusCode: 400,
      message: err.message,
    });
  }
};

const deleteVideos = async (req, res) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.query?.id);
    const data = await Videos.findByIdAndDelete(_id);
    return {
      status: false,
      statusCode: 200,
      message: 'Video deleted successfully',
      data: data,
    };
  } catch (err) {
    res.status(400).send({
      status: false,
      statusCode: 400,
      message: err.message,
    });
  }
};

module.exports = {
  createVideos,
  getVideos,
  updateVideos,
  deleteVideos,
};
