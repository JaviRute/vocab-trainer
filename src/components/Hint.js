import React from 'react'

export default function Hint( { targetExpression, gameOver, numberOfHints, setNumberOfHints, inputRef, spToEngMode }) {

    let wasPreviousSpace = true;

    const countSpaces = (str) => {
      const spaces = str.match(/ /g); // find all spaces in the string
      return spaces ? spaces.length : 0 // return the number of spaces or 0 if none are found

    }

    
    const expressionToHint = spToEngMode ? targetExpression[1][0] : targetExpression[0][0];

    // Create the hint expression by splitting it into characters and adding spaces for unknown ones
    const newExpressionToHint = expressionToHint.split('').map((char, index) => {
        if (index === 0 || wasPreviousSpace ) {
            wasPreviousSpace = char === " ";
            return " " + char + " ";
        } else if(char === " ") {
            //setNumberOfHints(prevValue => prevValue + 1)
            wasPreviousSpace = true;
            return '\u00A0\u00A0\u00A0'; // non-breaking spaces, this is in order to show a triple space
        } else if (char === "¿" || char === "?" || char == "¡" || char === "!" || char === "'") {
            wasPreviousSpace = false;
            return " " + char + " ";
        }
        else {
            wasPreviousSpace = false;
            return " _ ";
        } 
    })

  // Focus the input when a hint is displayed
  if (inputRef && inputRef.current) {
    inputRef.current.focus();
  }

  return (
<div>
  {!gameOver && (
    <p className="hint">
      Hint:{" "}
      <span className="spread-out-hint">
        {typeof newExpressionToHint === "string" && newExpressionToHint.length > 0 ? (
          <>
            <span className="first-letter">{newExpressionToHint.charAt(0)}</span>
            {newExpressionToHint.slice(1)}
          </>
        ) : (
          newExpressionToHint
        )}
      </span>
    </p>
  )}
</div>
  )
}
