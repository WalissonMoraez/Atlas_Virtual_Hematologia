// controllers/quizController.js
const Quiz_service = require('../services/Quiz_service');
const Quiz_dto = require('../dtos/Quiz_dto');

exports.getQuiz = (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = Quiz_service.getQuizById(quizId);
    res.status(200).json(new Quiz_dto(quiz));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
