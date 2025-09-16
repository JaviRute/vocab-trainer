import React from 'react'

export default function Input({ inputRef, handleCheck, targetExpression, setUserResponse, userResponse, rightAnswer, wrongAnswer}) {

  return (
    <input
        className="user-text"
        id={(rightAnswer ? "correct-answer" : "") + (wrongAnswer ? "incorrect-answer" : "")}
        type="text"
        value={userResponse}
        onChange={(e) => {
            setUserResponse(e.target.value);}
        }
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); //this line avoids the enter button to trigger input form submission
                handleCheck();
            }
        }}
        ref={inputRef} // Attach the ref here
    />
  )
}
