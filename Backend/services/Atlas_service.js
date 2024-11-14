// services/Atlas_service.js

const Atlas_models = require('../models/Atlas_models');
const Categoria_models = require('../models/Categoria_models');
const Postagem_models = require('../models/Postagem_models');
const Quiz_models = require('../models/Quiz_models');
const Pergunta_quiz_models = require('../models/Pergunta_quiz_models');


class Atlas_service {
  constructor() {
    this.atlas = new Atlas_models();
    this.categorias = [];
    this.quizzes = [];
  }

//------------------------------------------------ Objetos --------------------------------------------------------------


//------------------------------------------------Funcoes para utilizar o atlas ------------------------------------------------
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
      const quizQuestions = questions.map(q => {
        const { textQuestion, response, responseCorrect } = q;
  
        // Verificação dos dados recebidos para criar a pergunta
        if (textQuestion === undefined || response === undefined || responseCorrect === undefined) {
          throw new Error("Dados da pergunta do quiz estão faltando");
        }
  
        return new Pergunta_quiz_models(Date.now(), textQuestion, response, responseCorrect);
      });
  
      const newQuiz = new Quiz_models(Date.now(), quizQuestions);
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

  getQuizByPostagemId(categoriaId, postId) {
    
    const categoria = this.categorias.find(cat => cat.id === parseInt(categoriaId));
    const postagem = categoria.posts.find(post => post.id === parseInt(postId));
    const quiz = this.quizzes ? this.quizzes.find(q => q.id === postagem.quizId) : null; // Buscar o quiz associado

      if (!categoria) {
        // Verificar se a categoria foi encontrada
        throw new Error("Categoria não encontrada");
      }else if (!postagem) {
        // Verificar se a postagem foi encontrada dentro da categoria
        throw new Error("Postagem não encontrada");
      }else if (!postagem.quizId) {
        // Verificar se a postagem tem um quizId associado
        throw new Error("Quiz não encontrado para esta postagem");
      }else if (!quiz) {
        // Verificar se o quiz foi encontrado
        throw new Error("Quiz não encontrado");
      }

    return quiz;
  }

  // Alterando a imagem atual
  changePostImage(categoriaId, postId, newIndex) {
    const categoria = this.getCategoriaById(categoriaId);
    const post = categoria.posts.find(p => p.id === postId);

    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }else if (!post) {
      throw new Error("Postagem não encontrada");
    }
  
    try {
      return post.changeImage(newIndex);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  verificarRespostasDoQuiz(categoriaId, postId, respostasUsuario) {
    const categoria = this.getCategoriaById(categoriaId); // Busca a categoria pelo ID
    const postagem = categoria.posts.find(post => post.id === parseInt(postId)); // Busca a postagem dentro da categoria
    const quiz = this.quizzes.find(q => q.id === postagem.quizId);  // Busca o quiz pelo quizId

    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }else if (!postagem) {
      throw new Error("Postagem não encontrada");
    }else if (!postagem.quizId) {
      // Verifica se a postagem tem um quiz associado
      throw new Error("Quiz não encontrado para esta postagem");
    }else if (!quiz) {
      throw new Error("Quiz não encontrado");
    }else if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
       // Verificar se o quiz possui perguntas
      throw new Error("O quiz não possui perguntas.");
    }

    // Verifica as respostas do usuário em relação às respostas corretas do quiz
    const resultado = quiz.questions.map((question, index) => {
      if (respostasUsuario[index] === undefined) {
        throw new Error(`Resposta para a pergunta ${index + 1} não foi fornecida.`);
      }
  
      return {
        questionId: question.text,
        correta: question.verificarResposta(parseInt(respostasUsuario[index]))
      };
    });
  
    return resultado;
  }

}

module.exports = new Atlas_service();
