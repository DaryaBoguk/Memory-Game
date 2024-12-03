import React, { useState, useEffect } from 'react';
import './WordGame.css';

const words = ['кот', 'собака', 'конь', 'овал', 'ручка', 'чайка'];

const WordGame = () => {
  const [currentWords, setCurrentWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [userInput, setUserInput] = useState(Array(5).fill(''));
  const [rememberTime, setRememberTime] = useState(5); // Таймер на запоминание
  const [inputTime, setInputTime] = useState(30); // Таймер на ввод слов
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (showWord) {
      if (rememberTime > 0) {
        const timerId = setInterval(() => setRememberTime((prev) => prev - 1), 1000);
        return () => clearInterval(timerId);
      } else {
        setShowWord(false);
        setInputTime(30); // Сброс таймера на ввод слов
      }
    }
  }, [rememberTime, showWord]);

  useEffect(() => {
    if (inputTime > 0 && !showWord) {
      const timerId = setInterval(() => setInputTime((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (inputTime === 0) {
      setIsGameOver(true);
      handleSubmit(); // Автоматически отправляем, если время истекло
    }
  }, [inputTime]);

  useEffect(() => {
    if (showWord && currentWordIndex < currentWords.length) {
      const wordTimerId = setTimeout(() => {
        setCurrentWordIndex((prev) => prev + 1);
      }, 1000); // Показать слово 1 секунду

      return () => clearTimeout(wordTimerId);
    }
  }, [currentWordIndex, showWord, currentWords]);

  const startNewGame = () => {
    const shuffledWords = words.sort(() => 0.5 - Math.random()).slice(0, 5);
    setCurrentWords(shuffledWords);
    setShowWord(true);
    setCurrentWordIndex(0);
    setUserInput(Array(5).fill(''));
    setIsGameOver(false);
    setRememberTime(5); 
    setInputTime(30); 
    setShowDialog(false);
  };

  const handleInputChange = (index, value) => {
    const newInput = [...userInput];
    newInput[index] = value;
    setUserInput(newInput);
  };

  const handleSubmit = () => {
    const correctCount = userInput.filter((word, index) => word === currentWords[index]).length;
    setIsGameOver(true);
    setIsWin(correctCount === currentWords.length);
    setShowDialog(true);
  };

  return (
    <div className="game-container">
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
      </div>

      {!showWord && !isGameOver && (
        <div className="input-container">
          <h2>Введите слова в правильном порядке:</h2>
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
          message={isWin ? 'Поздравляем! Вы выиграли!' : `Вы вспомнили ${userInput.filter((word, index) => word === currentWords[index]).length} из ${currentWords.length} слов.`}
          onClose={startNewGame}
        />
      )}
    </div>
  );
};

const Dialog = ({ message, onClose }) => {
  return (
    <div className="dialog-container">
      <div className="dialog">
        <h1>{message}</h1>
        <button onClick={onClose} className="dialog-button">Играть снова</button>
        <button onClick={() => window.location.reload()} className="dialog-button">Меню</button>
      </div>
    </div>
  );
};

export default WordGame;