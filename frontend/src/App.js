import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PostDetailPage from './pages/PostDetailPage';

const postage = {
    title: "Título H1",
    image: "https://example.com/image.jpg",
    description: "Descrição detalhada da postagem.",
    highlights: ["Destacar XXXX na imagem", "Destacar YYYY na imagem", "Destacar ZZZZ na imagem"]
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/post/:postId" element={<PostDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
