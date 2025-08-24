
import React from 'react';

export default function Expression({ targetExpression, spToEngMode }) {
  // Ensure targetExpression is an array and has at least one item
  if (!Array.isArray(targetExpression) || targetExpression.length === 0) {
    return <div>No expressions provided.</div>;
  }
  //Para hacer q salgan todas las expresiones a traducir y no solo una borra el último [0] de los dos targetExpression de abajo. Y luego descomenta las 3 lineas q hay abajo
  // Extract Spanish expressions
  const spanishExpressions = spToEngMode ? targetExpression[0][0] : targetExpression[1][0];

  // Join Spanish expressions with ", " if there are multiple
  // const expressionString = spanishExpressions.map((expr, index) => 
  //   index > 0 ? `, ${expr}` : expr
  // ).join('');

  return (
    <div>
      <h3 className='target-expression'>
        Expression to translate: {spanishExpressions}
      </h3>
    </div>
  );
}