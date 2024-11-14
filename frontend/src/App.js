import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PostDetailPage from './pages/PostDetailPage';
import QuizPage from './pages/QuizPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/category/:categoriaId/posts/:postId" element={<PostDetailPage />} />
                <Route path="/category/:categoriaId/posts/:postId/quiz" element={<QuizPage />} />
            </Routes>
        </Router>
    );
}

export default App;
