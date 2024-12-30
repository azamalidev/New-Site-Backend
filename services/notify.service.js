const Notify = require('../models/notify.model');
const mongoose = require('mongoose');

const addNotification = async (req, res) => {
  try {
    const notification = new Notify(req.body);
    const notificationAdded = await notification.save();
    return {
      status: true,
      statusCode: 200,
      message: 'Notification added successfully',
      data: notificationAdded,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};
const getReadMessages = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.query?.userId);
  try {
    const result = await Notify.find({ userId: userId, read: true });
    return {
      status: true,
      statusCode: 200,
      message: 'Your all read messages list',
      data: result,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const readMyMessages = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.query?.userId);
  try {
    const result = await Notify.updateMany(
      { userId: userId }, // Query condition
      { $set: { read: true } } // Update operation
    );
    return {
      status: true,
      statusCode: 200,
      message: 'Your messages are read by you',
      data: result,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const getUnreadMessages = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.query?.userId);
  try {
    const result = await Notify.find({ userId: userId, read: false });
    return {
      status: true,
      statusCode: 200,
      message: 'Your all unread messages list',
      data: result,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const getAdminAllReadMessagesList = async (req, res) => {
  try {
    const result = await Notify.aggregate([
      {
        $match: { readByAdmin: true }, // Filter documents where readByAdmin is true
      },
      {
        $lookup: {
          from: 'requests', // The name of the "Request" collection
          localField: 'requestId', // Field in Notify collection
          foreignField: '_id', // Field in Request collection
          as: 'requestDetails', // Alias for the joined data
        },
      },
      {
        $lookup: {
          from: 'users', // The name of the "User" collection
          localField: 'userId', // Field in Notify collection
          foreignField: '_id', // Field in User collection
          as: 'userDetails', // Alias for the joined data
        },
      },
      {
        $project: {
          _id: 1,
          readByAdmin: 1,
          discription: 1,
          notificationType: 1,
          message: 1,
          createdAt: 1,
          requestDetails: {
            _id: 1,
            registrationDate: 1,
            status: 1,
          },
          userDetails: {
            _id: 1,
            name: 1,
            profilePhoto:1,
            email: 1,
          },
        },
      },
    ]);

    return {
      status: true,
      statusCode: 200,
      message: 'Your all read messages list',
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 400,
      message: error.message,
      data: [],
    };
  }
};

const getAdminAllUnreadMessagesList = async (req, res) => {
  try {
    const result = await Notify.aggregate([
      {
        $match: { readByAdmin: false }, // Filter documents where readByAdmin is true
      },
      {
        $lookup: {
          from: 'requests', // The name of the "Request" collection
          localField: 'requestId', // Field in Notify collection
          foreignField: '_id', // Field in Request collection
          as: 'requestDetails', // Alias for the joined data
        },
      },
      {
        $lookup: {
          from: 'users', // The name of the "User" collection
          localField: 'userId', // Field in Notify collection
          foreignField: '_id', // Field in User collection
          as: 'userDetails', // Alias for the joined data
        },
      },
      {
        $project: {
          _id: 1,
          readByAdmin: 1,
          discription: 1,
          notificationType: 1,
          message: 1,
          createdAt: 1,
          requestDetails: {
            _id: 1,
            registrationDate: 1,
            status: 1,
          },
          userDetails: {
            _id: 1,
            name: 1,
            profilePhoto:1,
            email: 1,
          },
        },
      },
    ]);
    return {
      status: true,
      statusCode: 200,
      message: 'Your all unread messages list',
      data: result,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const readAllUserMessages = async (req, res) => {
  try {
    const result = await Notify.updateMany(
      {}, // No condition, updates the entire collection
      { $set: { readByAdmin: true } } // Update operation: set the `read` field to true
    );
    return {
      status: true,
      statusCode: 200,
      message: 'You have read all messages',
      data: result,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

module.exports = {
  addNotification,
  getUnreadMessages,
  getReadMessages,
  readMyMessages,
  getAdminAllReadMessagesList,
  getAdminAllUnreadMessagesList,
  readAllUserMessages,
};
