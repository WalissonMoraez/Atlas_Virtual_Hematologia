// app.js
const express = require('express');
const app = express();
const Atlas_routes = require('./routes/Atlas_routes');
const Categoria_routes = require('./routes/Categoria_routes');
const Postagem_routes = require('./routes/Postagem_routes');
const Quiz_routes = require('./routes/Quiz_routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Aplicação dos arquivos de rotas
app.use('/api/atlas', Atlas_routes);        // Rotas principais do atlas
app.use('/api/atlas', Categoria_routes);     // Rotas específicas para categorias
app.use('/api/atlas', Postagem_routes);      // Rotas específicas para postagens
app.use('/api/quiz', Quiz_routes);          // Rotas específicas para quizzes
app.use(cors({ origin: 'http://localhost:4000' })); //Essa configuração permitirá que qualquer origem acesse a API. Para limitar a origens específicas

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});