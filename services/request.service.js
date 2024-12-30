const Request = require('../models/request.model.js');
const mongoose = require('mongoose');
const { uploadImage } = require('../config/cloudinary');
const APP_ID = 'your-app-id';
const SECRET_KEY = 'your-secret-key';
const CASHFREE_BASE_URL = 'https://sandbox.cashfree.com/pg';
const createrequest = async (req, res) => {
  try {
    let imageUrl1 = '';
    let imageUrl2 = '';
    if (req.body.vehicleDetailURL) {
      let formattedImage = `${req?.body.vehicleDetailURL}`;
      if (req?.body.vehicleDetailURL) {
        try {
          const url = await uploadImage(formattedImage, 'policy_pictures');
          imageUrl1 = url;
        } catch (error) {
          console.error('Error during Cloudinary upload:', error);
        }
      }
    }
    if (req.body.previousPolicyURL) {
      let formattedImage = `${req?.body.previousPolicyURL}`;
      if (req?.body.previousPolicyURL) {
        try {
          const url = await uploadImage(formattedImage, 'policy_pictures');
          imageUrl2 = url;
        } catch (error) {
          console.error('Error during Cloudinary upload:', error);
        }
      }
    }
    req.body.vehicleDetailURL = imageUrl1;
    req.body.previousPolicyURL = imageUrl2;

    const request = new Request(req.body);
    const requestcreated = await request.save();

    return {
      status: true,
      statusCode: 200,
      message: 'Request has been created successfully!',
      data: requestcreated,
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
      data: [],
    };
  }
};
const getRequestList = async (req, res) => {
  try {
    const dataList = await Request.aggregate([
      {
        $addFields: {
          userId: { $toObjectId: '$userId' }, // Convert 'userId' from string to ObjectId
        },
      },
      {
        $lookup: {
          from: 'users', // The collection you want to join with (users collection)
          localField: 'userId', // The field in 'Request' collection (now ObjectId)
          foreignField: '_id', // The field in 'User' collection (_id)
          as: 'userDetails', // The resulting array will contain the matched user documents
        },
      },
      {
        $unwind: {
          path: '$userDetails', // Flatten the array to a single object
          preserveNullAndEmptyArrays: true, // In case there's no matching user
        },
      },
    ]);

    return {
      status: true,
      statusCode: 200,
      message: 'Request List',
      data: dataList,
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
      data: [],
    };
  }
};

const getMineRequestList = async (req, res) => {
  const { userId } = req.query; // Get userId from query string (e.g., /requests?id=675483f649684d2fc94110e6)

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({
      message: 'Query parameter is required in query string',
      data: [],
    });
  }

  try {
    // Convert the userId to ObjectId
    const Id = new mongoose.Types.ObjectId(userId);

    const pipeline = [
      {
        $lookup: {
          from: 'comments', // The name of the comments collection
          localField: '_id',
          foreignField: 'requestId',
          as: 'comments',
        },
      },
      {
        $addFields: {
          activeComment: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$comments',
                  as: 'comment',
                  cond: { $eq: ['$$comment.active', true] }, // Filter only active comments
                },
              },
              0, // Get the first active comment, or null if none
            ],
          },
        },
      },
    ];
  
    const result = await Request.aggregate(pipeline);

    // Return the list of requests
    return {
      status: true,
      statusCode: 200,
      message: 'Your request List',
      data: result,
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
      data: [],
    };
  }
};

const updateMineRequest = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      message: 'Query parameter is required in query string',
      data: [],
    });
  }

  try {
    let _id = new mongoose.Types.ObjectId(id);
    let data = req.body;

    let imageUrl1 = '';
    if (data?.quotationDetail.length >= 1) {
      for (let x = 0; x < req.body?.quotationDetail.length; x++) {
        // Use `<` instead of `>=`
        let imageType = 'jpeg'; // You may need to determine this dynamically
        let formattedImage = `data:image/${imageType};base64,${data?.quotationDetail[x]?.companyLogo}`;
        try {
          let url = await uploadImage(formattedImage, 'policy_pictures');
          data.quotationDetail[x].companyLogo = url; // Directly update the array
        } catch (error) {
          console.error('Error during Cloudinary upload:', error);
        }
      }
    }

    const updatedRequest = await Request.findOneAndUpdate(
      { _id }, // Filter: Match the document by ID
      {
        $set: {
          quotationDetail: data.quotationDetail,
          requestSent: true,
          quotationMade: true,
        },
      }, // Update: Set the quotationDetail field
      { new: true } // Options: Return the updated document
    );

    return {
      status: true,
      statusCode: 200,
      message: 'Request has been updated',
      data: updatedRequest,
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
      data: [],
    };
  }
};

const uploadPolicyForRequest = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      message: 'Query parameter is required in query string',
      data: [],
    });
  }

  try {
    let _id = new mongoose.Types.ObjectId(id);
    let data = req.body;
    if (data?.policyUrl) {
      let imageType = 'jpeg';
      let formattedImage = `data:image/${imageType};base64,${data?.policyUrl}`;
      try {
        let url = await uploadImage(formattedImage, 'policy_pictures');
        data.policyUrl = url; // Directly update the array
        data['policyUploaded'] = true;
        data['requestSent'] = true;
        data['quotationMade'] = true;
        data['paymentDone'] = true;
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
      }
    }

    const updated = await Request.findOneAndUpdate({ _id }, data);

    return {
      status: true,
      statusCode: 200,
      message: 'Policy Upload Successfully',
      data: updated,
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
      data: [],
    };
  }
};

const getRequestById = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      message: 'Query parameter is required in query string',
      data: [],
    });
  }

  try {
    let _id = new mongoose.Types.ObjectId(id);
    const dataList = await Request.findById({ _id });

    return {
      status: true,
      statusCode: 200,
      message: 'Request By Id',
      data: dataList,
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
      data: [],
    };
  }
};
const deleteRequestById = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      message: 'Query parameter is required in query string',
      data: [],
    });
  }

  try {
    let _id = new mongoose.Types.ObjectId(id);
    const dataList = await Request.findOneAndDelete({ _id });
    return {
      status: true,
      statusCode: 200,
      message: 'Request has been deleted',
      data: dataList,
    };
  } catch (err) {
    return {
      status: false,
      statusCode: 400,
      message: err.message,
      data: [],
    };
  }
};

const getMyRequestStates = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return {
      message: 'Query parameter userId is required in query string',
      status: false,
      statusCode: 400,
      data: [],
    };
  }

  try {
    // Convert userId to ObjectId for MongoDB queries
    const objectId = new mongoose.Types.ObjectId(userId);

    // Fetch all requests for the user
    const allRequests = await Request.find({ userId: objectId });

    // Initialize counts
    let totalRequests = 0;
    let requestInReviewTotal = 0;
    let quotationMadeUnPaidTotal = 0;
    let quotationMadeAndPaidTotal = 0;
    let purchaseRequestTotal = 0;

    // Iterate over all requests and categorize
    allRequests.forEach((request) => {
      totalRequests++;

      if (
        request.requestSent &&
        request.quotationMade &&
        request.paymentDone &&
        request.policyUploaded
      ) {
        purchaseRequestTotal++;
      } else if (
        request.requestSent &&
        request.quotationMade &&
        request.paymentDone
      ) {
        quotationMadeAndPaidTotal++;
      } else if (request.requestSent && request.quotationMade) {
        quotationMadeUnPaidTotal++;
      } else if (request.requestSent && !request.quotationMade) {
        requestInReviewTotal++;
      }
    });

    // Return the response
    return {
      status: true,
      message: 'Your request states are here',
      statusCode: 201,
      data: {
        totalRequests,
        requestInReviewTotal,
        quotationMadeUnPaidTotal,
        quotationMadeAndPaidTotal,
        purchaseRequestTotal,
      },
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      message: 'An error occurred while fetching request states',
      statusCode: 400,
      error: err.message,
    };
  }
};

const payForRequest = async (req, res) => {
  try {
    if (!req.query?.requestId) {
      return {
        message: 'Query parameter requestId is required in query string',
        status: false,
        statusCode: 400,
        data: [],
      };
    }
    const {
      orderId,
      orderAmount,
      customerName,
      customerEmail,
      customerPhone,
      companyLogo,
      coverAmount,
      activityPoints,
    } = req.body;

    if (
      !orderId ||
      !orderAmount ||
      !customerName ||
      !customerEmail ||
      !customerPhone
    ) {
      return {
        status: false,
        statusCode: 400,
        data: [],
        message:
          'All fields  orderId,orderAmount,customerName,customerEmail and customerPhone  are required',
      };
    }
    const _id = new mongoose.Types.ObjectId(req.query?.requestId);
    const currentDate = new Date();
    const paymentDetail = {
      paymentDetail: {
        userName: customerName,
        activityPointsReceived: activityPoints,
        coverAmount: coverAmount,
        companyLogo: companyLogo,
        status: 'Paid',
      },
      policyUrl: '',
      paymentDate: currentDate,
      requestSent: true,
      quotationMade: true,
      paymentDone: true,
      policyUploaded: false,
    };
    const requestPaid = await Request.findOneAndUpdate({ _id }, paymentDetail);

    return {
      status: true,
      message: 'Your request states are here',
      statusCode: 201,
      data: requestPaid,
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      message: 'An error occurred while fetching request',
      statusCode: 400,
      data: [],
    };
  }
};

const getActivityPoint = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: 'Query parameter userId is required in query string',
        status: false,
        statusCode: 400,
        data: [],
      });
    }

    // Get requests where paymentDone is true and userId matches
    const requests = await Request.find({
      userId,
      paymentDone: true,
      paymentVarified:true,
    });

    // Check if requests exist
    if (!requests.length) {
      return {
        message: 'No activity points found for the user',
        status: true,
        statusCode: 200,
        data: {
          totalActivityPoints: 0,
          lastWeekPoints: 0,
          lastMonthPoints: 0,
        },
      };
    }

    // Get the current date
    const now = new Date();

    // Calculate date ranges
    const lastWeekStart = new Date();
    lastWeekStart.setDate(now.getDate() - 7);

    const lastMonthStart = new Date();
    lastMonthStart.setMonth(now.getMonth() - 1);

    // Initialize points counters
    let totalActivityPoints = 0;
    let lastWeekPoints = 0;
    let lastMonthPoints = 0;

    // Calculate points
    for (const request of requests) {
      const { paymentDetail } = request;

      if (paymentDetail?.activityPointsReceived) {
        const activityPoints = paymentDetail.activityPointsReceived;
        const paymentDate = new Date(request.paymentDate);

        totalActivityPoints += activityPoints;

        if (paymentDate >= lastWeekStart) {
          lastWeekPoints += activityPoints;
        }

        if (paymentDate >= lastMonthStart) {
          lastMonthPoints += activityPoints;
        }
      }
    }

    // Return the calculated points
    return {
      status: true,
      message: 'Activity points details',
      statusCode: 200,
      data: {
        totalActivityPoints,
        lastWeekPoints,
        lastMonthPoints,
      },
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      message: 'An error occurred while fetching activity points',
      statusCode: 400,
      data: err.message,
    };
  }
};

const getPaymentVarify = async (req, res) => {
  try {
    const { requestId } = req.query;
    let _id = new mongoose.Types.ObjectId(requestId);

    if (!requestId) {
      return res.status(400).json({
        message: 'Query parameter requestId is required in query string',
        status: false,
        data: [],
      });
    }

    // Get requests where paymentDone is true and userId matches
    const requests = await Request.findOneAndUpdate(
      {
        _id,
      },
      { paymentVarified: true, payemtVarifyDate: new Date() }
    );

    return {
      status: true,
      message: 'Payment Varified Now',
      statusCode: 200,
      data: requests,
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      message: 'An error occurred while fetching activity points',
      statusCode: 400,
      error: err.message,
    };
  }
};

const getActivityPointHistory = async (req, res) => {
  try {
    const { userId } = req.query;
    const { startDate, endDate } = req.query;

    // Validate query parameters
    if (!userId) {
      return res.status(400).json({
        message: 'Query parameter userId is required in query string',
        statusCode: 400,
        status: false,
        data: [],
      });
    }

    if (!startDate || !endDate) {
      return {
        message: 'Query parameters startDate and endDate are required',
        statusCode: 400,
        status: false,
        data: [],
      };
    }

    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if the dates are valid
    if (isNaN(start) || isNaN(end)) {
      return {
        message: 'Invalid date format for startDate or endDate',
        statusCode: 400,
        status: false,
        data: [],
      };
    }

    // Get requests where paymentDone is true and userId matches
    const requests = await Request.find({
      userId,
      paymentDone: true,
      // paymentVarified:true,
      paymentDate: { $gte: start, $lte: end }, // Filter requests by paymentDate in the range
    });

    // Check if requests exist
    if (!requests.length) {
      return {
        message:
          'No activity points found for the user in the specified date range',
        status: true,
        statusCode: 200,
        data: [],
      };
    }
    return {
      status: true,
      message: 'Activity points history for the specified date range',
      statusCode: 200,
      data: requests,
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      message: 'An error occurred while fetching activity points',
      statusCode: 500,
      error: err.message,
    };
  }
};

const getVehicleTypeData = async (req, res) => {
  try {
    const { year } = req.query; // Extract year from request body

    if (!year) {
      return res.status(400).json({
        message: 'Year parameter is required in the request body',
        status: false,
        data: [],
      });
    }

    // Set startDate and endDate for the specified year
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    // Fetch requests based on the year and registrationDate
    const requests = await Request.find({
      registrationDate: { $gte: startDate, $lte: endDate },
    });

    // Check if requests exist

    // Group data by month and vehicleType
    const result = Array(12)
      .fill(null)
      .map((_, index) => ({
        year,
        month: new Date(0, index).toLocaleString('default', { month: 'long' }),
        totalBikeRequest: 0,
        totalCarRequest: 0,
        totalCommercialVehicleRequest: 0,
      }));

    if (!requests.length) {
      return {
        message: `No request found for the year ${year}`,
        status: false,
        statusCode: 400,
        data: [],
      };
    }

    requests.forEach((request) => {
      const month = new Date(request.registrationDate).getMonth(); // Get month index (0-11)
      const vehicleType = request.vehicleType;

      if (vehicleType === 'Bike') {
        result[month].totalBikeRequest++;
      } else if (vehicleType === 'Car') {
        result[month].totalCarRequest++;
      } else if (vehicleType === 'Commercial Vehicle') {
        result[month].totalCommercialVehicleRequest++;
      }
    });

    // Return grouped response
    return {
      status: true,
      message: `Request history for the year ${year}`,
      statusCode: 200,
      data: result,
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      message: 'An error occurred while fetching request history',
      statusCode: 500,
      error: err.message,
    };
  }
};

const serachRequestList = async (req, res) => {
  const {
    vehicleType,
    paymentDone,
    cycleCompleteDate,
    keyword,
    userType,
    fuelType,
    policyType,
    startDate,
    commented,
  } = req.body;

  try {
    // Initialize query object
    const query = {};

    // Add conditions dynamically
    if (vehicleType) query.vehicleType = vehicleType;
    if (typeof paymentDone === 'boolean') query.paymentDone = paymentDone;
    if (typeof commented === 'boolean') query.commented = commented;

    if (typeof cycleCompleteDate === 'boolean') {
      const currentDate = new Date();
      query.cycleCompleteDate = cycleCompleteDate
        ? { $lt: currentDate } // Completed cycles before the current date
        : { $gte: currentDate }; // Ongoing cycles on or after the current date
    }

    if (keyword) {
      query.$or = [
        { vehicleType: { $regex: keyword, $options: 'i' } }, // Case-insensitive search
        { vehicleModel: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (userType) query.userType = userType;
    if (fuelType) query.fuelType = fuelType;
    if (policyType) query.policyType = policyType;

    // Add range condition for registrationDate
    if (startDate) {
      const currentDate = new Date(); // Current date as the end date
      query.registrationDate = {
        $gte: new Date(startDate), // Greater than or equal to startDate
        $lte: currentDate, // Less than or equal to currentDate
      };
    }

    // Fetch data from the MongoDB collection
    const dataList = await Request.find(query); // Replace `Request` with your Mongoose model

    // Send the response
    return {
      status: true,
      statusCode: 200,
      message: 'Your search criteria match',
      data: dataList,
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      statusCode: 400,
      message: err.message,
      data: [],
    };
  }
};

const getRequestStatusByYaer = async (req, res) => {
  try {
    const { years } = req.query; // Extract year from request body

    const requests = await Request.find({ policyUploaded: true });

    const result = JSON.parse(years).map((year) => ({
      year,
      activeRequest: 0,
      expireRequest: 0,
    }));

    if (!requests.length) {
      return res.status(404).json({
        message: 'No requests found with policy uploaded',
        status: false,
        statusCode: 400,
        data: [],
      });
    }

    requests.forEach((request) => {
      const policyExpireYear = new Date(request.policyExpire).getFullYear();

      const yearData = result.find((data) => data.year === policyExpireYear);

      if (yearData) {
        if (new Date(request.policyExpire) >= new Date()) {
          yearData.activeRequest++;
        } else {
          yearData.expireRequest++;
        }
      }
    });

    // Return grouped response
    return {
      status: true,
      message: 'Request history by year',
      statusCode: 200,
      data: result,
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      message: 'An error occurred while fetching request data',
      statusCode: 500,
      error: err.message,
    };
  }
};

const getStageWiseTotals = async (req, res) => {
  try {
    // Fetch all requests
    const requests = await Request.find();

    if (!requests.length) {
      return {
        message: 'No requests found',
        status: true,
        statusCode: 200,
        data: {
          requestSent: 0,
          quotationMade: 0,
          paymentDone: 0,
          policyUploaded: 0,
        },
      };
    }

    // Initialize stage counts
    let requestSentCount = 0;
    let quotationMadeCount = 0;
    let paymentDoneCount = 0;
    let policyUploadedCount = 0;

    // Process each request
    requests.forEach((request) => {
      if (request.policyUploaded) {
        // Count for the most advanced stage
        policyUploadedCount++;
      } else if (request.paymentDone) {
        paymentDoneCount++;
      } else if (request.quotationMade) {
        quotationMadeCount++;
      } else if (request.requestSent) {
        requestSentCount++;
      }
    });

    // Return the stage-wise counts
    return {
      status: true,
      message: 'Stage-wise totals calculated successfully',
      statusCode: 200,
      data: {
        requestSent: requestSentCount,
        quotationMade: quotationMadeCount,
        paymentDone: paymentDoneCount,
        policyUploaded: policyUploadedCount,
      },
    };
  } catch (err) {
    // Handle errors
    return {
      status: false,
      statusCode: 500,
      message: 'An error occurred while calculating stage-wise totals',
      error: err.message,
    };
  }
};

module.exports = {
  getPaymentVarify,
  getStageWiseTotals,
  getRequestStatusByYaer,
  createrequest,
  getRequestList,
  uploadPolicyForRequest,
  getMineRequestList,
  updateMineRequest,
  getRequestById,
  deleteRequestById,
  serachRequestList,
  getMyRequestStates,
  payForRequest,
  getActivityPoint,
  getActivityPointHistory,
  getVehicleTypeData,
};
