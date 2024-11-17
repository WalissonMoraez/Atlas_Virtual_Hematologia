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
    this.initializeData();
  }

//------------------------------------------------ Objetos --------------------------------------------------------------

initializeData() {
  // Criação de uma categoria inicial com uma postagem e quiz
  const categoria1 = new Categoria_models(Date.now()+1, "Hemácias", "As hemácias, também chamadas de eritrócitos ou glóbulos vermelhos, são as células encontradas em maior abundância no tecido sanguíneo, são anucleadas e tem formato de disco bicôncavo medindo de 7 a 8 µm de diâmetro. Seu formato faz com que a afinidade com moléculas seja maior, facilitando na troca de gases. A composição dos eritrócitos é de 95% de hemoglobina, o que dá a cor avermelhada para as células. Sua principal função é o transporte de oxigênio (O2) e dióxido de carbono (CO2), essa troca de gases é feita pela diferença de pH do meio e da hemácia.");
  const perguntasQuiz = [
    new Pergunta_quiz_models(Date.now()+2, 'Quais os três tipos de células presentes no plasma sanguíneo?', ['Glóbulos vermelhos, glóbulos brancos e cardiomiócitos', 'Glóbulos vermelhos, plaquetas e apenas neutrófilos', 'Plaquetas, glóbulos brancos e glóbulos vermelhos', 'Glóbulos brancos, plaquetas e miócitos'], 2),
    new Pergunta_quiz_models(Date.now()+3, 'Qual a função dos glóbulos brancos?', ['Transportar oxigênio pelo corpo', 'Defesa contra invasores, como bactérias e vírus', 'Realizam a coagulação sanguínea', 'Fazem o carreamento de proteínas'], 1),
    new Pergunta_quiz_models(Date.now()+4, 'Qual a função dos glóbulos vermelhos?', ['Transportar oxigênio pelo corpo', 'Defesa contra invasores, como bactérias e vírus', 'Realizam a coagulação sanguínea', 'Fazem o carreamento de proteínas'], 0),
    new Pergunta_quiz_models(Date.now()+5, 'Qual a função das plaquetas?', ['Transportar oxigênio pelo corpo', 'Defender contra invasores, como bactérias e vírus', 'Realizar a coagulação sanguínea', 'Fazer o carreamento de proteínas'], 2),
    new Pergunta_quiz_models(Date.now()+6, 'Os leucócitos mononucleares são?', ['Monócitos e Neutrófilos Bastonete', 'Monócitos e Neutrófilos Segmentado', 'Linfócitos e Monócitos', 'Linfócitos e Eosinófilos'], 2),
    new Pergunta_quiz_models(Date.now()+7, 'Os leucócitos polimorfonucleares são?', ['Neutrófilos, Leucócitos e Monócitos', 'Basófilos, Eosinófilos e Neutrófilos', 'Neutrófilos, Leucócitos e Eosinófilos', 'Basófilos, Monócitos e Eosinófilos'], 1),
    new Pergunta_quiz_models(Date.now()+8, 'São anucleadas, possuem forma bicôncava e são encontradas em maior abundância no tecido sanguíneo. Tal afirmação se refere à:', ['Plaquetas', 'Hemácias', 'Neutrófilos Segmentados', 'Neutrófilos Bastonetes'], 1),
    new Pergunta_quiz_models(Date.now()+9, 'Apresenta núcleo bilobulado, cromatina densa e aproximadamente vinte grânulos eosinofílicos no citoplasma. Tal afirmação se refere à: ', ['Eosinófilos', 'Plaquetas', 'Basófilos', 'Linfócitos'], 0),
    new Pergunta_quiz_models(Date.now()+10, 'Apresenta grânulos púrpuras, cromatina densa, núcleo multilobulado e estruturas citoplasmáticas chamadas corpos lipídicos, que são ricos em ácido aracdônico. Tal afirmação se refere à: ', ['Eosinófilos', 'Hemácias', 'Neutrófilos Segmentados', 'Basófilos'], 3),
    new Pergunta_quiz_models(Date.now()+11, 'São fragmentos citoplasmáticos de megacariócitos, que possuem função para realização da coagulação sanguínea. Tal afirmação se refere à: ', ['Basófilos', 'Plaquetas', 'Neutrófilos Segmentados', 'Neutrófilos Bastonetes'], 1),
    new Pergunta_quiz_models(Date.now()+12, 'Pode apresentar vacúolos citoplasmáticos, com núcleo grande e irregular e cromatina predominantemente frouxa. Tal afirmação se refere à:', ['Hemácias', 'Linfócitos', 'Monócitos', 'Eosinófilos'], 2),
    new Pergunta_quiz_models(Date.now()+13, 'Seu citoplasma é escasso, apresentando um núcleo regular e arredondado. Tal afirmação se refere à:', ['Linfócitos', 'Monócitos', 'Neutrófilos Segmentados', 'Basófilos'], 0),
    new Pergunta_quiz_models(Date.now()+14, 'Seu núcleo é multilobulado, no qual os lóbulos são conectados por um delicado filamento de cromatina, apresentando uma fina granulação. Tal afirmação se refere à:', ['Basófilos', 'Neutrófilos Segmentado', 'Eosinófilos', 'Neutrófilos Bastonetes'], 1),
    new Pergunta_quiz_models(Date.now()+15, 'São células que estão em escassa quantidade na circulação sanguínea sob condições fisiológicas normais, apresentando um núcleo com configuração de bastão. Tal afirmação de refere à: ', ['Basófilos', 'Neutrófilos Segmentado', 'Eosinófilos', 'Neutrófilos Bastonetes'], 3),
  ];
  const quiz1 = new Quiz_models(Date.now()+18, perguntasQuiz);
  this.addQuiz(quiz1);
  const postagem1 = new Postagem_models(Date.now()+19, [
    '/public/images/hemacias/hemacia0.jpg',
    '/public/images/hemacias/hemacia1.jpg',
    '/public/images/hemacias/hemacia0.jpg'
  ], 'Hemácias Crenadas', 'Hemácias que sofrem plasmólise, ou seja, perdem água de forma excessiva, resultando em murchamento e danos reversíveis à célula', quiz1.id, categoria1.id,
  [
    'Crenada',
    'Suiif'

  ]);
  categoria1.addPost(postagem1);
  this.categorias.push(categoria1);
}


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
  addPostagemToCategoria(categoriaId,  title, images, description, questions, titlebutton) {
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
  const newPost = new Postagem_models(Date.now(), title, images, description, quizId, categoriaId, titlebutton);
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
      throw new Error('Categoria não encontrada');
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
    const post = categoria.posts.find(p => p.id === parseInt(postId));

    if (!categoria) {
      throw new Error("Categoria não encontrada");
    }else if (!post) {
      throw new Error("Postagem não encontrada");
    }
  
    try {
      const newImage = post.changeImage(newIndex);
      return newImage; // Retorna a nova imagem exibida
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
