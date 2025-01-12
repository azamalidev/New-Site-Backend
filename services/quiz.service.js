const Quiz = require('../models/quiz.model.js');
// const Marks = require('../models/marks.model.js');
const quizRoutes = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    const quizCreated = await quiz.save();
    return {
      status: true,
      statusCode: 200,
      message: 'Quiz question added successfully',
      data: quizCreated,
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
const getAllQuizQuestion = async (req, res) => {
  try {
    const testType = req.query?.type
    const quizzes = await Quiz.find({testType}).select('-answer');
    return {
      status: true,
      statusCode: 200,
      message: 'Quiz question List',
      data: quizzes,
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

const getMyMarkReady = async (req, res) => {
  try {
    // 1. Get the user's answers from the request body
    const {userAnswers} = req.body;  // This will be an array of objects with { answer: answer, id: questionId }
    const testType = req.query?.type;  // Get the test type (e.g., 'Entry Test')

    // 2. Fetch questions based on the testType from the database
    const questions = await Quiz.find({ testType });  // Assuming Quiz is your model

    // 3. Calculate the marks
    let totalMarks = 0;
    const totalQuestions = questions.length;

    // 4. Loop through the userAnswers and compare with the database answers
    userAnswers.forEach((userAnswer) => {
      // Find the corresponding question by id
      const question = questions.find((q) => q._id.toString() === userAnswer.id);

      if (question) {
        // If the user's answer is correct
        if (userAnswer.answer === question.answer) {
          totalMarks += 1;  // Increment total marks for a correct answer
        }
      }
    });

    // 5. Calculate the percentage
    const percentage = (totalMarks / totalQuestions) * 100;

    // 6. Send the result as a response
    return {
      status: true,
      statusCode: 200,
      message: `Congratulations, You got ${percentage}% marks`,
      data: {
        totalMarks,
        totalQuestions,
        percentage,
        userAnswers,
      },
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


module.exports = {
  quizRoutes,
  getAllQuizQuestion,
  getMyMarkReady
};
