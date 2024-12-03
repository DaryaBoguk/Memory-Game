import React, { useState } from 'react';
import GameBoard from './MainWindow';
import MainWindow from './MainWindow';
import "./StartGameWindow.css"

import { useNavigate } from 'react-router-dom';

const StartGameWindow = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);
  const [mode, setMode] = useState('color');
  const [gridSize, setGridSize] = useState('four');

  const handleGameStart = (time) => {
    setTimeLimit(time);
    setStart(true);
  };

  return (
    <div className="start-window">
      {start ? (
        <div className="game-screen">
          <MainWindow timeLimit={timeLimit} mode={mode} gridSize={gridSize} />
        </div>
      ) : (
        <div className="start-content">
          <h1>Welcome to the Memory Game!</h1>
          <div className='choice-pictures'>
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
            <label>
              <input
                type="radio"
                value="pictures"
                checked={mode === 'pictures'}
                onChange={(e) => setMode(e.target.value)}
              />
              Картинки
            </label>
          </div>

          <div className='choice-size-pitch'>
            <label>
              <input
                type="radio"
                value="four"
                checked={gridSize === 'four'}
                onChange={(e) => setGridSize(e.target.value)}
              />
              4x4
            </label>
            <label>
              <input
                type="radio"
                value="five"
                checked={gridSize === 'five'}
                onChange={(e) => setGridSize(e.target.value)}
              />
              5x5
            </label>
            <label>
              <input
                type="radio"
                value="six"
                checked={gridSize === 'six'}
                onChange={(e) => setGridSize(e.target.value)}
              />
              6x6
            </label>
          </div>

          <div className="button-container">
            <button className="start-button" onClick={() => handleGameStart(30)}>Start (30s)</button>
            <button className="start-button" onClick={() => handleGameStart(45)}>Start (45s)</button>
            <button className="start-button" onClick={() => handleGameStart(60)}>Start (60s)</button>
          </div>
        </div>
      )}
      <div className="menuCardB-container">
          <button className="menuCardB-button" onClick={() => navigate('/')}>Меню</button>
          </div>
    </div>
  );
};

export default StartGameWindow;
