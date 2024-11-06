// routes/Atlas_routes.js
const express = require('express');
const atlasController = require('../controllers/Atlas_controller');

const router = express.Router();

router.post('/categoria', Atlas_controller.addCategoria); // Adicionar uma nova categoria
router.get('/categorias', Atlas_controller.getCategorias); // Listar todas as categorias
router.get('/categoria/:categoriaId/postagens', Atlas_controller.getPostagensByCategoria); // Listar postagens de uma categoria

module.exports = router;
