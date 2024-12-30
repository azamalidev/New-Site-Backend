const Comment = require('../models/comment.model');
const mongoose = require('mongoose');
const { uploadImage } = require('../config/cloudinary');

const createComment = async (req, res) => {
  try {
  
    const comment = new Comment(req.body);
    const commentAdded = await comment.save();
    return {
      status: true,
      statusCode: 200,
      message: 'Comment added successfully',
      data: commentAdded,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const getCommentListByRequestId = async (req, res) => {
  const requestId = new mongoose.Types.ObjectId(req.query?.id);

  try{
  const companyList = await Comment.find( { requestId : requestId, active:true});
    return {
      status: true,
      statusCode: 200,
      message: 'Comment list',
      data: companyList,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const inactiveCommentByRequestId = async (req, res) => {
  const requestId = new mongoose.Types.ObjectId(req.query?.id);
  try{
    const result = await Comment.updateMany(
      { requestId: requestId }, // Filter: Match all documents where requestId matches
     { active: false  } // Update: Set active to false
    );    return {
      status: true,
      statusCode: 200,
      message: 'Inactive comment list',
      data: result,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

module.exports = {
  createComment,
  getCommentListByRequestId,
  inactiveCommentByRequestId,
};
