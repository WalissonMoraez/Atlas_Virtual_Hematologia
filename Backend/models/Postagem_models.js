class Postagem_models {
  constructor(id, images, title, description, quizId = null, categoriaId) {
    this.id = id;
    this.title = title;
    this.images = images; // Deve ser um array de URLs
    this.description = description; // Descrição da postagem
    this.categoriaId = categoriaId;
    this.quizId = quizId; // Referência ao Quiz, se existir
    this.currentImageIndex = 0; // Índice da imagem atualmente exibida
  }

    // Método para alterar a imagem exibida
    changeImage(newIndex) {
      if (newIndex >= 0 && newIndex < this.images.length) {
        this.currentImageIndex = newIndex;
        return this.images[newIndex];
      } else {
        throw new Error("Índice de imagem inválido");
      }
    }

    // Método para obter a imagem atual pelo botao
    getCurrentImage() {
      return this.images[this.currentImageIndex];
    }
  }
  
module.exports = Postagem_models;