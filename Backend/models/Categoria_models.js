class Categoria_models {
    constructor(id, title, description) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.posts = [];
    }
  }
  
module.exports = Categoria_models;