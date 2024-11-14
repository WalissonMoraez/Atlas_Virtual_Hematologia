import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ufjLogo from '../assets/LogoUFJ.png'; // Importe a logo da UFJ
import { getQuizDetails } from '../services/api';
import Footer from '../components/Footer';
import '../App.css'; 

const QuizPage = () => {
    const { categoriaId, postId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);

    // Carrega os detalhes do quiz
    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const data = await getQuizDetails(categoriaId, postId);
                setQuiz(data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do quiz:", error);
            }
        };
        fetchQuizDetails();
    }, [categoriaId, postId]);

    // Lida com a seleção de uma resposta
    const handleAnswerChange = (questionIndex, altIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: altIndex,
        });
    };

    // Confirma as respostas e calcula o total de acertos
    const handleConfirmAnswers = () => {
        let correctAnswers = 0;
        quiz.questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.idCorrect) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
    };

    return (
        <div className='quiz-cotainer'>
            {/* Header com Navbar e Título */}
            <header className="quiz-header">
                <nav className="navbar">
                    <img src={ufjLogo} alt="UFJ Logo" />
                        <h1>post.title</h1>            
                </nav>
            </header>

            <h1 className='quiz-title'>Quiz</h1>
            {quiz ? (
                quiz.questions.map((question, questionIndex) => (
                    <div key={`question-${questionIndex}`} className="question-card">
                        <h2 className='question-title'>Questão {questionIndex + 1}</h2>
                        <p className='question-text'>{question.text}</p>
                        <div className="options-container">
                            {question.alternative.map((alt, altIndex) => (
                                <label key={`alt-${questionIndex}-${altIndex}`} className="option-label">
                                    <input
                                        type="radio"
                                        name={`question-${questionIndex}`}
                                        onChange={() => handleAnswerChange(questionIndex, altIndex)}
                                        checked={selectedAnswers[questionIndex] === altIndex}
                                    />
                                    {alt}
                                </label>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>Carregando...</p>
            )}

            {/* Botão para confirmar as respostas */}
            <button onClick={handleConfirmAnswers} className='confirm-button'>Confirmar</button>

            {/* Mostra o total de acertos após a confirmação */}
            {score !== null && (
                <p className='score-text'>
                    Você acertou {score} de {quiz.questions.length} questões.
                </p>
            )}
            <Footer />
        </div>
    );
};

export default QuizPage;
