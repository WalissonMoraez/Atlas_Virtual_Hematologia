class Quiz_models {
    constructor(questions) {
      this.questions = questions;
    }
  }

  class Questions_models {
    constructor(textQuestion, response, responseCorrect) {
      this.textQuestion = textQuestion;
      this.response = response; // Array de strings de respostas
      this.responseCorrect = responseCorrect; // Índice da resposta correta
    }
  }
  
module.exports = {Quiz_models, Questions_models};