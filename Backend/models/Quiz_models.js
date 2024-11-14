class Quiz_models {
    constructor(id, questions = []) {
      this.id = id;
      this.questions = questions; // Array de objetos Pergunta
    }

    addQuestion(question) {
      this.questions.push(question);
    }
  }
  
module.exports = Quiz_models;