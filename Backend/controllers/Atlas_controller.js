const Atlas_service = require('../services/Atlas_service');

exports.addCategoria = (req, res) => {
  const { name, description } = req.body;
  const categoria = Atlas_service.addCategoria(name, description);
  res.status(201).json(categoria);
};

exports.getCategorias = (req, res) => {
  const categorias = Atlas_service.getCategorias();
  res.status(200).json(categorias);
};

exports.getPostagensByCategoria = (req, res) => {
  const { categoriaId } = req.params;
  try {
    const posts = Atlas_service.getPostagensByCategoria(categoriaId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};