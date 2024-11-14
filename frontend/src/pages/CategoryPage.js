import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCategoryDetails } from '../services/api';
import '../App.css';

const CategoryPage = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]); // Usando 'posts' como o estado

    useEffect(() => {
        getCategoryDetails(id)
            .then(data => {
                console.log("Dados recebidos da API:", data); // Verifica a estrutura dos dados
                setPosts(data); // Salva o array de posts diretamente
            })
            .catch(error => {
                console.error("Erro ao buscar detalhes da categoria:", error);
            });
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="category-content">
                <header className="category-header">
                    <h1>Categorias</h1>
                    <p>Postagens para a categoria selecionada.</p>
                </header>

                <section className="study-section">
                    <h2>Estude as postagens</h2>
                    <p>Células são essenciais para a manutenção da vida...</p>
                    <div className="posts-grid">
                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map(post => (
                                <div key={post.id} className="post-card">
                                    <img src={post.images[0]} alt="Imagem da postagem" /> {/* Exibe a primeira imagem */}
                                    <p>{post.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>Nenhuma postagem disponível.</p>
                        )}
                    </div>
                </section>

                <section className="quiz-section">
                    <h2>Teste seu aprendizado</h2>
                    <p>Pronto para testar seus conhecimentos? Clique no botão abaixo e desafie-se com um quiz 
                        sobre <strong>{getCategoryDetails.name}</strong> Explore suas habilidades e descubra o quanto já aprendeu sobre este tema. Boa sorte!</p>
                    <Link to="/" className="back-link">Voltar à página principal</Link>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;
