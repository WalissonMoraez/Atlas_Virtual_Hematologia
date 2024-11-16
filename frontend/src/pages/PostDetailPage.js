import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { getPostDetails } from '../services/api';
import '../App.css';

const PostDetailPage = () => {
    const { categoriaId, postId } = useParams(); // Obtém categoriaId e postId da URL
    const [post, setPost] = useState(null); // Estado para armazenar os dados da postagem
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Estado para controlar a imagem atual exibida

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

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div>
            {post && <Navbar2 title={post.title} />}
            <div className="post-detail-content">
                {post ? (
                    <>
                        <div className="post-detail-main">
                            <div className="image-section">
                                <img
                                    src={`http://localhost:3000${post.images[currentImageIndex]}`}
                                    alt={`Imagem ${currentImageIndex + 1} da Postagem`}
                                    className="post-image"
                                />
                                <div className="image-buttons">
                                    {post.images.map((_, index) => (
                                        index !== currentImageIndex && (
                                            <button
                                                key={`button-${index}`}
                                                onClick={() => handleImageChange(index)}
                                                className="image-button"
                                            >
                                                {`Imagem ${index + 1}`}
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="description-section">
                            <h3>Descrição</h3>
                            <p>{post.description}</p>
                        </div>

                        <section className="quiz-section">
                            <h2>Teste seu aprendizado</h2>
                            <p>
                                Pronto para testar seus conhecimentos? Clique no botão abaixo e desafie-se com um quiz sobre {post.title}! Explore suas habilidades e descubra o quanto já aprendeu sobre este tema. Boa sorte!
                            </p>
                            <button
                                className="quiz-button"
                                onClick={() => window.location.href = `/category/${categoriaId}/posts/${postId}/quiz`}
                            >
                                Quiz
                            </button>
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
