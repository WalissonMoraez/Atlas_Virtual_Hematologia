import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { getPostDetails } from '../services/api';
import '../App.css';

const PostDetailPage = () => {
    const { categoriaId, postId } = useParams(); // Obtém categoriaId e postId da URL
    const [post, setPost] = useState(null); // Estado para armazenar os dados da postagem
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice da imagem atual

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

    // Função para lidar com a seleção das opções
    const handleOptionChange = (index) => {
        if (currentImageIndex === index) {
            // Se desmarcar, volta para a imagem principal (índice 0)
            setCurrentImageIndex(0);
        } else {
            // Atualiza para a imagem selecionada
            setCurrentImageIndex(index);
        }
    };

    return (
        <div>
            {post && <Navbar2 title={post.title} />}
            <div className="post-detail-content">
                {post ? (
                    <>
                        <div className="post-main-detail">
                        {/* Contêiner principal que organiza a imagem e as opções */}
                        <div className="image-selector-container">
                            {/* Imagem principal */}
                            <img
                                src={`https://backend-production-47be.up.railway.app${post.images[currentImageIndex]}`}
                                alt="Imagem da Postagem"
                                className="post-image"
                            />

                            {/* Opções de seleção de imagem com títulos personalizados */}
                            <div className="selector-options">
                                {post.titlebutton?.map((title, index) => (
                                        <label key={index} className="option-label">
                                            <input
                                                type="checkbox"
                                                name="imageSelector"
                                                value={index + 1}
                                                checked={currentImageIndex === index + 1}
                                                onChange={() => handleOptionChange(index + 1)}
                                            />
                                            {title}
                                        </label>
                                ))}
                            </div>
                        </div>
                    </div>

                        <div className="description-section">
                            <h3>Descrição</h3>
                            <p>{post.description}</p>
                        </div>
                        
                    {/* Quiz para cada postagem
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
                        */}
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
