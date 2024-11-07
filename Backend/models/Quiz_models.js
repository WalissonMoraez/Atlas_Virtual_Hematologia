class Quiz_models {
    constructor(id, questions = []) {
      this.id = id;
      this.questions = questions; // Array de objetos Pergunta
    }

    addQuestion(question) {
      this.questions.push(question);
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