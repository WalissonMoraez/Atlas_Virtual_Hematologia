// routes/quizRoutes.js
const express = require('express');
const Quiz_controller = require('../controllers/Quiz_controller');

const router = express.Router();

router.post('/quiz', Quiz_controller.createQuiz); // Criar um novo quiz
router.get('/quiz/:quizId', Quiz_controller.getQuiz); // Obter um quiz pelo ID
router.post('/quiz/:quizId/verificar', Quiz_controller.verificarRespostas); // Verificar respostas de um quiz

module.exports = router;
