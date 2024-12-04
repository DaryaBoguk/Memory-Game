import React from 'react';
import './Welcome.css';
import background from '../images/j.png';

import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div className="start-screen-welcome">
            <img src={background} alt="Background" className="background-image" />
            <div className='buttons-container'>
                {/* <button onClick={() => navigate('/gamePairs')} className='game-pairs'>Дублеты</button> */}
                <button onClick={() => navigate('/startWindow')} className='game-pairs'>Дублеты</button>
                <button onClick={() => navigate('/gamePath')} className='game-path'>Путь ниндзя</button>
                <button onClick={() => navigate('/startShulte')} className='game-shulte'>Таблица Шульте</button>
                <button onClick={() => navigate('/word')} className='game-word'>Шифр</button>
            </div>
           
        </div>
    );
};

export default Welcome;
