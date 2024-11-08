// services/Atlas_service.js
const Categoria_models = require('../models/Categoria_models');
const Postagem_models = require('../models/Postagem_models');
const Quiz_service = require('../services/Quiz_service');

class Atlas_service {
  constructor() {
    this.categorias = [];
  }

  // Adicionar uma nova categoria ao Atlas
  addCategoria(name, description) {
    const newCategoria = new Categoria_models(Date.now(), name, description);
    this.atlas.addCategoria(newCategoria);
    return newCategoria;
  }

  // Listar todas as categorias no Atlas
  getCategorias() {
    return this.atlas.getCategorias();
  }

  getCategoriaById(categoriaId) {
    const categoria = this.atlas.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria;
  }

  // Obter uma categoria pelo ID e listar suas postagens
  getPostagensByCategoria(categoriaId) {
    const categoria = this.atlas.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria.posts;
  }

  // Adicionar uma nova postagem a uma categoria existente
  addPostagemToCategoria(categoriaId, image, text, questions) {
    const categoria = this.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    let quizId = null;
    if (questions.length > 0) {
      const newQuiz = Quiz_service.createQuiz(questions);
      quizId = newQuiz.id;
    }

    const newPost = new Postagem_models(Date.now(), image, text, quizId);
    categoria.posts.push(newPost);
    return newPost;
  }
}

module.exports = new Atlas_service();
