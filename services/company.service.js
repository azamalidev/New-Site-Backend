const Company = require('../models/company.model');
const mongoose = require('mongoose');
const { uploadImage } = require('../config/cloudinary');

const createCompany = async (req, res) => {
  try {
    let imageUrl1 = '';
    if (req?.body.companyLogo) {
      try {
        const imageType = 'jpeg'; // You may need to determine this dynamically
        formattedImage = `data:image/${imageType};base64,${req?.body.companyLogo}`;
        const url = await uploadImage(formattedImage, 'company_pictures');
        imageUrl1 = url;
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
      }
    }
    req.body.companyLogo = imageUrl1;
    const company = new Company(req.body);
    const companyAdded = await company.save();
    return {
      status: true,
      statusCode: 200,
      message: 'Company is created successfully',
      data: companyAdded,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const getAllCompany = async (req, res) => {
  try{
  const companyList = await Company.find();
    return {
      status: true,
      statusCode: 200,
      message: 'Company list',
      data: companyList,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

module.exports = {
  createCompany,
  getAllCompany,
};
