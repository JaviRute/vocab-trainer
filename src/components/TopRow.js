import React from 'react';
import SpanishFlag from '../assets/spanish-flag.svg';
import FrenchFlag from '../assets/french-flag.svg';
import BritishFlag from '../assets/british-flag.svg';
import Arrow from '../assets/arrow.svg';

export default function TopRow( { spToEngMode, setSpToEngMode, restartThemeSelection, teacherMode, handleTutorial, toggleTeacherMode, ks3Ks4, setKs3Ks4, language, toggleLanguage, handleUserInfo, setShowLoseProgressPopup, setFunctionToRun, expressionsAnswered, functionToRun}) {



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
            <button className='top-button' onClick={handleTutorial}>
              <span className="material-symbols-outlined">help</span>
              <span className="tooltiptext">Instructions</span>
            </button>
            <button className='top-button' onClick={handleUserInfo}>
              <span class="material-symbols-outlined">account_circle</span>
              <span className="tooltiptext">Enter your data</span>
            </button>
            <button 
                className='top-button'
                onClick={() => {
                  if (expressionsAnswered !== 0) {
                    setFunctionToRun("Run toggleTeacherMode");
                    setShowLoseProgressPopup(true);
                  } else {
                    toggleTeacherMode();
                    
                  }
                }}>
                <span className="material-symbols-outlined">person_raised_hand</span>
                <span className="tooltiptext">Toggle between Student and Teacher modes</span>
            </button>
        </div>

      </div>

      {language && <div className='options-container'>
            <div className='ks-container' onClick={() => {
                            if (expressionsAnswered != 0) {
                                setFunctionToRun("Run setKs3Ks4");
                                setShowLoseProgressPopup(true);
                            } else {
                            setKs3Ks4(prevVal => !prevVal);
                            restartThemeSelection()
                            }
                            }}>
                          <h3 className={ks3Ks4 ? 'ks-hidden' : ''} >KS3</h3>
                          <h3 className='ks-hidden'>/</h3>
                          <h3 className={ks3Ks4 ? '' : 'ks-hidden'} >KS4</h3>
                          <span className="tooltiptext">Toggle between KS3 and KS4 courses</span>
                  </div>


                  <div className='flag-container' onClick={() => {
                    if (expressionsAnswered != 0) {
                        setFunctionToRun("Run setSpToEngMode");
                        setShowLoseProgressPopup(true);
                      } else {
                          setSpToEngMode(prevVal => !prevVal);
                          restartThemeSelection()}
                      }
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
                        <span className="tooltiptext">Translate from {language} to English or from English into {language}</span>
                      </>
                    ) : (
                      <>
                        <img src={BritishFlag} alt="English" className='flag' />
                        <img src={Arrow} alt="to" className='arrow' />
                        <img 
                            src={language === "French" ? FrenchFlag : SpanishFlag} 
                            alt={language === "French" ? "French" : "Spanish"} 
                            className="flag"/>
                        <span className="tooltiptext">Translate from {language} to English or from English into {language}</span>
                      </>
                    )}
                  </div>
      </div>}
      

    </div>
  )
}
