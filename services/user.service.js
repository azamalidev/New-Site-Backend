const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { uploadImage } = require('../config/cloudinary');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const serviceAccount = require('../leadgenpro-d5264-firebase-adminsdk-kbj97-baa82de37c.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Replace with your Firebase project's ID
  projectId: 'leadgenpro-d5264',
});

const registerAndVerifyEmail = async (req, res) => {
  const { email, userType } = req.body;
  if (!email) {
    return { status: false, statusCode: 400, message: 'Email are required.' };
  }
  const user = await User.findOne({ email });

  try {
    if (!user) {
      const newUser = new User({
        email: email,
        verified: false,
        userType: userType,
      });
      const savedUser = await newUser.save();
      return {
        status: true,
        statusCode: 201,
        message: 'Verification email sent.',
        data: savedUser,
      };
    } else {
      return {
        status: true,
        statusCode: 201,
        message: 'Verification email sent.',
        data: [],
      };
    }
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      return {
        status: false,
        statusCode: 400,
        message: 'Email is already registered.',
      };
    } else {
      return { status: false, statusCode: 400, message: error.message };
    }
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await User.find({ userType: 'Employee' });
    return {
      status: true,
      statusCode: 200,
      message: 'Employee list',
      data: employee,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message };
  }
};
const setupAccount = async (req, res) => {
  try {
    if (req?.body.TermAndCond) {
      const hashedPassword = await bcrypt.hash(req?.body.password, 10);
      const user = await User.findOneAndUpdate(
        { email: req?.body.email },
        {
          TermAndCond: req?.body.TermAndCond,
          password: hashedPassword,
          phone: req?.body.phone,
          verified: true,
          name: req?.body.name,
          profession: req?.body.profession,
          referBy: req?.body.referBy,
        }
      );
      return {
        status: true,
        statusCode: 200,
        message: 'Congratulations! Your account has been successfully set up.',
        data: user,
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: 'Please checked our Term and Condition',
      };
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
    };
  }
};

const resetPassword = async (req, res) => {
  try {
    if (req?.body.password) {
      const hashedPassword = await bcrypt.hash(req?.body.password, 10);
      const user = await User.findOneAndUpdate(
        { email: req?.body.email },
        {
          password: hashedPassword,
        }
      );
      return {
        status: true,
        statusCode: 200,
        message: 'Your password has been changed.',
        data: user,
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: 'Please fill password feild',
      };
    }
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
    };
  }
};
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    return {
      status: true,
      statusCode: 200,
      data: user,
      message: 'User List',
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
    };
  }
};

const userLogin = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    let user;
    // Find the user by phone
    if (email) {
      user = await User.findOne({ email });
      if (!user) {
        return {
          status: false,
          statusCode: 401,
          message: 'Email not found',
        };
      }
      const varifiedUser = await User.findOne({ email, verified: true });

      if (!varifiedUser) {
        return {
          status: false,
          statusCode: 403,
          message: 'Please varify your account',
        };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          status: true,
          statusCode: 200,
          message: 'Invalid credentials',
        };
      }
    } else {
      user = await User.findOne({ phone });
      if (!user) {
        return {
          status: false,
          statusCode: 401,
          message: 'Phone number not found',
        };
      }
      const varifiedUser = await User.findOne({ phone, verified: true });

      if (!varifiedUser) {
        return {
          status: false,
          statusCode: 403,
          message: 'Please varify your account',
        };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          status: true,
          statusCode: 200,
          message: 'Invalid credentials',
        };
      }
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const data = { token: token, user: user };
    return {
      status: true,
      statusCode: 200,
      data: data,
      message: 'Login Successfully',
    };
  } catch (error) {
    console.error(error);
    return { status: false, statusCode: 490, message: error.message };
  }
};

const getUserById = async (req, res) => {
  const _id = new mongoose.Types.ObjectId(req.query?.id);
  try {
    // Find the user by phone
    const user = await User.findOne({ _id: _id });
    return {
      status: true,
      statusCode: 200,
      data: user,
      message: 'Agent profile detail',
    };
  } catch (error) {
    console.error(error);
    return { status: false, statusCode: 490, message: error.message };
  }
};

const updateUser = async (req, res) => {
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
    const data = await User.findByIdAndUpdate(_id, req?.body, { new: true });
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

const deleteUser = async (req, res) => {
  try {
    const _id = new mongoose.Types.ObjectId(req.query?.id);
    const data = await User.findByIdAndDelete(_id);
    return {
      status: false,
      statusCode: 200,
      message: 'Profile deleted successfully',
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
  getEmployee,
  resetPassword,
  registerAndVerifyEmail,
  setupAccount,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  userLogin,
};
