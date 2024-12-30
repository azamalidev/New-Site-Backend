const notifyService = require('../services/notify.service');
// Add Notification
const addNotification = async (req, res) => {
  const data= await notifyService.addNotification(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Get All read messages 
const getGetReadMessage = async (req, res) => {
  const data= await notifyService.getReadMessages(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};

// Get all un read messages
const getUnreadMessages = async (req, res) => {
  const data= await notifyService.getUnreadMessages(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


// Read All my messages
const readAllMyMessages = async (req, res) => {
  const data= await notifyService.readMyMessages(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


// Read All my messages
const adminReadAllUserMessages = async (req, res) => {
  const data= await notifyService.readAllUserMessages(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};

// Get Admin All read  messages
const getAllAdminReadMessages = async (req, res) => {
  const data= await notifyService.getAdminAllReadMessagesList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};


// Get Admin All un-read  messages
const getAllAdminUnreadMessages = async (req, res) => {
  const data= await notifyService.getAdminAllUnreadMessagesList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
module.exports = {adminReadAllUserMessages,getAllAdminReadMessages, addNotification, getGetReadMessage, getUnreadMessages, readAllMyMessages, getAllAdminUnreadMessages };
