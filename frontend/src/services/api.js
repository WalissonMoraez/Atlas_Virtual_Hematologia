import axios from 'axios';

// Defina a URL base corretamente
const BASE_URL = 'https://backend-production-47be.up.railway.app'; // Substitua pela URL do seu backend, se necessário

// Crie uma instância do axios com a URL base
const api = axios.create({
    baseURL: BASE_URL,
});

// Função para buscar categorias
export const getCategories = async () => {
    try {
        const response = await api.get('/api/atlas/categorias'); // Utilize a instância `api`
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        throw error;
    }
};

// Função para obter uma postagem específica
export const getPostDetails = async (categoriaId, postId) => {
    try {
        const response = await api.get(`/api/atlas/categorias/${categoriaId}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes da postagem:', error);
        throw error;
    }
};

// Função para buscar um quiz específico
export const getQuiz = async (quizId) => {
    try {
        const response = await axios.get(`https://backend-production-47be.up.railway.app/api/quiz/${quizId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o quiz:", error); // Adicione esse console para verificar o erro específico
        throw error;
    }
};

// Função para buscar detalhes de um quiz com base na categoria e postagem
export const getQuizDetails = async (categoriaId, postId) => {
    try {
        const response = await api.get(`/api/atlas/categorias/${categoriaId}/posts/${postId}/quiz`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do quiz:', error);
        throw error;
    }
};

// Função para buscar detalhes de uma categoria
export const getCategoryDetails = async (categoryId) => {
    try {
        const response = await api.get(`/api/atlas/categorias/${categoryId}`); // Utilize a instância `api`
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes da categoria:", error);
        throw error;
    }
};
