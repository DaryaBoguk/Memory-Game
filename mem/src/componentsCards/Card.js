import React from 'react';
import './Card.css'; // Импорт стилей для карточек

const Card = ({ cardName, onClick, isFlipped, image }) => {
    return (
        <button 
            className={"card " + (isFlipped ? 'flipped' : '')} 
            onClick={() => onClick(cardName)}
        >
            {isFlipped ? <img src={image} alt={cardName} /> : <div className="card-back">?</div>}
        </button>
    );
};

export default Card;