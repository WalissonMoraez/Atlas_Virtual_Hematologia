// services/Atlas_service.js
const Atlas_models = require('../models/Atlas_models');
const Categoria_models = require('../models/Categoria_models');
const Postagem_models = require('../models/Postagem_models');

class Atlas_service {
  constructor() {
    this.atlas = new Atlas_models();
  }

  // Adicionar uma nova categoria ao Atlas
  addCategoria(name, description) {
    const novaCategoria = new Categoria_models(Date.now(), name, description);
    this.atlas.addCategoria(novaCategoria);
    return novaCategoria;
  }

  // Listar todas as categorias no Atlas
  getCategorias() {
    return this.atlas.getCategorias();
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
  addPostagemToCategoria(categoriaId, imagem, text, questions) {
    const categoria = this.atlas.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }

    const quizQuestions = questions.map(perguntaData => {
      const { textQuestion, response, responseCorrect } = perguntaData;
      return new Question_models(textQuestion, response, responseCorrect);
    });
    const quiz = new Quiz(quizQuestions);

    const newPost = new Postagem_models(Date.now(), imagem, text, quiz);
    categoria.posts.push(newPost);
    return newPost;
  }
}

module.exports = new Atlas_service();
