// routes/atlasRoutes.js
const express = require('express');
const router = express.Router();
const Atlas_controller = require('../controllers/Atlas_controller');

// Rota para obter todas as categorias do atlas (página inicial)
router.get('/atlas/categorias', Atlas_controller.getCategorias);

// Rota para criar uma nova categoria
router.post('/categorias', Atlas_controller.addCategoria);

// Rota para listar postagens de uma categoria específica
router.get('/categorias/:categoriaId/postagens', Atlas_controller.getPostagensByCategoria);

// Rota para adicionar uma nova postagem em uma categoria específica
router.post('/categorias/:categoriaId/postagens', Atlas_controller.addPostagemToCategoria);


module.exports = router;
