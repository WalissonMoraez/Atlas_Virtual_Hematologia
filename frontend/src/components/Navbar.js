// Navbar.js
import React from 'react';
import ufjLogo from '../assets/LogoUFJ.png'; // Importe a logo da UFJ
import '../App.css'; // Importe o CSS

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src={ufjLogo} alt="UFJ Logo" />
            <h1>Atlas Interativo de Hematologia</h1>
            <p className="subtitle">Ferramenta interativa para auxílio no estudo de hematologia</p> {/* Adicione ou remova o texto conforme desejado */}
        </nav>
    );
};

export default Navbar;


