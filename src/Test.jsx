import React, { useEffect } from 'react';
import { useState } from 'react';
import './Test.css';
import WordBlock from './WordBlock';

const Test = (props) => {
  const [indexList, setIndexList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [correctOrIncorrect, setCorrectOrInCorrect] = useState([]);
  const [correctNumber, setcorrectNumber] = useState(0);
  const [incorrectNumber, setincorrectNumber] = useState(0);
  const url = `https://3saq93.deta.dev/api/${props.whatTest[1]}/?kind=${props.whatTest[2]}&stage=Stage${props.whatTest[3]}&chapter=${props.whatTest[4]}&student_id=${props.whatTest[5]}`
  const countAnswer = () => {
    setcorrectNumber(document.getElementsByClassName('correct').length);
    setincorrectNumber(document.getElementsByClassName('incorrect').length);
  };
  useEffect(() => {
    fetch(url).then((response) => response.json()).then((data) => {
      setIndexList(data.map((item) => item[0]));
      setAnswerList(data.map((item) => item[1]));
      setQuestionList(data.map((item) => item[2]));
    })
  }, [url]);

  const quizProceed = (correct) => {
    setQuizIndex(quizIndex + 1);
    if (correct) {
      setCorrectOrInCorrect([...correctOrIncorrect, true])
    } else {
      setCorrectOrInCorrect([...correctOrIncorrect, false])
    }
    setAnswerOpen(false);
  };

  return (
    <>
      <div className="game">
        <div id="word_blocks">
          {/* 逆順に並べるため */}
          {Array(quizIndex).fill('').map((item, index) => <WordBlock key={quizIndex - 1 - index} countAnswer={countAnswer} correct={correctOrIncorrect[quizIndex - 1 -index]} index={indexList[quizIndex - 1 - index]} answer={answerList[quizIndex - 1 - index]} question={questionList[quizIndex - 1 - index]} />)} 
        </div>
        {quizIndex >= indexList.length && (
          <button onClick={() => props.setScreen('home')} className='to_home'>保存</button>
        )}
      </div>
      {quizIndex < indexList.length && (
        <div className="gamepad">
          <div className="info">
            <div className="left-info">
              <div className="cycle"></div><p className="correct_number">{correctNumber}</p><img src={`${process.env.PUBLIC_URL}/checkbox.svg`} alt="" /><p className="incorrect_number">{incorrectNumber}</p>
            </div>
            <button className="exit" onClick={() => props.setScreen('home')}>中断</button>
            <div className="right-info"><span id="quiz_number">{quizIndex + 1}</span>問目/<span id="quiz_length">{indexList.length}</span></div>
          </div>
          <div className="question">{questionList[quizIndex]}</div>
          <div className="answer" onClick={() => setAnswerOpen(true)}>{answerOpen ? answerList[quizIndex] : '解答を表示'}</div>
          <div className="select">
            <button onClick={() => quizProceed(false)} id="incorrect">不正解</button>
            <button onClick={() => quizProceed(true)} id="correct">正解</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Test