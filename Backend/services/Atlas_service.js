// services/Atlas_service.js

const Atlas_models = require('../models/Atlas_models');
const Categoria_models = require('../models/Categoria_models');
const Postagem_models = require('../models/Postagem_models');
const Quiz_models = require('../models/Quiz_models');
const Pergunta_quiz_models = require('../models/Pergunta_quiz_models');
const Quiz_service = require('../services/Quiz_service');


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
  const gv = new Categoria_models(Date.now()+1, "Glóbulos Vermelhos", "As hemácias, também chamadas de eritrócitos ou glóbulos vermelhos, são as células encontradas em maior abundância no tecido sanguíneo, são anucleadas e tem formato de disco bicôncavo medindo de 7 a 8 µm de diâmetro. Seu formato faz com que a afinidade com moléculas seja maior, facilitando na troca de gases. A composição dos eritrócitos é de 95% de hemoglobina, o que dá a cor avermelhada para as células. Sua principal função é o transporte de oxigênio (O2) e dióxido de carbono (CO2), essa troca de gases é feita pela diferença de pH do meio e da hemácia.");
  const gb = new Categoria_models(Date.now()+2, "Glóbulos Brancos", "Glóbulos brancos, ou leucócitos, são células responsáveis pela defesa do organismo contra infecções e substâncias estranhas. Produzidos na medula óssea, os leucócitos se dividem em granulócitos (neutrófilos, eosinófilos, basófilos) e agranulócitos (monócitos e linfócitos). Cada tipo possui funções específicas: os neutrófilos realizam fagocitose de bactérias, os eosinófilos combatem parasitas e reações alérgicas, enquanto os basófilos liberam histamina em resposta a alérgenos. Monócitos se transformam em macrófagos nos tecidos, e linfócitos são fundamentais na resposta imune adaptativa, produzindo anticorpos e atacando células infectadas ou anômalas.");
  const pl = new Categoria_models(Date.now()+3, "Plaquetas", "Plaquetas são fragmentações derivadas do citoplasma de megacariócitos na medula óssea, sendo que cada megacariócito origina em média 3000 plaquetas. As plaquetas medem cerca de 1 a 3 µm de diâmetro e vivem, em média, 10 dias na circulação sanguínea. Elas apresentam forma discóide, sem núcleo e no citoplasma há a presença de mitocôndrias,  numerosos grânulos com diferentes densidades eletrônicas e glicogênio, servindo como fonte de energia para as plaquetas. Por fim, a função das plaquetas é realizar a manutenção da integridade dos endotélios vasculares, com seu papel na hemostasia primária.");

  const perguntasQuiz = [
    new Pergunta_quiz_models(Date.now()+4, 'Quais os três tipos de células presentes no plasma sanguíneo?', ['Glóbulos vermelhos, glóbulos brancos e cardiomiócitos', 'Glóbulos vermelhos, plaquetas e apenas neutrófilos', 'Plaquetas, glóbulos brancos e glóbulos vermelhos', 'Glóbulos brancos, plaquetas e miócitos'], 2),
    new Pergunta_quiz_models(Date.now()+5, 'Qual a função dos glóbulos brancos?', ['Transportar oxigênio pelo corpo', 'Defesa contra invasores, como bactérias e vírus', 'Realizam a coagulação sanguínea', 'Fazem o carreamento de proteínas'], 1),
    new Pergunta_quiz_models(Date.now()+6, 'Qual a função dos glóbulos vermelhos?', ['Transportar oxigênio pelo corpo', 'Defesa contra invasores, como bactérias e vírus', 'Realizam a coagulação sanguínea', 'Fazem o carreamento de proteínas'], 0),
    new Pergunta_quiz_models(Date.now()+7, 'Qual a função das plaquetas?', ['Transportar oxigênio pelo corpo', 'Defender contra invasores, como bactérias e vírus', 'Realizar a coagulação sanguínea', 'Fazer o carreamento de proteínas'], 2),
    new Pergunta_quiz_models(Date.now()+8, 'Os leucócitos mononucleares são?', ['Monócitos e Neutrófilos Bastonete', 'Monócitos e Neutrófilos Segmentado', 'Linfócitos e Monócitos', 'Linfócitos e Eosinófilos'], 2),
    new Pergunta_quiz_models(Date.now()+9, 'Os leucócitos polimorfonucleares são?', ['Neutrófilos, Leucócitos e Monócitos', 'Basófilos, Eosinófilos e Neutrófilos', 'Neutrófilos, Leucócitos e Eosinófilos', 'Basófilos, Monócitos e Eosinófilos'], 1),
    new Pergunta_quiz_models(Date.now()+10, 'São anucleadas, possuem forma bicôncava e são encontradas em maior abundância no tecido sanguíneo. Tal afirmação se refere à:', ['Plaquetas', 'Hemácias', 'Neutrófilos Segmentados', 'Neutrófilos Bastonetes'], 1),
    new Pergunta_quiz_models(Date.now()+11, 'Apresenta núcleo bilobulado, cromatina densa e aproximadamente vinte grânulos eosinofílicos no citoplasma. Tal afirmação se refere à: ', ['Eosinófilos', 'Plaquetas', 'Basófilos', 'Linfócitos'], 0),
    new Pergunta_quiz_models(Date.now()+12, 'Apresenta grânulos púrpuras, cromatina densa, núcleo multilobulado e estruturas citoplasmáticas chamadas corpos lipídicos, que são ricos em ácido aracdônico. Tal afirmação se refere à: ', ['Eosinófilos', 'Hemácias', 'Neutrófilos Segmentados', 'Basófilos'], 3),
    new Pergunta_quiz_models(Date.now()+13, 'São fragmentos citoplasmáticos de megacariócitos, que possuem função para realização da coagulação sanguínea. Tal afirmação se refere à: ', ['Basófilos', 'Plaquetas', 'Neutrófilos Segmentados', 'Neutrófilos Bastonetes'], 1),
    new Pergunta_quiz_models(Date.now()+14, 'Pode apresentar vacúolos citoplasmáticos, com núcleo grande e irregular e cromatina predominantemente frouxa. Tal afirmação se refere à:', ['Hemácias', 'Linfócitos', 'Monócitos', 'Eosinófilos'], 2),
    new Pergunta_quiz_models(Date.now()+15, 'Seu citoplasma é escasso, apresentando um núcleo regular e arredondado. Tal afirmação se refere à:', ['Linfócitos', 'Monócitos', 'Neutrófilos Segmentados', 'Basófilos'], 0),
    new Pergunta_quiz_models(Date.now()+16, 'Seu núcleo é multilobulado, no qual os lóbulos são conectados por um delicado filamento de cromatina, apresentando uma fina granulação. Tal afirmação se refere à:', ['Basófilos', 'Neutrófilos Segmentado', 'Eosinófilos', 'Neutrófilos Bastonetes'], 1),
    new Pergunta_quiz_models(Date.now()+17, 'São células que estão em escassa quantidade na circulação sanguínea sob condições fisiológicas normais, apresentando um núcleo com configuração de bastão. Tal afirmação de refere à: ', ['Basófilos', 'Neutrófilos Segmentado', 'Eosinófilos', 'Neutrófilos Bastonetes'], 3),
  ];
  const quiz1 = new Quiz_models(1, perguntasQuiz);
  Quiz_service.quizzes.push(quiz1);

  const gv1 = new Postagem_models(Date.now()+19, [
    '/public/images/gv/hemacia0.png',
    '/public/images/gv/hemacia1.png',
    '/public/images/gv/linfocito.png'],
     'Hemácias', 'As hemácias, também chamadas de eritrócitos ou glóbulos vermelhos, são as células encontradas em maior abundância no tecido sanguíneo, são anucleadas e tem formato de disco bicôncavo medindo de 7 a 8 µm de diâmetro. Seu formato faz com que a afinidade com moléculas seja maior, facilitando na troca de gases. A composição dos eritrócitos é de 95% de hemoglobina, o que dá a cor avermelhada para as células. Sua principal função é o transporte de oxigênio (O2) e dióxido de carbono (CO2), essa troca de gases é feita pela diferença de pH do meio e da hemácia.', null, gv.id, [
      'Hemácia',
      'Linfócito']);

  const gb1 = new Postagem_models(Date.now()+20, [
    '/public/images/gb/neutrofilo_segmentado/segmentado0.png',
    '/public/images/gb/neutrofilo_segmentado/segmentado1.png'],
     'Neutrófilo Segmentado', 'O neutrófilo segmentado é caracterizado por ser uma célula com um núcleo multilobulado, geralmente com 2 a 4 lóbulos, contendo cromatina púrpura escura e densa. Esses lóbulos são conectados por um delicado filamento de cromatina, muitas vezes imperceptível na microscopia convencional. O citoplasma é rico, com uma coloração levemente rosada e apresenta uma fina granulação, que pode conferir ao citoplasma uma aparência de vidro fosco.', null, gb.id, [
      'Neutrófilo Segmentado']);

  const gb2 = new Postagem_models(Date.now()+21, [
    '/public/images/gb/neutrofilo_bastonete/bastonete0.png',
    '/public/images/gb/neutrofilo_bastonete/bastonete1.png',
    '/public/images/gb/neutrofilo_bastonete/linfocito0.png'],
     'Neutrófilo Bastonete', 'Os neutrófilos em estágio bastonete estão presentes em escassa quantidade na circulação sanguínea periférica sob condições fisiológicas normais. Eles se distinguem de formas celulares mais imaturas pela maior condensação da cromatina e pela modificação da morfologia nuclear, que adota a configuração de um bastão ou meia lua, resultando em um diâmetro praticamente uniforme ao longo de sua extensão.', null, gb.id, [
      'Bastonete',
      'Linfócito']);

  const gb3 = new Postagem_models(Date.now()+22, [
    '/public/images/gb/eosinofilo/eosinofilo0.png',
    '/public/images/gb/eosinofilo/eosinofilo1.png',
    '/public/images/gb/eosinofilo/linfocito.png',
    '/public/images/gb/eosinofilo/plaqueta.png'], 
    'Eosinófilo', 'Os eosinófilos exibem um diâmetro médio de cerca de 8 µm. O citoplasma dessas células é notavelmente abundante e caracterizado pela presença de aproximadamente vinte grânulos eosinofílicos por célula. O núcleo é bilobulado e apresenta cromatina densa, que é intensamente corada em eosina. Apresentam granulação grosseira, formada por grânulos primários e os grânulos secundários que se coram intensamente de cor avermelhada/alaranjada.', null, gb.id, [
      'Eosinófilo',
      'Linfócito',
      'Plaqueta']);

  const gb4 = new Postagem_models(Date.now()+23, [
    '/public/images/gb/basofilos/basofilo0.png',
    '/public/images/gb/basofilos/basofilo1.png',
    '/public/images/gb/basofilos/hemacia.png',
    '/public/images/gb/basofilos/plaqueta.png'], 
    'Basófilos', 'Os basófilos são reconhecidos pela presença de grânulos citoplasmáticos que se coram com corantes básicos, adquirindo uma tonalidade purpúrea escura nas técnicas de coloração convencionais. Além da distinção proporcionada pelos grânulos basófilos, essa subpopulação celular é relativamente grande, apresentando um diâmetro entre 10 e 15 µm. O citoplasma é abundante, com uma coloração rosada e uma alta concentração de grânulos basófilos. Além disso, os basófilos possuem estruturas citoplasmáticas conhecidas como corpos lipídicos, que são ricos em ácido aracdônico e apresentam uma densidade eletrônica elevada. O núcleo é multilobulado e exibe uma cromatina densa.', null, gb.id, [
      'Basófilo',
      'Hemácia',
      'Plaqueta']);

  const gb5 = new Postagem_models(Date.now()+24, [
    '/public/images/gb/monocitos/monocito0.png',
    '/public/images/gb/monocitos/monocito1.png',
    '/public/images/gb/hemacia0.png'], 
    'Monócitos', 'As células apresentam um tamanho entre 12 e 15 µm de diâmetro em relação à sua morfologia. O citoplasma é abundante e exibe uma coloração cinza ou azul-claro acinzentada, com uma fina granulação, dando-lhe uma aparência de vidro fosco devido a essa granulação, assemelhando-se a uma fina poeira. É comum encontrar vacúolos citoplasmáticos nas células. O núcleo, geralmente grande, oval ou indentado, está posicionado centralmente na célula, enquanto o nucléolo não é facilmente visível em colorações convencionais. A relação nucleocitoplasmática é baixa. A cromatina é delicada, predominantemente frouxa, com filamentos estreitos conectando pequenas áreas de cromatina mais densa.', null, gb.id, [
      'Monócitos']);

  const gb6 = new Postagem_models(Date.now()+25, [
    '/public/images/gb/linfocitos/linfocito0.png',
    '/public/images/gb/linfocitos/linfocito1.png',
    '/public/images/gb/linfocitos/hemacia.png'], 
    'Linfócitos', 'São células pequenas (com dimensões entre 6 e 15 µm), regulares e arredondadas. Apresentam uma relação nucleocitoplasmática elevada, com o núcleo ocupando aproximadamente 90% da área da célula. O citoplasma é escasso e basófilo, enquanto o núcleo é regular e esférico, exibindo uma tonalidade azul-arroxeada e uma cromatina sem nucléolo evidente.', null, gb.id, [
      'Linfócito',
      'Hemácia']);

  const pl1 = new Postagem_models(Date.now()+26, [
    '/public/images/pl/plaqueta0.png',
    '/public/images/pl/plaqueta1.png'
  ], 
    'Plaquetas', 'Plaquetas são fragmentações derivadas do citoplasma de megacariócitos na medula óssea, sendo que cada megacariócito origina em média 3000 plaquetas. As plaquetas medem cerca de 1 a 3 µm de diâmetro e vivem, em média, 10 dias na circulação sanguínea. Elas apresentam forma discóide, sem núcleo e no citoplasma há a presença de mitocôndrias,  numerosos grânulos com diferentes densidades eletrônicas e glicogênio, servindo como fonte de energia para as plaquetas. Por fim, a função das plaquetas é realizar a manutenção da integridade dos endotélios vasculares, com seu papel na hemostasia primária.',null, pl.id, 
    ['Plaquetas']);

  gv.addPost(gv1);
    gb.addPost(gb1);
      gb.addPost(gb2);
        gb.addPost(gb3);
        gb.addPost(gb4);
      gb.addPost(gb5);
    gb.addPost(gb6);
  pl.addPost(pl1);
  this.categorias.push(gv);
  this.categorias.push(gb);
  this.categorias.push(pl);
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
  addPostagemToCategoria(categoriaId, title, images, description, questions = [], titlebutton = []) {
    const categoria = this.getCategoriaById(categoriaId);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
  
    let quizId = null;
    // Se houver perguntas, cria o quiz e obtém o ID
    if (questions.length > 0) {
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
  
    // Criar uma nova postagem sem quiz associado
    const newPost = new Postagem_models(Date.now(), images, title, description, quizId, categoriaId, titlebutton);
    categoria.posts.push(newPost);
    return newnull
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