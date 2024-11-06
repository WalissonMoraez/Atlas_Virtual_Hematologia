// controllers/quizController.js
const Quiz_service = require('../services/Quiz_service');

exports.createQuiz = (req, res) => {
  const { questions } = req.body;
  const quiz = Quiz_service.createQuiz(questions);
  res.status(201).json(quiz);
};

exports.getQuiz = (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = Quiz_service.getQuizById(quizId);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.verificarRespostas = (req, res) => {
  const { quizId } = req.params;
  const { response } = req.body;
  try {
    const result = quizService.verificarRespostas(quizId, response);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
