import React from 'react';
import SpanishFlag from '../assets/spanish-flag.svg';
import BritishFlag from '../assets/british-flag.svg';
import Arrow from '../assets/arrow.svg';

export default function TopRow( { spToEngMode, setSpToEngMode, restartThemeSelection, teacherMode, handleTutorial, toggleTeacherMode}) {
  return (
    <div >
      <div className='top-row'>
        <button className='top-button' onClick={handleTutorial}><span className="material-symbols-outlined">help</span></button>
        <h1 className="title">Spanish vocab trainer: {teacherMode ? "Teacher Mode" : "Student Mode"}</h1>
        <button 
            className='top-button'
            onClick={toggleTeacherMode}>
            <span className="material-symbols-outlined">person_raised_hand</span>
        </button>
      </div>

      <div className='flag-container' onClick={() => {
        setSpToEngMode(prevVal => !prevVal);
        restartThemeSelection()}
        }>
        {spToEngMode ? (
          <>
            <img src={SpanishFlag} alt="Spanish" className='flag' />
            <img src={Arrow} alt="to" className='arrow' />
            <img src={BritishFlag} alt="English" className='flag' />
          </>
        ) : (
          <>
            <img src={BritishFlag} alt="English" className='flag' />
            <img src={Arrow} alt="to" className='arrow' />
            <img src={SpanishFlag} alt="Spanish" className='flag' />
          </>
        )}
      </div>
    </div>
  )
}
