import React, { useState } from "react";
import ShulteTable from "./ShulteTable";
import "./StartGameTable.css";
import { useNavigate } from "react-router-dom";

const StartGameTable = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const [gridSize, setGridSize] = useState("3");
  const [order, setOrder] = useState("ascending");
  const [shuffleOnClick, setShuffleOnClick] = useState(true);
  const handleGameStart = () => {
    setStart(true);
  };

  return (
    <div className="start-window">
      {start ? (
        <div className="game-screen">
          <ShulteTable
            gridSize={parseInt(gridSize)}
            order={order}
            shuffleOnClick={shuffleOnClick}
          />
        </div>
      ) : (
        <div className="start-content">
          <h1>Настройки игры</h1>
          <div className="choice-size-pitch">
            <h3>Размер сетки</h3>
            {["3", "4", "5", "6", "7"].map((size) => (
              <label key={size}>
                <input
                  type="radio"
                  value={size}
                  checked={gridSize === size}
                  onChange={(e) => setGridSize(e.target.value)}
                />
                {size}x{size}
              </label>
            ))}
          </div>
          <div className="choice-order">
            <h3>Порядок чисел</h3>
            <label>
              <input
                type="radio"
                value="ascending"
                checked={order === "ascending"}
                onChange={(e) => setOrder(e.target.value)}
              />
              Прямой
            </label>
            <label>
              <input
                type="radio"
                value="descending"
                checked={order === "descending"}
                onChange={(e) => setOrder(e.target.value)}
              />
              Обратный
            </label>
          </div>
          <div className="choice-shuffle">
            <h3>Перемешивать при клике</h3>
            <label>
              <input
                type="radio"
                value="true"
                checked={shuffleOnClick === true}
                onChange={() => setShuffleOnClick(true)}
              />
              Да
            </label>
            <label>
              <input
                type="radio"
                value="false"
                checked={shuffleOnClick === false}
                onChange={() => setShuffleOnClick(false)}
              />
              Нет
            </label>
          </div>
          <div className="button-container">
            <button className="start-button" onClick={handleGameStart}>
              Начать игру
            </button>
          </div>
        </div>
      )}
      <div className="menuCardB-container">
        <button className="menuCardB-button" onClick={() => navigate("/")}>
          Меню
        </button>
      </div>
    </div>
  );
};

export default StartGameTable;
