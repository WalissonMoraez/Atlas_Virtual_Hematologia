class Atlas_models {
  constructor() {
    this.categorias = []; // Armazena todas as categorias do atlas
  }
  
  addCategoria(categoria) {
    this.categorias.push(categoria);
  }

  getCategorias() {
    return this.categorias;
  }

  getCategoriaById(id) {
    return this.categorias.find(categoria => categoria.id === id);
  }


}
  
module.exports = Atlas_models;