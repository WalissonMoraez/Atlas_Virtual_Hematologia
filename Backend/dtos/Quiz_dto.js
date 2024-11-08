// dtos/Quiz_dto.js
const Pergunta_dto = require('./Pergunta_dto');

class Quiz_dto {
  constructor(quiz) {
    this.id = quiz.id;
    this.questions = quiz.questions.map(question => new Pergunta_dto(question));
  }
}

module.exports = Quiz_dto;