import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPostDetails } from '../services/api';
import '../App.css';

const PostDetailPage = () => {
    const { categoriaId, postId } = useParams(); // Obtém categoriaId e postId da URL
    const [post, setPost] = useState(null); // Estado para armazenar os dados da postagem
    const [selectedHighlight, setSelectedHighlight] = useState(null); // Estado para controlar o destaque selecionado

    // Função para buscar os detalhes da postagem
    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const data = await getPostDetails(categoriaId, postId);
                setPost(data);
            } catch (error) {
                console.error("Erro ao carregar detalhes da postagem:", error);
            }
        };

        fetchPostDetails();
    }, [categoriaId, postId]);

    // Função para controlar a seleção de destaque (permitindo apenas uma seleção)
    const handleHighlightChange = (index) => {
        setSelectedHighlight(index);
    };
    
    return (
        <div>
            <Navbar />
            <div className="post-detail-content">
                {post ? (
                    <>
                        <h1>{post.title}</h1>

                        <div className="post-detail-main">
                            <div className="image-section">
                                <img src={post.images[post.currentImageIndex]} alt="Imagem da Postagem" className="post-image" />
                            </div>
                            <div className="highlight-options">
                                <h3>Destacar na Imagem</h3>
                                <div className="checkbox-group">
                                    {post.highlights?.map((highlight, index) => (
                                        <label key={index} className="highlight-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedHighlight === index}
                                                onChange={() => handleHighlightChange(index)}
                                            />
                                            {highlight}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="description-section">
                            <h3><strong>Descrição</strong></h3>
                            <p>{post.description}</p>
                        </div>


                        <section className="quiz-section">
                            <h2 className="quiz-title">Teste seu aprendizado</h2>
                            <p className="quiz-description">
                                Pronto para testar seus conhecimentos? Clique no botão abaixo e desafie-se com um quiz sobre este tema! Explore suas habilidades e descubra o quanto já aprendeu sobre este tema. Boa sorte!
                            </p>
                            <button className="quiz-button">Quiz</button>
                            <Link to="/" className="back-link"><strong>VOLTAR À PÁGINA PRINCIPAL</strong></Link>
                        </section>
                    </>
                ) : (
                    <p>Carregando...</p> // Exibe uma mensagem de carregamento enquanto a postagem não é carregada
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PostDetailPage;
