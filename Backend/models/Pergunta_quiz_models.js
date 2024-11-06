class Pergunta_quiz_models {
    constructor(id, text,alternative,response_correct) {
      this.id = id;
      this.text = text;
      this.alternative = alternative;
      this.response_correct = response_correct;
    }
  }
  
module.exports = Pergunta_quiz_models;