import React, { useEffect, useState } from 'react';
import './Modal.css';

export default function LoseProgressPopup({ language, setShowLoseProgressPopup, showLoseProgressPopup, handleFunctionToRun, expressionsAnswered, expressionsToAnswer }) {
    return(
        <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="user-modal">
                <div className='alert'>
                    <h2>{language === "Spanish" ? "¡ALERTA!" : "ALERTE!"}</h2>
                    <p>You are in the middle of a game.</p>
                    <p>You just clicked on a button that will restart the game and make you lose your progress <strong>({expressionsAnswered}/{expressionsToAnswer})</strong>.</p>
                    <p>Are you sure you want to restart the game?</p>
                    <button onClick={() => setShowLoseProgressPopup(false)} className='main-button big-text-button'>No, keep playing</button>
                    <button onClick={() => handleFunctionToRun()} className='main-button big-text-button'>Yes, restart the game</button>
                </div>
            </div>
        </div>
    )
}