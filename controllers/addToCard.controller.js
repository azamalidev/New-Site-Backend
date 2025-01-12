const commentService = require('../services/addToCard.service');
// Varify Email
const addToCard = async (req, res) => {
  const data= await commentService.createAddToCard(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Get Comment list by request Id 
const getAllAddToCard = async (req, res) => {
  const data= await commentService.getList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};

const deleteAll = async (req, res) => {
  const data= await commentService.removeFromCart(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};



module.exports = { addToCard, getAllAddToCard , deleteAll};
