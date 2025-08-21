import React from 'react'
import './Modal.css'

export default function Tutorial(props) {
  return (
    <div className='modal-backdrop' onClick={props.handleTutorial}>
      <div className='modal'>
        <h3>Welcome to the GCSE Spanish Vocab Trainer!</h3>

        <h4>Spanish to English OR English to Spanish</h4>
        <p>You can choose in which way to translate.</p>

        <h4>Choose Theme and Lesson</h4>
        <p>Select the set of expressions you want to practise. You'll have 3 attempts to solve each!</p>
        <p>Type your answer and click on "Check".</p> 
        <p>Click on "Play" to see the next expression to translate.</p>

        <h4>Hints</h4>
        <p>Stuck? Click <strong>Hint</strong> to reveal the first letter of each word from the expression, plus the number of letters it contains.</p>
        <p>You start with 5 hints and earn more as you get answers right.</p>

        <h4>Student Mode VS Teacher Mode</h4>
        <p>Use the button in the top-right corner to switch between modes:</p>
        <div className='li-container'>
          <li><strong>Teacher Mode</strong>: Set a countdown timer so students can write their answers on mini-whiteboards. Reveal the correct translation afterwards by clicking on <strong>Show Answer</strong>—no typing needed.</li> 
          <li><strong>Student Mode</strong>: For independent practice. Students type their answers and check them directly.</li>
        </div>


      </div>
    </div>
  )
}
