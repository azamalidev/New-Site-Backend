const companyService = require('../services/company.service');
// Varify Email
const createCompany = async (req, res) => {
  const data= await companyService.createCompany(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Complete Account Setup Email
const getCompanyList = async (req, res) => {
  const data= await companyService.getAllCompany(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
module.exports = { createCompany, getCompanyList };
