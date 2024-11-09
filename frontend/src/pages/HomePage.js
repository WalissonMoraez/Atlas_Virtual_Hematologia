import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCategories } from '../services/api';
import '../App.css'; // Caminho para o arquivo de estilo

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
            {/* Adicione a seção "Sobre o projeto" aqui */}
            <div className="about-section">
                <h2>Sobre o projeto</h2>
                <p>
                    Este projeto tem como objetivo fornecer uma plataforma interativa e informativa 
                    para o estudo de diferentes tipos de células sanguíneas. Com base em imagens de 
                    lâminas de sangue e descrições detalhadas, os usuários podem aprofundar seu 
                    conhecimento em hematologia.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
