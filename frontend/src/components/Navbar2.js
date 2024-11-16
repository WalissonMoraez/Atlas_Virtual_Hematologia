import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/navbar2.css'; // Certifique-se de que o CSS correto está importado

// Importa as imagens de fundo e do ícone de voltar
import backgroundImg from '../assets/background-imagem.png';
import backIcon from '../assets/return.png';

const CustomNavbar = ({ title }) => {
    const navigate = useNavigate();

    // Função para retornar à página anterior
    const handleBack = () => {
        navigate(-1); // Redireciona para a página anterior
    };

    return (
        <div className="navbar-container">
            <img src={backgroundImg} alt="background" className="navbar-background" />
            <button className="back-button" onClick={handleBack}>
                <img src={backIcon} alt="Voltar" />
            </button>
            <h1 className="navbar-title">{title}</h1>
        </div>
    );
};

export default CustomNavbar;
