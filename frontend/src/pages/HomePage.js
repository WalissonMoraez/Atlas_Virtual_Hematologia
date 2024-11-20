import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ufjLogo from '../assets/LogoUFJ.png'; // Importe a logo da UFJ
import { getCategories, getCategoryDetails } from '../services/api';
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

    const handleCategoryClick = async (categoryId) => {
        try {
            const categoryDetails = await getCategoryDetails(categoryId);
            if (categoryDetails.posts.length === 1) {
                // Redireciona para a PostDetailPage se houver apenas uma postagem
                const postId = categoryDetails.posts[0].id;
                window.location.href = `/category/${categoryId}/posts/${postId}`;
            } else {
                // Redireciona para a CategoryPage se houver mais de uma postagem
                window.location.href = `/category/${categoryId}`;
            }
        } catch (error) {
            console.error("Erro ao verificar os detalhes da categoria:", error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <div className="categories-section">
                    <h2>Estude as células do sangue</h2>
                    <p>
                        As células do sangue é importante para entender como o corpo funciona e identificar problemas de saúde. O sangue transporta oxigênio, nutrientes e ajuda a combater doenças. Analisar as células sanguíneas ajuda a diagnosticar condições como anemias e infecções, além de contribuir para tratamentos que melhoram a qualidade de vida.
                    </p>
                    <div className="categories-grid">
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map(category => (
                                <CategoryCard
                                    key={category.id}
                                    title={category.name}
                                    image={category.imageUrl}
                                    onClick={() => handleCategoryClick(category.id)}
                                />
                            ))
                        ) : (
                            <p>Nenhuma categoria disponível.</p>
                        )}
                    </div>
                </div>
                <section className="quiz-section">
                            <h2>Teste seu aprendizado</h2>
                            <p>
                                Pronto para testar seus conhecimentos? Clique no botão abaixo e desafie-se com um quiz! Explore suas habilidades e descubra o quanto já aprendeu sobre este tema. Boa sorte!
                            </p>
                            <button
                                className="quiz-button"
                                onClick={() => window.location.href ='https://frontend-production-4d9f.up.railway.app/quiz/1'}
                            >
                                Quiz
                            </button>
                </section>
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
                    <img src={ufjLogo} alt="UFJ Logo" />
                </div>                
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
