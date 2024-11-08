class Postagem_models {
    constructor(id, text, image, quizId = null) {
      this.id = id;
      this.text = text;
      this.image = image;
      this.quizId = quizId; // Referência ao Quiz, se existir
    }
  }
  
module.exports = Postagem_models;