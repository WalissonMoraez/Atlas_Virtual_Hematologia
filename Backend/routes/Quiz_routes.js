// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz_controller = require('../controllers/Quiz_controller');

// Rota para obter um quiz específico
router.get('/:quizId', Quiz_controller.getQuiz);

// Rota para verificar as respostas de um quiz
router.post('/:quizId/verificar', Quiz_controller.verificarRespostas);

// Rota para criar um quiz
router.post('/', Quiz_controller.createQuiz);

module.exports = router;
