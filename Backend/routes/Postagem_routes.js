// routes/postagemRoutes.js
const express = require('express');
const router = express.Router();
const Postagem_controller = require('../controllers/Postagem_controller');

// Rota para obter os detalhes de uma postagem específica dentro de uma categoria
router.get('/categoria/:categoriaId/post/:postId', Postagem_controller.getPostagemById);

module.exports = router;
