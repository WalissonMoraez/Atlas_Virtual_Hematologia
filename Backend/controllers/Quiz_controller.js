const Quiz_service = require('../services/Quiz_service');

// Criar um quiz de maneira solta, sem vínculo com postagem
exports.createQuiz = (req, res) => {
  const { questions } = req.body;

  try {
    const newQuiz = Quiz_service.createQuiz(questions);
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obter todos os quizzes
exports.getAllQuizzes = (req, res) => {
  try {
    const quizzes = Quiz_service.getAllQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Obter um quiz específico pelo ID
exports.getQuiz = (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = Quiz_service.getQuizById(quizId);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Verificar respostas de um quiz específico
exports.verificarRespostas = (req, res) => {
  const { quizId } = req.params;
  const respostasUsuario = req.body.respostas;

  if (!Array.isArray(respostasUsuario)) {
    return res.status(400).json({ message: "As respostas devem ser enviadas como um array." });
  }

  try {
    const resultado = Quiz_service.verificarRespostas(quizId, respostasUsuario);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Obter um quiz associado a uma postagem específica
exports.getQuizByPost = (req, res) => {
  const { categoriaId, postId } = req.params;

  try {
    const quiz = Quiz_service.getQuizByPostagemId(categoriaId, postId);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
