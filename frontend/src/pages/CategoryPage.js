import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import Footer from '../components/Footer';
import { getCategoryDetails } from '../services/api';
import '../App.css';

const CategoryPage = () => {
    
    const { id: categoriaId} = useParams();
    const [posts, setPosts] = useState([]); // Usando 'posts' como o estado
    const [categoryTitle, setCategoryTitle] = useState(''); // Estado para o título da categoria
    const [categoryDescription, setCategoryDescription] = useState(''); // Estado para a descrição da categoria

    useEffect(() => {
        getCategoryDetails(categoriaId)
            .then(data => {
                console.log("Dados recebidos da API:", data); // Verifica a estrutura dos dados
                if (data) {
                    setCategoryTitle(data.title || ''); // Armazena o título da categoria
                    setCategoryDescription(data.description || ''); // Armazena a descrição da categoria
                    setPosts(data.posts || []); // Armazena as postagens da categoria, se existirem
                }
            })
            .catch(error => {
                console.error("Erro ao buscar detalhes da categoria:", error);
            });
    }, [categoriaId]);

    return (
        <div>
            <div className="category-content">
                <nav className='category-header'>
                    <h1>{categoryTitle || "Título não disponível"}</h1>
                    <p>{categoryDescription || "Descrição não disponível"}</p>
                </nav>

                <section className="study-section">
                    <h2>Estude as postagens</h2>
                    <p>Células são essenciais para a manutenção da vida...</p>
                    <div className="posts-grid">
                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map(post => (
                                <Link key={post.id} to={`/category/${categoriaId}/posts/${post.id}`}>
                                    <div className="post-card">
                                        <h3>{post.title}</h3>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>Nenhuma postagem disponível.</p>
                        )}
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;
