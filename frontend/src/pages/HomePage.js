import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCategories } from '../services/api';

const HomePage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Busca as categorias do backend
        getCategories().then(data => setCategories(data));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="home-content">
                <h2>Estude as células do sangue</h2>
                <div className="categories">
                    {categories.map(category => (
                        <CategoryCard
                            key={category.id}
                            title={category.name}
                            image={category.imageUrl}
                            onClick={() => window.location.href = `/category/${category.id}`}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
