class Quiz_dto {
  constructor(questions) {
    this.questions = questions;
  }
}

class Questions_dto {
  constructor(textQuestion, response, responseCorrect) {
    this.textQuestion = textQuestion;
    this.response = response; // Array de strings de respostas
    this.responseCorrect = responseCorrect; // Índice da resposta correta
  }
}

module.exports = {Quiz_dto, Questions_dto};