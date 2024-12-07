import React, { useState, useEffect } from "react";
import "./ShulteTable.css";

const ShulteTable = ({ gridSize, order, shuffleOnClick }) => {
  const [numbers, setNumbers] = useState([]);
  const [nextNumber, setNextNumber] = useState(order === "ascending" ? 1 : gridSize * gridSize);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const generateNumbers = () => {
    const arr = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1);
    if (order === "descending") arr.reverse();
    return arr.sort(() => Math.random() - 0.5);
  };

  const resetGame = () => {
    const initialNumbers = generateNumbers();
    setNumbers(initialNumbers);
    setNextNumber(order === "ascending" ? 1 : gridSize * gridSize);
    setTimer(0);
    setIsPlaying(true);
    setGameOver(false);
  };

  const handleClick = (number) => {
    if (
      (order === "ascending" && number === nextNumber) ||
      (order === "descending" && number === nextNumber)
    ) {
      setNextNumber(order === "ascending" ? nextNumber + 1 : nextNumber - 1);

      if (
        (order === "ascending" && number === gridSize * gridSize) ||
        (order === "descending" && number === 1)
      ) {
        setIsPlaying(false);
        setWin(true);
        setGameOver(true);
      } else if (shuffleOnClick) {
        setNumbers(generateNumbers()); 
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    resetGame();
  }, [gridSize, order, shuffleOnClick]);

  return (
    <div className="shulte-container">
      {!gameOver && (
        <>
          <div className="header">
            <h1>Таблица Шульте</h1>
          </div>
          <p className="next-number">
            Следующее число: <strong>{nextNumber}</strong>
          </p>
          <p className="timer">Таймер: {timer} секунд</p>
          <div
            className="shulte-grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {numbers.map((number) => (
              <div
                key={number}
                onClick={() => handleClick(number)}
                className="shulte-cell"
              >
                {number}
              </div>
            ))}
          </div>
          <button className="reset-button" onClick={resetGame}>
            Перезапустить
          </button>
        </>
      )}
      {gameOver && (
        <div className="game-over">
          {win ? <h1>Поздравляем!</h1> : <h1>Время вышло!</h1>}
          <p>Ваше время: {timer} секунд</p>
          <button onClick={resetGame}>Играть снова</button>
        </div>
      )}
    </div>
  );
};

export default ShulteTable;
