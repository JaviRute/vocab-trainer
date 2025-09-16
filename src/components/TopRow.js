import React from 'react';
import SpanishFlag from '../assets/spanish-flag.svg';
import FrenchFlag from '../assets/french-flag.svg';
import BritishFlag from '../assets/british-flag.svg';
import Arrow from '../assets/arrow.svg';

export default function TopRow( { spToEngMode, setSpToEngMode, restartThemeSelection, teacherMode, handleTutorial, toggleTeacherMode, ks3Ks4, setKs3Ks4, language, toggleLanguage, handleUserInfo}) {



  return (
    <div >
      <div className='top-row'>

        <div className='title-container'>
          <h1 
            className="title restart-selection" 
            onClick={toggleLanguage}>
            {language || "MFL"} vocab trainer: {teacherMode ? "Teacher Mode" : "Student Mode"}
          </h1>
        </div>


        <div className='top-button-selection'>
            <button className='top-button' onClick={handleTutorial}><span className="material-symbols-outlined">help</span></button>
            <button className='top-button' onClick={handleUserInfo}><span class="material-symbols-outlined">account_circle</span></button>
            <button 
                className='top-button'
                onClick={toggleTeacherMode}>
                <span className="material-symbols-outlined">person_raised_hand</span>
            </button>
        </div>

      </div>

      {language && <div className='options-container'>
            <div className='ks-container' onClick={() => {
                            setKs3Ks4(prevVal => !prevVal);
                            restartThemeSelection()}
                            }>
                          <h3 className={ks3Ks4 ? 'ks-hidden' : ''} >KS3</h3>
                          <h3 className='ks-hidden'>/</h3>
                          <h3 className={ks3Ks4 ? '' : 'ks-hidden'} >KS4</h3>
                  </div>


                  <div className='flag-container' onClick={() => {
                    setSpToEngMode(prevVal => !prevVal);
                    restartThemeSelection()}
                    }>
                    {spToEngMode ? (
                      <>
                        <img 
                          src={language === "French" ? FrenchFlag : SpanishFlag} 
                          alt={language === "French" ? "French" : "Spanish"} 
                          className="flag" 
                        />
                        <img src={Arrow} alt="to" className='arrow' />
                        <img src={BritishFlag} alt="English" className='flag' />
                      </>
                    ) : (
                      <>
                        <img src={BritishFlag} alt="English" className='flag' />
                        <img src={Arrow} alt="to" className='arrow' />
                        <img 
                            src={language === "French" ? FrenchFlag : SpanishFlag} 
                            alt={language === "French" ? "French" : "Spanish"} 
                            className="flag" 
                          />
                      </>
                    )}
                  </div>
      </div>}
      

    </div>
  )
}
