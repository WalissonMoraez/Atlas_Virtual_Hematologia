import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Substitua pela URL do seu backend
});

export const getCategories = async () => {
    try {
        const response = await api.get('/atlas/categorias');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
};

// Função para buscar postagens de uma categoria específica
export const getCategoryDetails = async (categoriaId) => {
    try {
        const response = await api.get(`/atlas/categorias/${categoriaId}/posts`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes da categoria:', error);
    }
};

// Função para obter uma postagem específica
export const getPostDetails = async (categoriaId, postId) => {
    try {
        const response = await api.get(`/atlas/categoria/${categoriaId}/post/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes da postagem:', error);
    }
};

// Função para buscar um quiz específico
export const getQuiz = async (quizId) => {
    try {
        const response = await api.get(`/quiz/${quizId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar quiz:', error);
    }
};