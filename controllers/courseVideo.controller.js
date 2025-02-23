const videoService = require('../services/courseVideo.service');

// Create Video
const createVideo = async (req, res) => {
  try {
    const video = await videoService.createVideos(req, res);
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get Video List
const getVideo = async (req, res) => {
  const data = await videoService.getVideos(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

// Delete Video
const deleteVideo = async (req, res) => {
  try {
    const data = await videoService.deleteVideos(req, res);
    return res.status(data.statusCode).send({
      status: data.status,
      statusCode: data.statusCode,
      message: data.message,
      data: data?.data,
    });
  } catch (err) {
    return res.status(data.statusCode).send({
      status: data.status,
      statusCode: data.statusCode,
      message: err.message,
      data: data?.data,
    });
  }
};

module.exports = { createVideo, getVideo, deleteVideo };
