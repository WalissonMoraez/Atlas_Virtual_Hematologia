// services/quizService.js
const Quiz_models = require('../models/Quiz_models');
const Pergunta_quiz_models = require('../models/Pergunta_quiz_models');

class Quiz_service {
  constructor() {
    this.quizzes = []; // Armazena todos os quizzes
  }

  // Criar um novo quiz e armazená-lo
  createQuiz(questionsData) {
    const newQuiz = new Quiz_models(Date.now());
    questionsData.forEach(questionData => {
      const { textQuestion, response, idCorrect } = questionData;
      const question = new Pergunta_quiz_models(Date.now(), textQuestion, response, idCorrect);
      novoQuiz.addPergunta(question);
    });
    this.quizzes.push(newQuiz);
    return newQuiz;
  }

  // Obter um quiz pelo ID
  getQuizById(quizId) {
    const quiz = this.quizzes.find(q => q.id === quizId);
    if (!quiz) {
      throw new Error("Quiz não encontrado");
    }
    return quiz;
  }

  // Verificar respostas do usuário para um quiz específico
  verificarRespostas(quizId, responseUser) {
    const quiz = this.getQuizById(quizId);
    const result = quiz.questions.map((question, id) => ({
      questionId: question.id,
      correta: question.verificarResposta(responseUser[id])
    }));
    return result;
  }
}

module.exports = new Quiz_service();
