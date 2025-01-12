const AddToCard = require('../models/addToCard.model');
const mongoose = require('mongoose');
const createAddToCard = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.body?.courseId);
    const userId = new mongoose.Types.ObjectId(req.body?.userId);

    const alredyAddToCart = await AddToCard.find({
      courseId: courseId,
      userId: userId,
    });

    if (alredyAddToCart.length > 0) {
      return {
        status: true,
        statusCode: 200,
        message: 'This course already enrolled.Go to LMS and check there.',
        data: [],
      };
    } else {
      const addToCardItem = new AddToCard(req.body);
      const added = await addToCardItem.save();
      return {
        status: true,
        statusCode: 200,
        message: 'Course is added to cart. Go to LMS and check there.',
        data: added,
      };
    }
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const getList = async (req, res) => {
  try {
    const userId = req.query?.userId;
    const status = req.query?.status;

    const ListAllAddToCard = await AddToCard.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId), // Correct usage of ObjectId
          status: status, // Ensure this matches the status format in your database
        },
      },
      {
        $lookup: {
          from: 'courses', // Name of the collection for courses
          localField: 'courseId', // Field in AddToCard collection
          foreignField: '_id', // Field in Course collection
          as: 'courseDetails', // Name of the resulting field
        },
      },
      {
        $unwind: {
          path: '$courseDetails', // Flatten the joined course details
          preserveNullAndEmptyArrays: true, // Include AddToCard entries without matching courses
        },
      },
    ]);

    return {
      status: true,
      statusCode: 200,
      message: 'Add to cart course list',
      data: ListAllAddToCard,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const removeFromCart = async (req, res) => {
  try {
    const courseIds = req.body?.courseIds; // Expecting an array of courseIds to remove

    if (!courseIds || courseIds.length === 0) {
      return {
        status: false,
        statusCode: 400,
        message: 'No course IDs provided.',
        data: [],
      };
    }

    // Remove the courses from the cart
    const result = await AddToCard.deleteMany({
      courseId: { $in: courseIds.map((id) => new mongoose.Types.ObjectId(id)) }, // Convert each courseId to ObjectId
    });

    if (result.deletedCount === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'No courses found to remove.',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Courses removed from cart successfully.',
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 500,
      message: error.message,
      data: [],
    };
  }
};

module.exports = {
  createAddToCard,
  getList,
  removeFromCart,
};
