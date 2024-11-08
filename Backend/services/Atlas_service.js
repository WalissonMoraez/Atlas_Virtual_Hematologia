// services/Atlas_service.js
const Atlas_models = require('../models/Atlas_models');
const Categoria_models = require('../models/Categoria_models');
const Postagem_models = require('../models/Postagem_models');
const {Quiz_models} = require('../models/Quiz_models');
const Pergunta_quiz_models = require('../models/Pergunta_quiz_models');


class Atlas_service {
  constructor() {
    this.atlas = new Atlas_models();
    this.categorias = [];
  }

  // Adicionar uma nova categoria ao Atlas
  addCategoria(name, description) {
    const newCategoria = new Categoria_models(Date.now(), name, description);
    this.categorias.push(newCategoria);
    return newCategoria;
  }

  // Listar todas as categorias no Atlas
  getCategorias() {
    return this.categorias;
  }

  getCategoriaById(categoriaId) {
    const categoria = this.categorias.find(cat => cat.id === parseInt(categoriaId));
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria;
  }

  // Obter uma categoria pelo ID e listar suas postagens
  getPostagensByCategoria(categoriaId) {
    const categoria = this.getCategoriaById(categoriaId);
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
    if (questions && questions.length > 0) {
      const newQuiz = new Quiz_models(Date.now(), questions.map(q => new Pergunta_quiz_models(q.textQuestion, q.response, q.responseCorrect)));
      quizId = newQuiz.id;
    }

    const newPost = new Postagem_models(Date.now(), image, text, quizId);
    categoria.posts.push(newPost);
    return newPost;
  }
}

module.exports = new Atlas_service();
