import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import { useNavigate } from 'react-router-dom';

const GameBoard = () => {
  const navigate = useNavigate();
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
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [won, setWon] = useState(false); 

  useEffect(() => {
    if (isOn) {
      const timer = setTimeout(() => {
        setCanClick(true);
        setIsOn(false);
        setMessage("Вперед!");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOn]);

  const startGame = () => {
    setMessage("");
    if (!isOn && !canClick) {
      const newBoard = Array.from({ length: 5 }, () => Array(5).fill(0));
      for (let i = 0; i < numberOfRects; i++) {
        let x, y;
        do {
          x = Math.floor(Math.random() * 5);
          y = Math.floor(Math.random() * 5);
        } while (newBoard[x][y] === 1);
        newBoard[x][y] = 1;
      }
      setBoardComputer(newBoard);
      setBoardPlayer(Array.from({ length: 5 }, () => Array(5).fill(0)));
      setIsOn(true);
      setLevel((prev) => prev + 1);
    } else if (canClick) {
      if (checkVictory()) {
        setMessage("Победа!");
        setWon(true); 
        if (level > record) setRecord(level);
        setNumberOfRects((prev) => Math.min(prev + 1, 20));
      } else {
        setMessage("Вы проиграли!");
        setWon(false); 
        setLevel((prev) => 0);
        setNumberOfRects((prev) => 3);
      }
      setCanClick(false);
      setShowDialog(true);
    }
  };

  const handleClick = (i, j) => {
    if (canClick) {
      const newBoard = boardPlayer.map((row) => [...row]);
      newBoard[i][j] = newBoard[i][j] === 0 ? 1 : 0;
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

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handlePlayAgain = () => {
    startGame();
    setShowDialog(false);
  };

  const Dialog = ({ message, onClose, onPlayAgain, won }) => {
    return (
      <div className="dialog-container">
        <div className="dialog">
          <h1>{message}</h1>
          <button onClick={onPlayAgain}>{won ? "Продолжить" : "Играть снова"}</button>
          <button onClick={() => navigate('/')}>Меню</button>
        </div>
      </div>
    );
  };

  return (
    <div className="game-container">
        <div className="header-container">
            <h1>Игра на память</h1>
        </div>

        <div className="game-grid">
            {boardPlayer.map((row, i) =>
                row.map((cell, j) => (
                    <div
                        key={i + '-' + j}
                        className={
                            "game-cell" +
                            (canClick ? (cell ? " active" : "") : boardComputer[i][j] ? " computer" : "")
                        }
                        onClick={() => handleClick(i, j)}
                    ></div>
                ))
            )}
        </div>

        <button className="start-button" onClick={startGame}>
            {isOn ? "Запомнить..." : canClick ? "Проверить" : "Начать"}
        </button>

        <div className="footer-container">
            <div className="game-info">
                <span>Уровень: {level}</span>
                <span>Рекорд: {record}</span>
            </div>
            {message && <div className="game-message">{message}</div>}
        </div>

        {showDialog && (
            <Dialog
                message={message}
                onClose={handleDialogClose}
                onPlayAgain={handlePlayAgain}
                won={won}
            />
        )}
    </div>
);
};

export default GameBoard;