import React from 'react';
import SpanishFlag from '../assets/spanish-flag.svg';
import BritishFlag from '../assets/british-flag.svg';
import Arrow from '../assets/arrow.svg';

export default function TopRow( { spToEngMode, setSpToEngMode, restartThemeSelection}) {
  return (
    <div>
      <h1  className='top-row'>Spanish Vocab Trainer</h1>
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
