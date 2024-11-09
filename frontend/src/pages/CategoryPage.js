import React, { useEffect, useState } from 'react'; // Importa React e hooks 'useEffect' e 'useState' para gerenciamento de estado e efeitos colaterais.
import { useParams } from 'react-router-dom'; // Importa 'useParams' para capturar os parâmetros da URL.
import Navbar from '../components/Navbar'; // Importa o componente 'Navbar' para exibir a barra de navegação.
import Footer from '../components/Footer'; // Importa o componente 'Footer' para exibir o rodapé.
import { getCategoryDetails } from '../services/api'; // Importa a função que faz a chamada à API para obter os detalhes de uma categoria.

const CategoryPage = () => {
    const { id } = useParams(); // Usa o hook 'useParams' para obter o ID da categoria da URL.
    const [categoryDetails, setCategoryDetails] = useState(null); // Inicializa o estado 'categoryDetails' como 'null', que será preenchido com os detalhes da categoria.

    useEffect(() => {
        // Função que é executada assim que o componente é montado ou quando o ID da categoria muda.
        getCategoryDetails(id).then(data => setCategoryDetails(data)); // Chama a função da API para buscar os detalhes da categoria e atualiza o estado.
    }, [id]); // O 'useEffect' é executado sempre que o ID muda.

    return (
        <div>
            <Navbar /> {/* Renderiza a barra de navegação no topo da página */}
            <div className="category-content"> {/* Div principal para o conteúdo da categoria */}
                {categoryDetails ? ( // Verifica se 'categoryDetails' contém dados.
                    <>
                        <h2>{categoryDetails.name}</h2> {/* Exibe o nome da categoria */}
                        {/* Renderiza cada postagem associada à categoria */}
                        {categoryDetails.posts.map(post => (
                            <div key={post.id}> {/* Usa o ID da postagem como chave para cada item de lista */}
                                <h3>{post.title}</h3> {/* Exibe o título da postagem */}
                                <img src={post.imageUrl} alt={post.title} /> {/* Exibe a imagem da postagem */}
                                <p>{post.description}</p> {/* Exibe a descrição da postagem */}
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Carregando...</p> // Exibe uma mensagem de carregamento enquanto os dados não são carregados.
                )}
            </div>
            <Footer /> {/* Renderiza o rodapé da página */}
        </div>
    );
};

export default CategoryPage; // Exporta o componente 'CategoryPage' como padrão.

/*Explicação Detalhada
useParams: O hook useParams é utilizado para capturar os parâmetros da URL, 
neste caso, o id da categoria, que é necessário para buscar os detalhes dessa categoria específica.

useEffect: Este hook é usado para realizar efeitos colaterais, como chamadas à API. 
Aqui, ele é executado ao montar o componente e sempre que o id da categoria mudar. 
Isso garante que a página exiba as informações corretas quando o usuário navegar para outra categoria.

getCategoryDetails: Essa função faz uma chamada à API (implementada em api.js) para buscar os 
detalhes da categoria com base no id recebido. O resultado é armazenado no estado categoryDetails 
através de setCategoryDetails.

Renderização Condicional: A renderização condicional categoryDetails ? (...) : (...) exibe o 
conteúdo da categoria apenas quando os dados são carregados. Se os dados ainda não foram buscados, 
é mostrada a mensagem "Carregando...".

map: O método map é usado para iterar sobre o array de postagens 
dentro da categoria, renderizando um bloco de título, imagem e descrição para cada postagem.*/