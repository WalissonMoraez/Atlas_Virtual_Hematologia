// controllers/categoria_controlles.js
const Category_service = require('../services/Categoria_services');

exports.createCategoria = (req, res) => {
  const { name, description } = req.body;
  const categoria = Category_service.createCategoria(name, description);
  res.status(201).json(categoria);
};

exports.addPostagemToCategoria = (req, res) => {
  const { categoriaId } = req.params;
  const { imagem, text, questions } = req.body;

  try {
    const post = Category_service.addPostagemToCategoria(
      categoriaId,
      imagem,
      text,
      questions
    );
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getPostagensByCategoria = (req, res) => {
  const { categoriaId } = req.params;
  try {
    const posts = Category_service.getPostagensByCategoria(categoriaId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};