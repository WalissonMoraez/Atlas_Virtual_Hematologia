import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/category/:categoriaId/posts/:postId" element={<PostDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
