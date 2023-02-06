import React, { useEffect, useState } from 'react'
import '../../css/Show.css'

const Show = (props) => {
  const [indexList, setIndexList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const url = `${process.env.REACT_APP_MY_API_SITE}/api/${props.whatTest[1]}/?kind=${props.whatTest[2]}&stage=Stage${props.whatTest[3]}&chapter=${props.whatTest[4]}&student_id=${props.whatTest[5]}`
  useEffect(() => {
    fetch(url).then((response) => response.json()).then((data) => {
      setIndexList(data.map((item) => item[0]));
      setAnswerList(data.map((item) => item[1]));
      setQuestionList(data.map((item) => item[2]));
    })
  }, [url])
  return (
    <div id='word_blocks'>
      {answerList.map((item, index) => (
        <div key={index} className="word_block correct">
          <div className="index">{indexList[index]}</div>
          <div className="word_content">
            <p>{questionList[index]}</p>
            <p>{item}</p>
          </div>
        </div>
      ))}
      <div onClick={() => props.setScreen('home')} className="to_home">戻る</div>
    </div>
  )
}

export default Show