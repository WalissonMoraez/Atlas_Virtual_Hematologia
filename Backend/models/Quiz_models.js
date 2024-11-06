class Quiz_models {
    constructor(id, questions = []) {
      this.id = id;
      this.questions = questions; // Array de objetos Pergunta
    }
  }

  class Questions_models {
    constructor(textQuestion, response, responseCorrect) {
      this.textQuestion = textQuestion;
      this.response = response; // Array de strings de respostas
      this.responseCorrect = responseCorrect; // Índice da resposta correta
    }

    addQuestion(question) {
      this.questions.push(question);
    }
  }
  
module.exports = {Quiz_models, Questions_models};