import React from 'react';
import '../../src/App.css'; // Importe o arquivo CSS se necessário

const CategoryCard = ({ title, onClick }) => {
    return (
        <div className="category-card" onClick={onClick}>
            <h3>{title}</h3>
        </div>
    );
};

export default CategoryCard;
