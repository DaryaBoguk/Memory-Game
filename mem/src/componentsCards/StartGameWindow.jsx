import React, { useState } from 'react';
import GameBoard from './MainWindow';
import MainWindow from './MainWindow';
import "./StartGameWindow.css"

const StartGameWindow = () => {
  const [start, setStart] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);
  const [mode, setMode] = useState('color');

  const handleGameStart = (time) => {
    setTimeLimit(time);
    setStart(true);
  };

  return (
    <div className="start-window">
      {start ? (
        <div className="game-screen">
        <MainWindow timeLimit={timeLimit} mode={mode} />
      </div>
      ) : (
        <div className="start-content">
          <h1>Welcome to the Memory Game!</h1>
          <div>
            <label>
              <input
                type="radio"
                value="color"
                checked={mode === 'color'}
                onChange={(e) => setMode(e.target.value)}
              />
              По цветам
            </label>
            <label>
              <input
                type="radio"
                value="shape"
                checked={mode === 'shape'}
                onChange={(e) => setMode(e.target.value)}
              />
              По фигурам
            </label>
          </div>
          <div className="button-container">
            <button className="start-button" onClick={() => handleGameStart(30)}>Start (30s)</button>
            <button className="start-button" onClick={() => handleGameStart(45)}>Start (45s)</button>
            <button className="start-button" onClick={() => handleGameStart(60)}>Start (60s)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartGameWindow;