import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Substitua pela URL do seu backend
});

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
};

export const getCategoryDetails = async (id) => {
    try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes da categoria:', error);
    }
};
