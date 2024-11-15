import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Certifique-se de que o CSS correto está importado

const PostCard = ({ post, categoriaId }) => {
    return (
        <Link to={`/category/${categoriaId}/posts/${post.id}`}>
            <div className="category-card">
                <h3>{post.title || "Título não disponível"}</h3>
            </div>
        </Link>
    );
};

export default PostCard;
