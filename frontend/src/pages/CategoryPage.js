import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCategoryDetails } from '../services/api';
import '../App.css';

const CategoryPage = () => {
    const { id } = useParams();
    const [categoryDetails, setCategoryDetails] = useState(null);

    useEffect(() => {
        getCategoryDetails(id).then(data => {
            console.log(data); // Verifique aqui se 'posts' está incluído
            setCategoryDetails(data);
        });
    }, [id]);

    return (
        <div>
            <Navbar />
            {categoryDetails ? (
                <div className="category-content">
                    <header className="category-header">
                        <h1>{categoryDetails.name}</h1>
                        <p>{categoryDetails.description}</p>
                    </header>

                    <section className="study-section">
                        <h2>Estude as {categoryDetails.name ? categoryDetails.name.toLowerCase() : ''}</h2>
                        <p>Células são essenciais para a manutenção da vida...</p>
                        <div className="posts-grid">
                            {Array.isArray(categoryDetails.posts) && categoryDetails.posts.length > 0 ? (
                                categoryDetails.posts.map(post => (
                                    <div key={post.id} className="post-card">
                                        <img src={post.imageUrl} alt={post.title} />
                                        <h3>{post.title}</h3>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma postagem disponível.</p>
                            )}
                        </div>

                    </section>

                    <section className="quiz-section">
                        <h2>Teste seu aprendizado</h2>
                        <p>Adipisci consequatur est placeat...</p>
                        <button className="quiz-button">Quiz sobre {categoryDetails.name}</button>
                        <Link to="/" className="back-link">Voltar à página principal</Link>
                    </section>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
            <Footer />
        </div>
    );
};

export default CategoryPage;
