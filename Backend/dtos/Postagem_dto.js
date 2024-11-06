// dtos/PostagemDTO.js
class Postagem_dto {
  constructor(post) {
    this.id = post.id;
    this.image = post.image;
    this.text = post.text;
    this.quizId = post.quizId; // ID do Quiz, ou null se não houver um quiz associado
  }
}

module.exports = Postagem_dto;