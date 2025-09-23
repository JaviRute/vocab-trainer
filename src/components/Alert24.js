import React, { useEffect, useState } from 'react';
import './Modal.css';

export default function Alert24({ language, handleAlert }) {
    return(
        <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="user-modal">
                <div className='alert'>
                    <h2>{language === "Spanish" ? "¡ALERTA!" : "ALERTE!"}</h2>
                    <p>You are about to translate the last Expression but you did not enter your name!</p>
                    <p>If you are completing this as homework, you should enter your data now.</p>
                    <p>Click on the button with the profile icon (the top middle button) and enter your data.</p>
                    <button onClick={handleAlert} className='main-button big-text-button'>Understood</button>
                </div>
            </div>
        </div>
    )
}