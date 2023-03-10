import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../css/Test.css';
import WordBlock from './test/WordBlock';

const Test = (props) => {
  const [indexList, setIndexList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [correctOrIncorrect, setCorrectOrInCorrect] = useState([]);
  const [correctNumber, setcorrectNumber] = useState(0);
  const [incorrectNumber, setincorrectNumber] = useState(0);
  const [quizOk, setquizOk] = useState(true)
  const url = `${process.env.REACT_APP_MY_API_SITE}/api/${props.whatTest[1]}/?kind=${props.whatTest[2]}&stage=Stage${props.whatTest[3]}&chapter=${props.whatTest[4]}&student_id=${props.whatTest[5]}`
  const countAnswer = () => {
    setcorrectNumber(document.getElementsByClassName('correct').length);
    setincorrectNumber(document.getElementsByClassName('incorrect').length);
  };
  useEffect(() => {
    fetch(url).then((response) => response.json()).then((data) => {
      if (data.data.length >= 1) {
        setIndexList(data.data.map((item) => item[0]));
        setAnswerList(data.data.map((item) => item[1]));
        setQuestionList(data.data.map((item) => item[2]));
      } else {
        setquizOk(false)
      };
    });
  }, [url, indexList.length]);

  const quizProceed = (correct) => {
    window.navigator.vibrate(50);
    setQuizIndex(quizIndex + 1);
    if (correct) {
      setCorrectOrInCorrect([...correctOrIncorrect, true])
    } else {
      setCorrectOrInCorrect([...correctOrIncorrect, false])
    }
    if(quizIndex >= indexList.length - 1){
      document.querySelector('.gamepad').style.display = 'none';
  };
    setAnswerOpen(false);
  };

  const endQuiz = () => {
    let correctDivs = document.querySelectorAll(".correct .index");
    let correct = [];
    for (let i = 0; i < correctDivs.length; i++) {
      correct.push(correctDivs[i].textContent);
    }
    let incorrectDivs = document.querySelectorAll(".incorrect .index");
    let incorrect = [];
    for (let i = 0; i < incorrectDivs.length; i++) {
      incorrect.push(incorrectDivs[i].textContent);
    }
    fetch(`${process.env.REACT_APP_MY_API_SITE}/api/result/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          'correct': correct,
          'incorrect': incorrect,
          'kind': props.whatTest[2],
          'student_id': props.whatTest[5],
        }
      )
    });
    props.setScreen('home');
  };

  return (
    <div className='quiz_screen'>
      <div className="game">
        <div id="word_blocks">
          {/* ???????????????????????? */}
          {Array(quizIndex).fill('').map((item, index) => <WordBlock key={quizIndex - 1 - index} countAnswer={countAnswer} correct={correctOrIncorrect[quizIndex - 1 -index]} index={indexList[quizIndex - 1 - index]} answer={answerList[quizIndex - 1 - index]} question={questionList[quizIndex - 1 - index]} />)} 
        </div>
        {quizIndex >= indexList.length &&indexList.length > 0 && (
          <button onClick={() => endQuiz()} className= 'to_home'>??????</button>
        )}
      </div>
      {quizOk && (
        <div className="gamepad">
          <div className="info">
            <div className="left-info">
              <div className="cycle"></div><p className="correct_number">{correctNumber}</p><img src={`${process.env.PUBLIC_URL}/checkbox.svg`} alt="" /><p className="incorrect_number">{incorrectNumber}</p>
            </div>
            <button className="exit" onClick={() => props.setScreen('home')}>??????</button>
            <div className="right-info"><span id="quiz_number">{quizIndex + 1}</span>??????/<span id="quiz_length">{indexList.length}</span></div>
          </div>
          <div className="question">{questionList[quizIndex]}</div>
          <div className="answer" onClick={() => setAnswerOpen(true)}>{answerOpen ? answerList[quizIndex] : '???????????????'}</div>
          <div className="select">
            <button onClick={() => quizProceed(false)} id="incorrect">?????????</button>
            <button onClick={() => quizProceed(true)} id="correct">??????</button>
          </div>
        </div>
      )}
      {!quizOk && (
        <div className="non-incorrect">
          <div className="message">
            <p>???????????????????????????????????????</p>
            <p>?????????????????????????????????????????????</p>
          </div>
          <button onClick={() => props.setScreen('home')} className= 'to_home'>??????</button>
        </div>
      )}
    </div>
  )
}

export default Test