import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import Footer from '../components/Footer';
import { getCategoryDetails } from '../services/api';
import '../App.css';

const CategoryPage = () => {
    
    const { id: categoriaId} = useParams();
    const [posts, setPosts] = useState([]); // Usando 'posts' como o estado


    useEffect(() => {
        getCategoryDetails(categoriaId)
            .then(data => {
                console.log("Dados recebidos da API:", data); // Verifica a estrutura dos dados
                setPosts(data); // Salva o array de posts diretamente
            })
            .catch(error => {
                console.error("Erro ao buscar detalhes da categoria:", error);
            });
    }, [categoriaId]);

    return (
        <div>
            <div className="category-content">
                <header className="category-header">
                    <h1>{categoriaId.title}</h1>
                    <p>{getCategoryDetails.description}</p>
                </header>

                <section className="study-section">
                    <h2>Estude as postagens</h2>
                    <p>Células são essenciais para a manutenção da vida...</p>
                    <div className="posts-grid">
                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map(post => (
                                <Link key={post.id} to={`/category/${categoriaId}/posts/${post.id}`}>
                                    <div className="post-card">
                                        <img src={post.images[0]} alt="Imagem da postagem" /> {/* Exibe a primeira imagem */}
                                        <p>{post.text}</p>
                                    </div>
                                </Link>
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
