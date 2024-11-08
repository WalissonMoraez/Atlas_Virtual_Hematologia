const Quiz_service = require('../services/Quiz_service');
const Quiz_dto = require('../dtos/Quiz_dto');

exports.createQuiz = (req, res) => {
  const { questions } = req.body;
  try {
    const quiz = Quiz_service.createQuiz(questions);
    res.status(201).json(new Quiz_dto(quiz));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getQuiz = (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = Quiz_service.getQuizById(quizId);
    res.status(200).json(new Quiz_dto(quiz));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.verificarRespostas = (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;
  try {
    const result = Quiz_service.verificarRespostas(quizId, answers);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
