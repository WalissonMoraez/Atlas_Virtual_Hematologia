const express = require('express');
const categoryController = require('../controllers/Category_controller');

const router = express.Router();

router.post('/Category_controller', categoryController.createCategoria);
router.post('/Category_controller/:categoriaId/post', categoryController.addPostagemToCategoria);
router.get('/Category_controller/:categoriaId/posts', categoryController.getPostagensByCategoria);

module.exports = router;