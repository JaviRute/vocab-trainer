import React from 'react'

export default function SpecialCharactersSp({ setUserResponse, handleSpecialCharacter }) {

  return (
    <div className="special-characters">
      <p>Special Characters</p>
      <div className='special-char-buttons'>
        <button onClick={() => handleSpecialCharacter('¿')}>¿</button>
        <button onClick={() => handleSpecialCharacter('á')}>á</button>
        <button onClick={() => handleSpecialCharacter('é')}>é</button>
        <button onClick={() => handleSpecialCharacter('í')}>í</button>
        <button onClick={() => handleSpecialCharacter('ó')}>ó</button>
        <button onClick={() => handleSpecialCharacter('ú')}>ú</button>
        <button onClick={() => handleSpecialCharacter('ñ')}>ñ</button>
      </div>
    </div>
  )
}
