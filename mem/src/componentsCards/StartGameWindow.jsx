import React, { useState } from 'react';
import GameBoard from './MainWindow';

const StartGameWindow = () => {
  const [start, setStart] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);  // По умолчанию 30 секунд

  const handleGameStart = (time) => {
    setTimeLimit(time);
    setStart(true);
  };

  return (
    <div className="start-window">
      {start ? (
        <GameBoard timeLimit={timeLimit} />
      ) : (
        <div className="start-content">
          <h1>Welcome to the Memory Game!</h1>
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