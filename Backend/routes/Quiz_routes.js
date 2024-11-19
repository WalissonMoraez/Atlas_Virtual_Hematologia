const express = require('express');
const router = express.Router();
const Quiz_controller = require('../controllers/Quiz_controller');

// Rota para criar um novo quiz
router.post('/', Quiz_controller.createQuiz);

// Rota para obter todos os quizzes
router.get('/', Quiz_controller.getAllQuizzes);

// Rota para obter um quiz específico pelo ID
router.get('/:quizId', Quiz_controller.getQuiz);

// Rota para verificar as respostas de um quiz específico
router.post('/:quizId/verificar', Quiz_controller.verificarRespostas);

// Rota para obter um quiz associado a uma postagem
router.get('/categoria/:categoriaId/post/:postId/quiz', Quiz_controller.getQuizByPost);

module.exports = router;
