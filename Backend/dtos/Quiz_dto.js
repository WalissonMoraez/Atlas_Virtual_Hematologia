// dtos/QuizDTO.js
const Postagem_dto = require('./Postagem_dto');

class Quiz_dto {
  constructor(quiz) {
    this.id = quiz.id;
    this.questions = quiz.questions.map(question => new Postagem_dto(question));
  }
}

module.exports = Quiz_dto;