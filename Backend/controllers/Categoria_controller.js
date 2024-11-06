// controllers/categoria_controlles.js
const Atlas_service = require('../services/Atlas_service');
const Categoria_dto = require('../dtos/Categoria_dto');

exports.getCategorias = (req, res) => {
  const categorias = Atlas_service.getCategorias().map(categoria => new Categoria_dto(categoria));
  res.status(200).json(categorias);
};

exports.getPostagensByCategoria = (req, res) => {
  const { categoriaId } = req.params;
  try {
    const categoria = Atlas_service.getCategoriaById(categoriaId);
    res.status(200).json(new Categoria_dto(categoria));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};