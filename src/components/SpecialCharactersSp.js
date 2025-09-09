import React from 'react'

export default function SpecialCharactersSp({ setUserResponse, handleSpecialCharacter,language }) {

  return (
    <div className="special-characters">
      <p>Special Characters</p>
      <div className='special-char-buttons'>

        {language === "Spanish" && <>
          <button onClick={() => handleSpecialCharacter('¿')}>¿</button>
          <button onClick={() => handleSpecialCharacter('á')}>á</button>
          <button onClick={() => handleSpecialCharacter('é')}>é</button>
          <button onClick={() => handleSpecialCharacter('í')}>í</button>
          <button onClick={() => handleSpecialCharacter('ó')}>ó</button>
          <button onClick={() => handleSpecialCharacter('ú')}>ú</button>
          <button onClick={() => handleSpecialCharacter('ü')}>ü</button>
          <button onClick={() => handleSpecialCharacter('ñ')}>ñ</button>
        </>}

        {language === "French" && <>
          <button onClick={() => handleSpecialCharacter('à')}>à</button>
          <button onClick={() => handleSpecialCharacter('â')}>â</button>
          {/* <button onClick={() => handleSpecialCharacter('ä')}>ä (?)</button> */}
          <button onClick={() => handleSpecialCharacter('é')}>é</button>
          <button onClick={() => handleSpecialCharacter('è')}>è</button>
          <button onClick={() => handleSpecialCharacter('ê')}>ê</button>
          {/* <button onClick={() => handleSpecialCharacter('ë')}>ë (?)</button> */}
          <button onClick={() => handleSpecialCharacter('î')}>î</button>
          <button onClick={() => handleSpecialCharacter('ï')}>ï</button>
          <button onClick={() => handleSpecialCharacter('ô')}>ô</button>
          {/* <button onClick={() => handleSpecialCharacter('ö')}>ö (?)</button> */}
          {/* <button onClick={() => handleSpecialCharacter('ù')}>ù (?)</button> */}
          <button onClick={() => handleSpecialCharacter('û')}>û</button>
          {/* <button onClick={() => handleSpecialCharacter('ü')}>ü (?)</button> */}
          {/* <button onClick={() => handleSpecialCharacter('ÿ')}>ÿ (?)</button> */}
          <button onClick={() => handleSpecialCharacter('œ')}>œ</button>
          {/* <button onClick={() => handleSpecialCharacter('æ')}>æ (?)</button> */}
          <button onClick={() => handleSpecialCharacter('ç')}>ç</button>
        </>}

      </div>
    </div>
  )
}
