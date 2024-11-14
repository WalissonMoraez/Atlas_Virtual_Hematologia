// routes/atlasRoutes.js
const express = require('express');
const router = express.Router();
const Atlas_controller = require('../controllers/Atlas_controller');
const Postagem_controller = require('../controllers/Postagem_controller');

// Rota para obter todas as categorias do atlas (página inicial)
router.get('/categorias', Atlas_controller.getCategorias);

// Rota para criar uma nova categoria
router.post('/categorias', Atlas_controller.addCategoria);

// Rota para listar postagens de uma categoria específica
router.get('/categorias/:categoriaId/posts', Atlas_controller.getPostagensByCategoria);

// Rota para adicionar uma nova postagem em uma categoria específica
router.post('/categorias/:categoriaId/posts', Atlas_controller.addPostagemToCategoria);

// Rota para alterar a imagem de uma postagem específica
router.post('/categorias/:categoriaId/posts/:postId/images', Postagem_controller.changePostImage);

// Rota para obter uma postagem específica
router.get('/categorias/:categoriaId/posts/:postId', Postagem_controller.getPostagemById);

// Rota para obter um quiz específico de uma postagem
router.get('/categorias/:categoriaId/posts/:postId/quiz', Postagem_controller.getQuizByPostagem);




module.exports = router;
