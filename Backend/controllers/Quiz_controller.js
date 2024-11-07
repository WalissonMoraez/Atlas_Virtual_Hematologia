
const { Quiz_models, Questions_models } = require('../models/Quiz_models'); // Verifique se esse caminho está correto

// Função para obter um quiz específico
exports.getQuiz = (req, res) => {
    const { quizId } = req.params;
    const quiz = Quiz_models.findById(quizId); // Ajuste essa linha com a lógica correta
    if (quiz) {
        res.status(200).json(quiz);
    } else {
        res.status(404).json({ message: 'Quiz não encontrado' });
    }
};

// Função para verificar as respostas de um quiz
exports.verificarRespostas = (req, res) => {
    const { quizId } = req.params;
    const { answers } = req.body;

    const quiz = Quiz_models.findById(quizId); // Ajuste essa linha com a lógica correta
    if (!quiz) {
        return res.status(404).json({ message: 'Quiz não encontrado' });
    }

    // Verifique as respostas (lógica fictícia)
    const results = quiz.questions.map((question, index) => ({
        question: question.textQuestion,
        correct: question.responseCorrect === answers[index]
    }));

    res.status(200).json({ results });
};

// Função para criar um quiz
exports.createQuiz = (req, res) => {
  const { questions } = req.body;

  // Criar perguntas como instâncias de Questions_models
  const formattedQuestions = questions.map((q) => {
      return new Questions_models(q.textQuestion, q.response, q.responseCorrect);
  });

  // Criar o quiz usando o construtor da classe Quiz_models
  const newQuiz = new Quiz_models(Date.now(), formattedQuestions);

  res.status(201).json(newQuiz);
};