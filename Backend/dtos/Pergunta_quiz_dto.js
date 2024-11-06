class Pergunta_quiz_dto {
  constructor(id, text,alternative,id_correct) {
    this.id = id;
    this.text = text;
    this.alternative = alternative; // Array de strings, cada uma sendo uma opção de resposta
    this.id_correct = id_correct;  // Índice da resposta correta no array de respostas
  }

  // Método para verificar se a resposta do usuário está correta
  verificarResposta(indiceResposta){
    return this.indiceCorreta === indiceResposta;
  }
}
  
module.exports = Pergunta_quiz_dto;