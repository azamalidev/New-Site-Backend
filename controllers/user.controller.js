const userService = require('../services/user.service');
// Varify Email
const varifyEmail = async (req, res) => {
  const data= await userService.registerAndVerifyEmail(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Create Employee
const createEmployee = async (req, res) => {
  try {
    const employee = await userService.createEmployee(req, res);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get Employee List
const getEmployeeList = async (req, res) => {
  const data= await userService.getEmployee(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Complete Account Setup Email
const accountSetup = async (req, res) => {
  const data= await userService.setupAccount(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};

// Reset password
const resetPassword = async (req, res) => {
  const data= await userService.resetPassword(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Get user list
const getUserList = async (req, res) => {
  const data=  await userService.getAllUsers(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data
  });
};
// Edit Profile 
const editProfile = async (req, res) => {
  try {
    const data = await userService.updateUser(req, res);
    return res.status(data.statusCode).send({
      status: data.status,
      statusCode: data.statusCode,
      message: data.message,
      data: data?.data
    });
  } catch (err) {
    return res.status(data.statusCode).send({
      status: data.status,
      statusCode: data.statusCode,
      message: err.message,
      data: data?.data
    });
  }
};

// Delete Profile 
const deleteProfile = async (req, res) => {
  try {
    const data = await userService.deleteUser(req, res);
    return res.status(data.statusCode).send({
      status: data.status,
      statusCode: data.statusCode,
      message: data.message,
      data: data?.data
    });
  } catch (err) {
    return res.status(data.statusCode).send({
      status: data.status,
      statusCode: data.statusCode,
      message: err.message,
      data: data?.data
    });  }
};


const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req, res);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Login User 
const login = async (req, res) => {
  try {
    const user = await userService.userLogin(req, res);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




module.exports = { createEmployee,getEmployeeList,resetPassword,varifyEmail ,accountSetup, getUserList,editProfile,deleteProfile,getUserById,login };


