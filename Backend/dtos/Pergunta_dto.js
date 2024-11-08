// dtos/PerguntaDTO.js
class Pergunta_dto {
  constructor(question) {
    this.id = question.id;
    this.textQuestion = question.textQuestion;
    this.response = question.response; // Array de opções de resposta
  }
}

module.exports = Pergunta_dto;