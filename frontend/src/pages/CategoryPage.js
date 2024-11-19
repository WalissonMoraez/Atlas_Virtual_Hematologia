import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div className="category-content" style={{ flex: 1 }}>
                <Navbar2 title={categoryDetails.name} />
    
                <section className="study-section">
                    <h2>Estude sobre {categoryDetails.name}</h2>
                    <p>{categoryDetails.description}</p>
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
