import React, { useState, useEffect } from 'react';
import './WordGame.css';
import { useNavigate } from 'react-router-dom';


const WordGame = () => {
  
  const navigate = useNavigate();
  const [currentWords, setCurrentWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [userInput, setUserInput] = useState(Array(5).fill(''));
  const [rememberTime, setRememberTime] = useState(10);
  const [inputTime, setInputTime] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [timeSpentRemembering, setTimeSpentRemembering] = useState(0);
  const [inputStartTime, setInputStartTime] = useState(null);
  const [inputTimeSpent, setInputTimeSpent] = useState(0);
  const [inputTimerId, setInputTimerId] = useState(null);

  useEffect(() => {
    startNewGame();
    fetchRandomWords();
  }, []);

  const fetchRandomWords = async () => {
    try {
      const response = await fetch('../library.txt');
      const text = await response.text();
      const shwords = text.split('\n').map(word => word.trim()).filter(word => word !== '');
      const shuffledWords = shwords.sort(() => 0.5 - Math.random());
      const words = shuffledWords.slice(0, 5);
      setCurrentWords(words);
    } catch (error) {
      console.error('Ошибка при загрузке слов из файла:', error);
    }
  };
  useEffect(() => {
    if (showWord) {
      if (rememberTime > 0) {
        const timerId = setInterval(() => {
          setRememberTime((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
      } else {
        setShowWord(false);
        setInputTime(30);
        setInputStartTime(Date.now());
      }
    }
  }, [rememberTime, showWord]);

  useEffect(() => {
    if (inputTime > 0 && !showWord) {
      const timerId = setInterval(() => {
        setInputTime((prev) => prev - 1);
      }, 1000);
      setInputTimerId(timerId);
      return () => clearInterval(timerId);
    } else if (inputTime === 0) {
      handleSubmit();
    }
  }, [inputTime, showWord]);

  useEffect(() => {
    if (showWord && currentWordIndex < currentWords.length) {
      const wordTimerId = setTimeout(() => {
        setCurrentWordIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(wordTimerId);
    }
  }, [currentWordIndex, showWord, currentWords]);

  const startNewGame = () => {
    const shuffledWords = currentWords.sort(() => 0.5 - Math.random()).slice(0, 5);
    setCurrentWords(shuffledWords);
    setShowWord(true);
    setCurrentWordIndex(0);
    setUserInput(Array(5).fill(''));
    setIsGameOver(false);
    setRememberTime(10);
    setInputTime(30);
    setShowDialog(false);
    setInputStartTime(null);
    setInputTimeSpent(0);
    if (inputTimerId) clearInterval(inputTimerId);
  };

  const handleInputChange = (index, value) => {
    const newInput = [...userInput];
    newInput[index] = value;
    setUserInput(newInput);
  };

  const handleSubmit = () => {
    if (inputTimerId) clearInterval(inputTimerId);
    const correctCount = userInput.filter((word, index) => word.toLowerCase() === currentWords[index].toLowerCase()).length;
    setIsGameOver(true);
    setIsWin(correctCount === currentWords.length);
    setShowDialog(true);
    setInputStartTime(null);
    setInputTimeSpent(Math.max(0, Math.floor((Date.now() - inputStartTime) / 1000)));
  };

  const timeSpentInputting = inputStartTime
    ? Math.max(0, Math.floor((Date.now() - inputStartTime) / 1000))
    : 0;

  return (
    <div className="game-container">
      <div className="menuWord-container">
          <button className="menuWord-button" onClick={() => navigate('/')}>Меню</button>
          </div>
      <div className="header-container">
        <h1>Игра на память</h1>
      </div>

      {showWord && (
        <div className="word-display">
          {currentWords[currentWordIndex]}
        </div>
      )}

      <div className="scoreboard">
        {showWord 
          ? `Оставшееся время на запоминание: ${rememberTime}s` 
          : `Оставшееся время на ввод слов: ${inputTime}s`}
        <div className="time-bar">
          <div 
            className="time-bar-fill" 
            style={{ width: showWord ? `${(rememberTime / 10) * 100}%` : `${(inputTime / 30) * 100}%` }}
          ></div>
        </div>
      </div>

      {!showWord && !isGameOver && (
        <div className="input-container">
          <div className="input-container-h2">
          <h2>Введите слова в правильном порядке:</h2>
          </div>
          {userInput.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="input"
            />
          ))}
          <br />
          <button onClick={handleSubmit} className="start-button">
            Подтвердить
          </button>
        </div>
      )}

      {showDialog && (
        <Dialog
          message={isWin 
            ? <>Поздравляем! Вы выиграли!<br />Время вспоминания: {inputTimeSpent} секунд.</>
            : `Вы вспомнили ${userInput.filter((word, index) => word === currentWords[index]).length} из ${currentWords.length} слов за ${inputTimeSpent} секунд.`}
          onClose={startNewGame}
        />
      )}
    </div>
  );
};

const Dialog = ({ message, onClose }) => {
  
  const navigate = useNavigate();
  return (
    <div className="dialog-container">
      <div className="dialog">
      <h1 style={{ fontSize: '30px' }}>{message}</h1>
        <button onClick={onClose} className="dialog-button">Играть снова</button>
        <button onClick={() => navigate('/')} className="dialog-button">Меню</button>
      </div>
    </div>
  );
};

export default WordGame;