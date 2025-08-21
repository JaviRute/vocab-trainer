import React from 'react'

export default function SetSeconds({ secondsByUser, setSecondsByUser }) {

  const increaseSeconds = () => {
    if (secondsByUser < 60) {
      setSecondsByUser(prevValue => prevValue + 5)
    }
  }

  const decreaseSeconds = () => {
    if (secondsByUser > 5) {
      setSecondsByUser(prevValue => prevValue - 5)
    }
  }

  return (
    <div className='seconds-button no-pointer'>
        <button onClick={decreaseSeconds} className='small-button'>➖</button>
        <label>{secondsByUser}</label>
        <button onClick={increaseSeconds} className='small-button'>➕</button>
    </div>
  )
}
