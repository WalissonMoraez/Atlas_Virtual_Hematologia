// dtos/PostagemDTO.js
class Postagem_dto {
  constructor(post) {
    this.id = post.id;
    this.image = post.image;
    this.text = post.text;
    this.quizId = post.quizId; // ID do Quiz, ou null se não houver um quiz associado
    this.currentImage = post.getCurrentImage(); // A imagem atual que está sendo exibida
  }
}

module.exports = Postagem_dto;