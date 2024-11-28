import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './componentsCards/StartScreen';
import GameBoard from './componentsPath/GameBoard'
import MainWindow from './componentsCards/MainWindow';
import Welcome from './StartGame/Welcome'

const App = () => {
  return (
    <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/gamePairs" element={<MainWindow />} />
              <Route path="/gamePath" element={<GameBoard />} />
            </Routes>
          </div>
    </Router>
  );
};

export default App;
