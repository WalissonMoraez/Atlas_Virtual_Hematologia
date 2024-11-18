import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCategories } from '../services/api';
import '../App.css'; // Caminho para o arquivo de estilo

const HomePage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Corrigido para chamar getCategories como função
        getCategories()
            .then(response => {
                setCategories(response);
            })
            .catch(error => {
                console.error("Erro ao buscar categorias:", error);
                setCategories([]); // Evita que seja undefined
            });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <div className="categories-section">
                    <h2>Estude as células do sangue</h2>
                    <p>O estudo das células sanguíneas na hematologia é essencial para diagnosticar e monitorar doenças como anemia, leucemia e infecções, além de avaliar tratamentos.</p>
                    <div className="categories-grid">
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
                <div className="about-section">
                    <h2>Sobre o projeto</h2>
                    <p>
                        Este projeto tem como objetivo fornecer uma plataforma interativa e informativa 
                        para o estudo de diferentes tipos de células sanguíneas. Com base em imagens de 
                        lâminas de sangue e descrições detalhadas, os usuários podem aprofundar seu 
                        conhecimento em hematologia.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
