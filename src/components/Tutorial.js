import React from 'react'
import './Modal.css'

export default function Tutorial(props) {
  return (
    <div className='modal-backdrop' onClick={props.handleTutorial}>
      <div className='modal'>
        <h3>Welcome to the GCSE MFL Vocab Trainer!</h3>

        <h4>Initial selections</h4>
        <p>Choose your language, either French or Spanish.</p>
        <p>Choose betweem KS3 or KS4 (set by default to KS3).</p>
        <p>You can also choose in which way to translate, from target language to English or viceversa.</p>

        <h4>Choose Theme and Lesson</h4>
        <p>Select the set of expressions you want to practise. You'll have 3 attempts to solve each!</p>
        <p>Type your answer and click on "Check".</p> 
        <p>Click on "Next" to see the next expression to translate.</p>

        <h4>Hints</h4>
        <p>Stuck? Click <strong>Hint</strong> to reveal the first letter of each word from the expression, plus the number of letters it contains.</p>
        <p>You start with 5 hints and earn more as you get answers right.</p>

        <h4>Student Mode VS Teacher Mode</h4>
        <p>Use the button in the top-right corner to switch between modes:</p>

        <div className='li-container'>
          <li><strong>Teacher Mode</strong>: Set a countdown timer so students can write their answers on mini-whiteboards. Reveal the correct translation afterwards by clicking on <strong>Show Answer</strong>—no typing needed.</li> 
          <li><strong>Student Mode</strong>: For independent practice. Students type their answers and check them directly.</li>
        </div>

        <h4>Enter your data (optional)</h4>
        <p>Did your teacher ask you to complete this as homework? Enter your data, complete the assignment and at the end you will be able to download a PDF certificate as proof of your work</p>


      </div>
    </div>
  )
}
