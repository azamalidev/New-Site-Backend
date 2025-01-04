const express = require("express");
const quizController = require("../controllers/quiz.controller");
const router = express.Router();
router.post("/add-question", quizController.createQuiz);
router.get("/get-list", quizController.getReadyQuiz);
router.post("/get-marks-ready", quizController.getMarksReady);

module.exports = router;
