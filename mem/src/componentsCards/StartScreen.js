import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Добро пожаловать в игру</h1>
      <button onClick={onStart} className="start-button">
        Начать игру
      </button>
    </div>
  );
};

export default StartScreen;