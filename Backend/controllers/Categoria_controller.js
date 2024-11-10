// controllers/Categoria_controlles.js

const Categoria_service = require('../services/Categoria_services');
const Categoria_dto = require('../dtos/Categoria_dto');

exports.getPostagensByCategoria = async (req, res) => {
  const { categoriaId } = req.params;
  try {
    // Busca a categoria pelo ID e inclui as postagens associadas
    const categoria = await Categoria_service.getCategoriaById(categoriaId);
    if (!categoria) {
      res.status(404).json({ message: "Categoria não encontrada" });
    } else {
      // Busca as postagens associadas e adiciona à resposta
      const posts = await Categoria_service.getPostagensByCategoriaId(categoriaId);
      categoria.posts = posts;
      res.status(200).json(new Categoria_dto(categoria)); // Retorna a categoria com as postagens
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
