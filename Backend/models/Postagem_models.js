class Postagem_models {
    constructor(id, description, image_blade, quizId = null) {
      this.id = id;
      this.description = description;
      this.image_blade = image_blade;
      this.quizId = quizId; // Referência ao Quiz, se existir
    }
  }
  
module.exports = Postagem_models;