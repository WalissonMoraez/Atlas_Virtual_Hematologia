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

// Função para adicionar uma nova postagem a uma categoria existente
exports.addPostagemToCategoria = (req, res) => {
  const { categoriaId } = req.params;
  const { images, text, questions } = req.body;

  try {
    const newPost = Atlas_service.addPostagemToCategoria(categoriaId, images, text, questions);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.changePostImage = (req, res) => {
  const { categoriaId, postId } = req.params;
  const { newIndex } = req.body;

  try {
    const newImage = Atlas_service.changePostImage(categoriaId, parseInt(postId), newIndex);
    res.status(200).json({ newImage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};