import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './componentsCards/StartScreen';
import GameBoard from './componentsPath/GameBoard'
import MainWindow from './componentsCards/MainWindow';
import Welcome from './StartGame/Welcome'
import StartGameWindow from './componentsCards/StartGameWindow';

const App = () => {
  return (
    <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/gamePairs" element={<MainWindow />} />
              <Route path="/gamePath" element={<GameBoard />} />
              <Route path="/startWindow" element={<StartGameWindow />} />
            </Routes>
          </div>
    </Router>
  );
};

export default App;
