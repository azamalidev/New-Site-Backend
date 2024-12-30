const requestService = require("../services/request.service");
const upload = require("../config/cloudinary");
const createrequest = async (req, res) => {
  const data = await requestService.createrequest(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const getAllRequest = async (req, res) => {
  const data = await requestService.getRequestList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const getMineRequest = async (req, res) => {
  const data = await requestService.getMineRequestList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};


const updateRequest = async (req, res) => {
  const data = await requestService.updateMineRequest(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const getRequestById = async (req, res) => {
  const data = await requestService.getRequestById(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const searchByParameter = async (req, res) => {
  const data = await requestService.serachRequestList(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};
const deleteRequest = async (req, res) => {
  const data = await requestService.deleteRequestById(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};
const getMyRequestStatus = async (req, res) => {
  const data = await requestService.getMyRequestStates(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};


const uploadPolicy = async (req, res) => {
  const data = await requestService.uploadPolicyForRequest(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};


const payForRequestNow = async (req, res) => {
  const data = await requestService.payForRequest(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const getActivityPoint = async (req, res) => {
  const data = await requestService.getActivityPoint(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const getPaymentVarified = async (req, res) => {
  const data = await requestService.getPaymentVarify(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const getActivityPointsHistory = async (req, res) => {
  const data = await requestService.getActivityPointHistory(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};
const getVehicleTypeGraphData = async (req, res) => {
  const data = await requestService.getVehicleTypeData(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};
const getRequestStatusByYaer = async (req, res) => {
  const data = await requestService.getRequestStatusByYaer(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const getTotalByStageWise = async (req, res) => {
  const data = await requestService.getStageWiseTotals(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

module.exports = {getPaymentVarified,getTotalByStageWise,getRequestStatusByYaer,getVehicleTypeGraphData,getActivityPointsHistory,getActivityPoint,getMyRequestStatus,payForRequestNow, createrequest, getAllRequest,uploadPolicy, getMineRequest,searchByParameter , updateRequest, getRequestById, deleteRequest};
