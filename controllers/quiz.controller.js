const requestService = require("../services/quiz.service");
const createQuiz = async (req, res) => {
  const data = await requestService.quizRoutes(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

const getReadyQuiz = async (req, res) => {
  const data = await requestService.getAllQuizQuestion(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};
const getMarksReady = async (req, res) => {
  const data = await requestService.getMyMarkReady(req, res);
  return res.status(data.statusCode).send({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data?.data,
  });
};

module.exports = {createQuiz, getReadyQuiz, getMarksReady};
