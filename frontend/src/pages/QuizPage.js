import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getQuizDetails } from '../services/api'; // Crie uma função para buscar o quiz

const QuizPage = () => {
    const { categoriaId, postId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        const fetchQuizDetails = async () => {
          try {
            const data = await getQuizDetails(categoriaId, postId);
            setQuizData(data);
          } catch (error) {
            console.error("Erro ao buscar detalhes do quiz:", error);
          }
        };
        fetchQuizDetails();
      }, [categoriaId, postId]);

      
    const handleAnswerChange = (index) => {
        setSelectedAnswer(index);
    };

    const handleConfirm = () => {
        // Lógica para confirmar a resposta
        console.log("Resposta selecionada:", selectedAnswer);
    };

    if (!quizData) {
        return <p>Carregando quiz...</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="quiz-content">
                <div className="question-section">
                    <h2>Questão {quizData.questionNumber}</h2>
                    <p>{quizData.questionText}</p>
                </div>
                <div className="answers-section">
                    {quizData.answers.map((answer, index) => (
                        <label key={index} className="answer-label">
                            <input
                                type="radio"
                                name="answer"
                                checked={selectedAnswer === index}
                                onChange={() => handleAnswerChange(index)}
                            />
                            {answer}
                        </label>
                    ))}
                </div>
                <button className="confirm-button" onClick={handleConfirm}>Confirmar</button>
            </div>
            <Footer />
        </div>
    );
};

export default QuizPage;
