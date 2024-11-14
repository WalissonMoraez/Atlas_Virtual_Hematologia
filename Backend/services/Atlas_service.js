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
    this.quizzes = [];
  }

  //Funcoes para utilizar o atlas

  // Adicionar uma nova categoria ao Atlas
  addCategoria(name, description) {
    const newCategoria = new Categoria_models(Date.now(), name, description);
    this.categorias.push(newCategoria);
    return newCategoria;
  }

  // Função para adicionar um quiz a uma categoria ou postagem específica
  addQuiz(quiz) {
    this.quizzes.push(quiz);
  }

  // Adicionar uma nova postagem a uma categoria existente
  addPostagemToCategoria(categoriaId,  title, images, description, questions) {
    const categoria = this.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    let quizId = null;
    if (questions && questions.length > 0) {
      const newQuiz = new Quiz_models(Date.now(), questions.map(q => new Pergunta_quiz_models(q.textQuestion, q.response, q.responseCorrect)));
      quizId = newQuiz.id;
      this.addQuiz(newQuiz);
    }
    
  // Certifique-se de que description está sendo corretamente passada
  const newPost = new Postagem_models(Date.now(), title, images, description, quizId, categoriaId);
  categoria.posts.push(newPost);
  return newPost;
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



  // Alterando a imagem atual
  changePostImage(categoriaId, postId, newIndex) {
    const categoria = this.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
  
    const post = categoria.posts.find(p => p.id === postId);
    if (!post) {
      throw new Error("Postagem não encontrada");
    }
  
    try {
      return post.changeImage(newIndex);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  getQuizByPostagemId(categoriaId, postId) {

  
    // Verificar se a categoria foi encontrada
    const categoria = this.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }
  
    // Verificar se a postagem foi encontrada dentro da categoria
    const postagem = categoria.posts.find(post => post.id === parseInt(postId));
    if (!postagem) {
      throw new Error("Postagem não encontrada");
    }
  
    // Verificar se a postagem tem um quizId associado
    if (!postagem.quizId) {
      throw new Error("Quiz não encontrado para esta postagem");
    }
  
    // Buscar o quiz associado
    const quiz = this.quizzes ? this.quizzes.find(q => q.id === postagem.quizId) : null;
    if (!quiz) {
      throw new Error("Quiz não encontrado");
    }
  
    return quiz;
  }
  
  

}

module.exports = new Atlas_service();
