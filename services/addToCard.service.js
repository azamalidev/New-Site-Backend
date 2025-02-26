const AddToCard = require('../models/addToCard.model');
const mongoose = require('mongoose');
const { uploadImage } = require('../config/cloudinary');

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


const getMyPaidCourseList = async (req, res) => {
  try {
    const userId = req.query?.userId;
    const ListPaid = await AddToCard.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId), // Convert userId to ObjectId
          status: { $in: ["Pending", "Verified"] }, // Filter only Pending and Verified statuses
        },
      },
      {
        $lookup: {
          from: "courses", // Name of the collection for courses
          localField: "courseId", // Field in AddToCard collection
          foreignField: "_id", // Field in Course collection
          as: "courseDetails", // Name of the resulting field
        },
      },
      {
        $unwind: {
          path: "$courseDetails", // Flatten the joined course details
          preserveNullAndEmptyArrays: true, // Include AddToCard entries without matching courses
        },
      },
    ]);
    

    return {
      status: true,
      statusCode: 200,
      message: 'Paid Course list',
      data: ListPaid,
    };
  } catch (error) {
    return { status: false, statusCode: 400, message: error.message, data: [] };
  }
};

const getAllPaidCourseList = async (req, res) => {
  try {
    const { id: courseId } = req.query;

    // Match "Pending" and "Verified" statuses
    const matchQuery = { status: { $in: ["Pending", "Verified"] } };

    if (courseId) {
      matchQuery.courseId = new mongoose.Types.ObjectId(courseId); // ✅ Convert courseId to ObjectId
    }

    const ListPaid = await AddToCard.aggregate([
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "courses", // ✅ Ensure "courses" is the correct collection name
          localField: "courseId",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $lookup: {
          from: "users", // ✅ Fixed: Use "users" instead of "user"
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$courseDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

   return {
      status: true,
      message: "Paid Course List",
      statusCode: 200,
      data: ListPaid,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      statusCode: 400,
      data: [],
    };
  }
};



const uploadChallanNow = async (req, res) => {
  try {
    const { id } = req?.query;
    const _id = new mongoose.Types.ObjectId(id);

    let paidChallan = '';
    if (req?.body.paidChallan) {
      try {
        const url = await uploadImage(
          req?.body.paidChallan,
          'profile_pictures'
        );
        paidChallan = url;
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
      }
    }
    const Update = await AddToCard.findByIdAndUpdate(
      { _id: _id },
      {
        paidChallan: paidChallan,
        uploadedAt: new Date().toLocaleString(),
        status: 'Pending',
      }
    );
    return {
      status: true,
      statusCode: 200,
      message: 'Challan uploaded sucessfully',
      data: Update,
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
  uploadChallanNow,
  getMyPaidCourseList,
  getAllPaidCourseList,
};
