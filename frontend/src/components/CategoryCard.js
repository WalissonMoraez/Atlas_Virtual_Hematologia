import React from 'react';

const CategoryCard = ({ title, image, onClick }) => {
    return (
        <div className="category-card" onClick={onClick}>
            <img src={image} alt={title} />
            <h3>{title}</h3>
        </div>
    );
};

export default CategoryCard;
