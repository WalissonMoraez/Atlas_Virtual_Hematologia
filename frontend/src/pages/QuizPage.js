import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizDetails, getPostDetails } from '../services/api';
import Footer from '../components/Footer';
import Navbar2 from '../components/Navbar2';
import '../App.css'; 

const QuizPage = () => {
    const { categoriaId, postId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [postDetails, setPostDetails] = useState(null); // Estado para armazenar os detalhes da postagem
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

    // Carrega os detalhes da postagem
    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postData = await getPostDetails(categoriaId, postId);
                setPostDetails(postData);
            } catch (error) {
                console.error("Erro ao buscar detalhes da postagem:", error);
            }
        };
        fetchPostDetails();
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
            <Navbar2 title={postDetails ? postDetails.title : "Carregando título..."} />

            <h1 className='quiz-title'>Teste seu conhecimento</h1>
            {quiz ? (
                quiz.questions.map((question, questionIndex) => (
                    <div key={`question-${questionIndex}`} className="question-card">
                    <h2 className='question-title'>Questão {questionIndex + 1}</h2>
                    <p className='question-text'>{question.text}</p>
                    <div className="options-container">
                        {question.alternative.map((alt, altIndex) => {
                            let optionClass = ""; // Classe dinâmica para o estado da resposta
                
                            if (score !== null) { // Após submissão
                                if (altIndex === question.idCorrect) {
                                    optionClass = "correct"; // Resposta correta
                                } else if (selectedAnswers[questionIndex] === altIndex) {
                                    optionClass = "incorrect"; // Resposta incorreta
                                }
                            }
                
                            return (
                                <label key={`alt-${questionIndex}-${altIndex}`} className={`option-label ${optionClass}`}>
                                    <input
                                        type="radio"
                                        name={`question-${questionIndex}`}
                                        onChange={() => handleAnswerChange(questionIndex, altIndex)}
                                        checked={selectedAnswers[questionIndex] === altIndex}
                                        disabled={score !== null} // Desabilitar após envio
                                    />
                                    {alt}
                                </label>
                            );
                        })}
                    </div>
                </div>                
                ))
            ) : (
                <p>Carregando...</p>
            )}

            {/* Botão para confirmar as respostas */}
            <button
            onClick={handleConfirmAnswers}
            className='confirm-button'
            disabled={score !== null} // Desabilita após submissão
        >
            Confirmar
        </button>

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
