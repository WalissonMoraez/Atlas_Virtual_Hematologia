const Categoria_models = require('../models/Categoria_models');
const Postagem_models = require('../models/Postagem_models');
const { Quiz_models, Pergunta_models } = require('../models/Quiz_models');

class Categoria_services{
  constructor() {
    this.categorias = []; // Armazena as categorias em memória
  }

  // Criar uma nova categoria
  createCategoria(name, descripton) {
    const newCategoria = new Categoria_models(Date.now(), name, descripton);
    this.categorias.push(newCategoria);
    return newCategoria;
  }

  // Adicionar uma nova postagem a uma categoria
  addPostagemToCategoria(categoriaId, image, text, questions) {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }

    // Criar o quiz a partir das perguntas
    const quizQuestions = questions.map(perguntaData => {
      const { textPergunta, response, responseCorrect } = perguntaData;
      return new Pergunta_models(textPergunta, response, responseCorrect);
    });
    const quiz = new Quiz_models(quizQuestions);

    // Criar a postagem
    const newPostagem = new Postagem_models(Date.now(), image, text, quiz);
    categoria.posts.push(newPostagem);
    return newPostagem;
  }

  // Obter todas as postagens de uma categoria
  getPostagensByCategoria(categoriaId) {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
    return categoria.posts;
  }
}

module.exports = new Categoria_services();