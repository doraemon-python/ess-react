import React, { useEffect, useState } from 'react'

const WordBlock = (props) => {
  const [correct, setCorrect] = useState(props.correct);
  useEffect(() => {
    props.countAnswer();
  },[props, correct]);
  
  return (
    <div onClick={() => setCorrect(!correct)} className={correct ? 'word_block correct' : 'word_block incorrect'}>
      <div className="index">{props.index}</div>
      <div className="word_content">
        <p>{props.question}</p>
        <p>{props.answer}</p>
      </div>
    </div>
  )
}

export default WordBlock