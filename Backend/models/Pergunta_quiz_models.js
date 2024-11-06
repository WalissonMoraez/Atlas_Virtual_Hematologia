class Pergunta_quiz_models {
    constructor(id, text, alternative, idCorrect) {
      this.id = id;
      this.text = text;
      this.alternative = alternative; // Array de strings, cada uma sendo uma opção de resposta
      this.idCorrect = idCorrect;  // Índice da resposta correta no array de respostas
    }

    // Método para verificar se a resposta do usuário está correta
    verificarResposta(idCorrect){
      return this.idCorrect === idCorrect;
    }
  }


module.exports = Pergunta_quiz_models;