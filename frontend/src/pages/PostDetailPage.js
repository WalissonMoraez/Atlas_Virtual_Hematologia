import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';

const PostDetailPage = ({ post }) => {
    const [selectedHighlight, setSelectedHighlight] = useState(null);

    // Função para controlar a seleção de destaque (permitindo apenas uma seleção)
    const handleHighlightChange = (index) => {
        setSelectedHighlight(index);
    };

    return (
        <div>
            <Navbar />
            <div className="post-detail-content">
                <h1>{post.title}</h1>

                <div className="post-detail-main">
                    <div className="image-section">
                        <img src={post.image} alt="Imagem da Postagem" className="post-image" />
                    </div>
                    <div className="highlight-options">
                        <h3>Destacar na Imagem</h3>
                        <div className="checkbox-group">
                            {post.highlights.map((highlight, index) => (
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
                    <h3>Descrição</h3>
                    <p>{post.description}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PostDetailPage;
