import React, { useState, useEffect } from "react";
import "./GameBoard.css";

const GameBoard = () => {
  const [boardComputer, setBoardComputer] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(0))
  );
  const [boardPlayer, setBoardPlayer] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(0))
  );
  const [level, setLevel] = useState(0);
  const [record, setRecord] = useState(0);
  const [numberOfRects, setNumberOfRects] = useState(3);
  const [canClick, setCanClick] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [message, setMessage] = useState(""); // Для сообщений (победа/поражение)

  useEffect(() => {
    if (isOn) {
      const timer = setTimeout(() => {
        setCanClick(true);
        setIsOn(false);
        setMessage("Go!"); // Разрешаем клики
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOn]);

  const startGame = () => {
    setMessage("");
    if (!isOn && !canClick) {
      // Сбрасываем состояние и подготавливаем поле
      const newBoard = Array.from({ length: 5 }, () => Array(5).fill(0));
      for (let i = 0; i < numberOfRects; i++) {
        let x, y;
        do {
          x = Math.floor(Math.random() * 5);
          y = Math.floor(Math.random() * 5);
        } while (newBoard[x][y] === 1); // Убедимся, что не повторяем координаты
        newBoard[x][y] = 1;
      }
      setBoardComputer(newBoard);
      setBoardPlayer(Array.from({ length: 5 }, () => Array(5).fill(0)));
      setIsOn(true);
      setLevel((prev) => prev + 1);
    } else if (canClick) {
      if (checkVictory()) {
        // Победа
        setMessage("Victory!");
        if (level > record) setRecord(level);
        setNumberOfRects((prev) => Math.min(prev + 1, 20)); // Увеличиваем сложность
        setCanClick(false);
      } else {
        // Поражение
        setMessage("You lost!");
        setLevel(0);
        setNumberOfRects(3);
        setCanClick(false);
      }
    }
  };

  const handleClick = (i, j) => {
    if (canClick) {
      const newBoard = boardPlayer.map((row) => [...row]);
      newBoard[i][j] = newBoard[i][j] === 0 ? 1 : 0; // Переключаем состояние
      setBoardPlayer(newBoard);
    }
  };

  const checkVictory = () => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (boardComputer[i][j] !== boardPlayer[i][j]) return false;
      }
    }
    return true;
  };

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <div className="game-grid">
        {boardPlayer.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={i + '-' + j}
              className={
                "game-cell" +
                (canClick
                  ? cell
                    ? " active"
                    : ""
                  : boardComputer[i][j]
                  ? " computer"
                  : "")
              }
              onClick={() => handleClick(i, j)}
            ></div>
          ))
        )}
      </div>
      <button className="start-button" onClick={startGame}>
        {isOn ? "Memorize..." : canClick ? "Check" : "Start"}
      </button>
      <div className="game-info">
        <span>Level: {level}</span>
        <span>Record: {record}</span>
      </div>
      {message && <div className="game-message">{message}</div>}
    </div>
  );
};

export default GameBoard;