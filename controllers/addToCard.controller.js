const addToCart = require('../services/addToCard.service');
// Varify Email
const addToCard = async (req, res) => {
  const data= await addToCart.createAddToCard(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Get Comment list by request Id 
const getAllAddToCard = async (req, res) => {
  const data= await addToCart.getList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};

const deleteAll = async (req, res) => {
  const data= await addToCart.removeFromCart(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


// Get Comment list by request Id 
const uploadChallan = async (req, res) => {
  const data= await addToCart.uploadChallanNow(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


const getPaidCourse = async (req, res) => {
  const data= await addToCart.getMyPaidCourseList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};

const getAllUserPaidCourse = async (req, res) => {
  const data= await addToCart.getAllPaidCourseList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
}
  const verifiedCourse = async (req, res) => {
    const data= await addToCart.verifyCourse(req, res);
    return res.status(data.statusCode).send({
      status: data.status,
      statusCode: data.statusCode,
      message: data.message,
      data: data?.data
    });

  }



module.exports = { verifiedCourse,addToCard, getAllAddToCard , deleteAll, uploadChallan, getPaidCourse, getAllUserPaidCourse};
