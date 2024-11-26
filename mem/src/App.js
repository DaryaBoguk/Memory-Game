import React, { useState } from 'react';
import StartScreen from './componentsCards/StartScreen';
//import GameBoard from './GameBoard';
import MainWindow from './componentsCards/MainWindow';

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="app">
      {isGameStarted ? <MainWindow /> : <StartScreen onStart={startGame} />}
    </div>
  );
};

export default App;
