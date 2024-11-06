// routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const Categoria_controller = require('../controllers/Categoria_controller');

// Rota para obter todas as postagens dentro de uma categoria específica
router.get('/categoria/:categoriaId/posts', Categoria_controller.getPostagensByCategoria);

module.exports = router;
