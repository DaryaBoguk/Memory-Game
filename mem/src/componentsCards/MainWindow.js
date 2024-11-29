import React, { useState, useEffect } from 'react';
import './MainWindow.css';
import { useNavigate } from 'react-router-dom';

const MainWindow = ({ timeLimit, mode, gridSize }) => {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(timeLimit);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false); 

  const sizeMap = { four: 16, five: 25, six: 36 };
  const gridColumnsMap = { four: 4, five: 5, six: 6 };
  const totalCards = sizeMap[gridSize];

  const cardSets = {
    color: ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png'],
    shape: ['circle.png', 'square.png', 'triangle.png', 'star.png', 'diamond.png', 'heart.png'],
    pictures: ['cat.png', 'dog.png', 'fox.png', 'rabbit.png', 'bear.png', 'lion.png'],
  };

  useEffect(() => {
    startNewGame();
  }, [mode, gridSize]); 

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (time === 0) {
      setGameOver(true);
      setWin(false);
    }
  }, [time, gameOver]);

  useEffect(() => {
    if (matchedCards.length === totalCards / 2) {
      setGameOver(true);
      setWin(true);
    }
  }, [matchedCards, totalCards]);

  const startNewGame = () => {
    const cards = shuffleArray([...cardSets[mode].slice(0, totalCards / 2).flatMap((c) => [c, c])]);
    setShuffledCards(cards);
    setMatchedCards([]);
    setFlippedCards([]);
    setScore(0);
    setTime(timeLimit);
    setGameOver(false);
    setWin(false);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || gameOver) return;

    setFlippedCards((prev) => [...prev, index]);

    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      const secondCard = index;

      if (shuffledCards[firstCard] === shuffledCards[secondCard]) {
        setMatchedCards((prev) => [...prev, shuffledCards[firstCard]]);
        setScore((prev) => prev + 10);
      } else {
        setScore((prev) => Math.max(0, prev - 2));
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="game-container">
      <div className="scoreboard">
        <div>Score: {score}</div>
        <div>Time: {time}s</div>
        <div className="time-bar">
          <div
            className="time-bar-fill"
            style={{ width: `${(time / timeLimit) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="game-board-container">
        <div
          className="game-board"
          style={{
            gridTemplateColumns: `repeat(${gridColumnsMap[gridSize]}, 1fr)`,
          }}
        >
          {shuffledCards.map((image, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className={
                'card ' +
                (flippedCards.includes(index) || matchedCards.includes(image) ? 'flipped' : '')
              }
              style={{
                background: flippedCards.includes(index) || matchedCards.includes(image)
                  ? `url(${require('./img/' + image)})`
                  : 'gray',
                backgroundSize: 'cover',
              }}
            >
              {!flippedCards.includes(index) && !matchedCards.includes(image) && (
                <div className="card-back">?</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          {win ? <h1>Congratulations!</h1> : <h1>Time's up!</h1>}
          <p>Your score: {score}</p>
          <button onClick={startNewGame}>Play Again</button>
          <button onClick={() => navigate('/')}>Menu</button>
        </div>
      )}
    </div>
  );
};

export default MainWindow;
