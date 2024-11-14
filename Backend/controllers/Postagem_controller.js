// controllers/Postagem_controlles.js

const Categoria_service = require('../services/Categoria_services');
const Postagem_dto = require('../dtos/Postagem_dto');
const Atlas_service = require('../services/Atlas_service');

exports.getPostagemById = (req, res) => {
  const { categoriaId, postId } = req.params;
  try {
    const categoria = Atlas_service.getCategoriaById(categoriaId);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    const postagem = categoria.posts.find(post => post.id === parseInt(postId));
    if (!postagem) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }
    res.status(200).json(postagem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Função para alterar a imagem de uma postagem específica
exports.changePostImage = (req, res) => {
  const { categoriaId, postId } = req.params;
  const { newIndex } = req.body;

  try {
    Atlas_service.changePostImage(categoriaId, parseInt(postId), newIndex);
    const categoria = Atlas_service.getCategoriaById(categoriaId);
    const postagem = categoria.posts.find(post => post.id === parseInt(postId));
    const currentImage = postagem.getCurrentImage();
    res.status(200).json({ currentImage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getQuizByPostagem = (req, res) => {
  const { categoriaId, postId } = req.params;

  try {
    const quiz = Atlas_service.getQuizByPostagemId(categoriaId, postId);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


