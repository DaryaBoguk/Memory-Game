import React, { useState, useEffect } from 'react';
import './MainWindow.css';
import { useNavigate } from 'react-router-dom';

const MainWindow = ({ timeLimit, mode }) => {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(timeLimit);
  const [gameOver, setGameOver] = useState(false);

  const cardSets = {
    color: [
      'image1.png', 'image1.png', 'image2.png', 'image2.png',
      'image3.png', 'image3.png', 'image4.png', 'image4.png',
      'image5.png', 'image5.png', 'image6.png', 'image6.png',
    ],
    shape: [
      'DSC_2910.JPG', 'DSC_2910.JPG', 'DSC_2929.JPG', 'DSC_2929.JPG',
      'DSC_2976.JPG', 'DSC_2976.JPG', 'DSC_2982.JPG', 'DSC_2982.JPG',
      'DSC_3033.JPG', 'DSC_3033.JPG', 'DSC_3160.JPG', 'DSC_3160.JPG',
    ],
  };

  useEffect(() => {
    startNewGame();
  }, [mode]);

  useEffect(() => {
    if (matchedCards.length === shuffledCards.length / 2 && shuffledCards.length > 0) {
      setGameOver(true); 
    }
  }, [matchedCards, shuffledCards]);

  useEffect(() => {
    if (!gameOver && time > 0) {
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (time === 0) {
      setGameOver(true); 
    }
  }, [time, gameOver]);

  const startNewGame = () => {
    const cards = cardSets[mode] ? shuffleArray([...cardSets[mode]]) : [];
    setShuffledCards(cards);
    setMatchedCards([]);
    setFlippedCards([]);
    setScore(0);
    setTime(timeLimit);
    setGameOver(false);
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

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
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
        <div className="game-board">
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
          {time === 0 ? <h1>Time's up!</h1> : <h1>Congratulations!</h1>}
          <p>Your score: {score}</p>
          <button onClick={startNewGame}>Play Again</button>
          <button onClick={() => navigate('/')}>Menu</button>
        </div>
      )}
    </div>
  );
};

export default MainWindow;
