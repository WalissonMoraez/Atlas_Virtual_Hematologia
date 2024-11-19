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
            <div style={{ flex: 1}}>
                <div className="categories-section">
                    <h2>Estude as células do sangue</h2>
                    <p>
                        As células do sangue é importante para entender como o corpo funciona e identificar problemas de saúde. O sangue transporta oxigênio, nutrientes e ajuda a combater doenças. Analisar as células sanguíneas ajuda a diagnosticar condições como anemias e infecções, além de contribuir para tratamentos que melhoram a qualidade de vida.
                    </p>
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
                    Este site é uma plataforma interativa e informativa, projetado para enriquecer o 
                    aprendizado sobre células sanguíneas. Combinando tecnologia e ciência para  
                    <strong> disponibilizar imagens exclusivas de lâminas sanguíneas</strong>, obtidas nos 
                    laboratórios do curso de Biomedicina da Universidade Federal de Jataí (UFJ). 
                    Essas imagens, cuidadosamente selecionadas e implementadas com o apoio de discentes 
                    do curso de Biomedicina e Ciência da Computação, transformam o estudo em uma experiência visual e dinâmica.
                    <br /> <br />
                    Além disso, a plataforma oferece textos de apoio detalhados e quizzes interativos,
                     permitindo que os discentes aprofundem seus conhecimentos e avaliem seu progresso 
                     de forma prática e engajante. O projeto nasce do compromisso de unir esforços acadêmicos
                      entre diferentes áreas, com o propósito de aprimorar a qualidade do ensino e fomentar a 
                      autonomia dos estudantes nesta área essencial da Biomedicina.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
    
};

export default HomePage;