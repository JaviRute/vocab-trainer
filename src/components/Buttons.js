import React from 'react'

export default function Buttons( {userResponse, handleCheck, targetExpression, handlePlay, handleHint, hintGiven, numberOfHints, questionAlreadyAnswered }) {
  return (
    <div className='button-group'>

      {!questionAlreadyAnswered && <button 
        className='main-button'
        onClick={handleCheck}>Check</button>}
      {questionAlreadyAnswered && <div className='main-button dummy-button'>No Check</div>}

      <button 
        className='main-button'
        onClick={handlePlay}
        >Play</button>

      {(!questionAlreadyAnswered && !hintGiven && numberOfHints > 0) && <button 
        className='main-button'
        onClick={handleHint}
        >Hint</button>}
      {(hintGiven || questionAlreadyAnswered || numberOfHints === 0) && <div className='main-button dummy-button'>No Hint</div>}
    </div>
  )
}
