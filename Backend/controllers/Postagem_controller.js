const Atlas_service = require('../services/Atlas_service');
const Postagem_dto = require('../dtos/Postagem_dto');

exports.getPostagemById = (req, res) => {
  const { categoriaId, postId } = req.params;
  try {
    const categoria = Atlas_service.getCategoriaById(categoriaId);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const post = categoria.posts.find(postz => postz.id === parseInt(postId));
    if (!post) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    res.status(200).json(new Postagem_dto(post));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};