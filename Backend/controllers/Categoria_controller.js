// controllers/Categoria_controlles.js

const Categoria_service = require('../services/Categoria_services');
const Categoria_dto = require('../dtos/Categoria_dto');

exports.getPostagensByCategoria = (req, res) => {
  const { categoriaId } = req.params;
  try {
    const categoria = Categoria_service.getCategoriaById(categoriaId);
    if (!categoria) {
      res.status(404).json({ message: "Categoria não encontrada" });
    } else {
      res.status(200).json(new Categoria_dto(categoria));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
