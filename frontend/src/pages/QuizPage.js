import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizDetails } from '../services/api';

const QuizPage = () => {
    const { categoriaId, postId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Carrega os detalhes do quiz
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


    // Lida com a seleção de uma resposta
    const handleAnswerChange = (questionId, selectedIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: selectedIndex,
        });
    };

    // Submete o quiz e calcula a pontuação
    const handleSubmit = () => {
        let totalScore = 0;
        quizData.questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.idCorrect) {
                totalScore += 1;
            }
        });
        setScore(totalScore);
        setIsSubmitted(true);
    };

    return (
        <div>
            <h2>Quiz</h2>

            {quizData && quizData.questions.map((question, questionIndex) => (
                <div key={`question-${questionIndex}`} className="question-card">
                    <h3>Questão {questionIndex + 1}</h3>
                    <p>{question.text}</p>
                    <div className="options">
                        {question.alternative.map((option, index) => (
                            <label key={`alt-${questionIndex}-${index}`}>
                                <input
                                    type="radio"
                                    name={`question-${questionIndex}`}
                                    checked={selectedAnswers[question.id] === index}
                                    onChange={() => handleAnswerChange(question.id, index)}
                                    disabled={isSubmitted}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            {!isSubmitted ? (
                <button onClick={handleSubmit}>Confirmar</button>
            ) : (
                <div className="score">
                    <h3>Sua pontuação: {score} de {quizData.questions.length}</h3>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
