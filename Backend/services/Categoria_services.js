const Categoria_models = require('../models/Categoria_models');
const Postagem_models = require('../models/Postagem_models');
const Quiz_service = require('../services/Quiz_service');

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

    // Obter todas as categorias
      getCategorias() {
        return this.categorias;
      }

    // Obter uma categoria específica pelo ID
    getCategoriaById(id) {
      return this.categorias.find(categoria => categoria.id === id);
    }

    // Adicionar uma nova postagem a uma categoria
    addPostagemToCategoria(categoriaId, image, text, questions = []) {
    const categoria = this.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }

    // Se houver perguntas, cria um quiz e obtém o ID
    let quizId = null;
    if (perguntas.length > 0) {
      const newQuiz = Quiz_service.createQuiz(questions); // Cria o quiz com as perguntas
      quizId = newQuiz.id;
    }

    // Cria a nova postagem e associa o quizId (se existir)
    const newPost = new Postagem_models(Date.now(), image, text, quizId);
    categoria.posts.push(newPost);
    return newPost;
    }

    getPostagensByCategoriaId = async (categoriaId) => {
      try {
        return await Postagem.find({ categoriaId }); // Busca as postagens pela categoriaId
      } catch (error) {
        throw new Error('Erro ao buscar as postagens da categoria');
      }
    };
}

module.exports = new Categoria_services();