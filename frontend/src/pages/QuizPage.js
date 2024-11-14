import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizDetails } from '../services/api';

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
        <div>
            <h1>Quiz</h1>
            {quiz ? (
                quiz.questions.map((question, questionIndex) => (
                    <div key={`question-${questionIndex}`} className="question-card">
                        <h2>Questão {questionIndex + 1}</h2>
                        <p>{question.text}</p>
                        <div className="alternatives">
                            {question.alternative.map((alt, altIndex) => (
                                <label key={`alt-${questionIndex}-${altIndex}`}>
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
            <button onClick={handleConfirmAnswers}>Confirmar</button>

            {/* Mostra o total de acertos após a confirmação */}
            {score !== null && (
                <p>
                    Você acertou {score} de {quiz.questions.length} questões.
                </p>
            )}
        </div>
    );
};

export default QuizPage;
