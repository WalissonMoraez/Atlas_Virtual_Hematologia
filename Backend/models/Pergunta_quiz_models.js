class Pergunta_quiz_models {
    constructor(id, text, alternative, idCorrect) {
      this.id = id; // ID da pergunta ou texto da pergunta
      this.text = text; // Texto da pergunta
      this.alternative = alternative; // Array de strings, cada uma sendo uma opção de resposta
      this.idCorrect = idCorrect;  // Índice da resposta correta no array de respostas
    }

    // Método para verificar se a resposta do usuário está correta
    verificarResposta(idRespostaUsuario){
      return this.idCorrect === idRespostaUsuario;
    }
  }


module.exports = Pergunta_quiz_models;