const Postagem_models = require('../models/Postagem_models'); // Importe o modelo de Postagem

exports.getPostagensByCategoriaId = (categoriaId) => {
  return Postagem_models.find({ categoriaId }); // Encontre postagens pela categoria
};
