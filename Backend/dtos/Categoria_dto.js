// dtos/CategoriaDTO.js
class Categoria_dto {
  constructor(categoria) {
    this.id = categoria.id;
    this.name = categoria.nome;
    this.description = categoria.description;
    this.posts = categoria.posts.map(post => new Postagem_dto(post));
  }
}

module.exports = Categoria_dto;