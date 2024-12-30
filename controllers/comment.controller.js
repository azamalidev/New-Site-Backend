const commentService = require('../services/comment.service');
// Varify Email
const addComment = async (req, res) => {
  const data= await commentService.createComment(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Get Comment list by request Id 
const getCommentListById = async (req, res) => {
  const data= await commentService.getCommentListByRequestId(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


const inactiveAllComment = async (req, res) => {
  const data= await commentService.inactiveCommentByRequestId(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
module.exports = { addComment, getCommentListById, inactiveAllComment };
