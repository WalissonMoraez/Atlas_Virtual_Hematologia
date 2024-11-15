import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { getCategoryDetails } from '../services/api';
import '../App.css';

const CategoryPage = () => {
    const { id: categoriaId } = useParams();
    const [categoryDetails, setCategoryDetails] = useState({ title: '', description: '', posts: [] });

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const data = await getCategoryDetails(categoriaId);
                console.log("Dados recebidos da API:", data); // Verifique a estrutura dos dados no console
                if (data) {
                    setCategoryDetails({
                        name: data.name || 'Título não disponível',
                        description: data.description || 'Descrição não disponível',
                        posts: data.posts || []
                    });
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes da categoria:", error);
            }
        };

        fetchCategoryDetails();
    }, [categoriaId]);

    return (
        <div>
            <div className="category-content">
                <nav className='category-header'>
                    <h1>{categoryDetails.name}</h1>
                    <p>{categoryDetails.description}</p>
                </nav>

                <section className="study-section">
                    <h2>Estude as postagens</h2>
                    <p>Células são essenciais para a manutenção da vida, pois garantem que os tecidos do corpo recebam o oxigênio necessário para suas funções metabólicas.</p>
                    <div className="posts-grid">
                        {Array.isArray(categoryDetails.posts) && categoryDetails.posts.length > 0 ? (
                            categoryDetails.posts.map(post => (
                                <PostCard key={post.id} post={post} categoriaId={categoriaId} />
                            ))
                        ) : (
                            <p>Nenhuma postagem disponível.</p>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;
