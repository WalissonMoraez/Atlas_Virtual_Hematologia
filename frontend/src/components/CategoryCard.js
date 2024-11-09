import React from 'react';
import '../../src/App.css'; // Importe o arquivo CSS se necessário

const CategoryCard = ({ title, image, onClick }) => {
    return (
        <div className="category-card" onClick={onClick}>
            <h3>{title}</h3>
            <img src={image} alt={title} />
        </div>
    );
};

export default CategoryCard;
