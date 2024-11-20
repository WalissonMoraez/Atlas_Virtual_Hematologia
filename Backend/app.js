// app.js
const express = require('express');
const app = express();
const Atlas_routes = require('./routes/Atlas_routes');
const Categoria_routes = require('./routes/Categoria_routes');
const Postagem_routes = require('./routes/Postagem_routes');
const Quiz_routes = require('./routes/Quiz_routes');
const cors = require('cors');

app.use(cors({
    origin: 'https://frontend-production-4d9f.up.railway.app', // Adicione o domínio do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite métodos que serão usados pelo seu frontend
    credentials: true // Se precisar lidar com cookies ou sessões, esta opção é importante
}));
app.use(express.json());
app.use('/public', express.static('public'));

// Aplicação dos arquivos de rotas
app.use('/api/atlas', Atlas_routes);        // Rotas principais do atlas
app.use('/api/atlas', Categoria_routes);     // Rotas específicas para categorias
app.use('/api/atlas', Postagem_routes);      // Rotas específicas para postagens
app.use('/api/quiz', Quiz_routes);          // Rotas específicas para quizzes
//app.use(cors({ origin: 'https://frontend-production-4d9f.up.railway.app' })); //Essa configuração permitirá que qualquer origem acesse a API. Para limitar a origens específicas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});