// routes/atlasRoutes.js
const express = require('express');
const router = express.Router();
const Atlas_controller = require('../controllers/Atlas_controller');

// Rota para obter todas as categorias do atlas (página inicial)
router.get('/atlas/categorias', Atlas_controller.getCategorias);

module.exports = router;
