class Categoria_models {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.posts = [];
    }

    addPost(post) {
      this.posts.push(post);
    }
    
  }
  
module.exports = Categoria_models;