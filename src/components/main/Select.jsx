import React from 'react'
import { useParams } from 'react-router-dom'
import '../../css/Select.css'

const Select = (props) => {
  const student_id = useParams().student_id;

  const setScreenAndWhatTest = (chapter) => {
    if (props.whatTest[0] === '復習') {
      props.setScreen('test');
    } else if (props.whatTest[0] === 'テスト') {
      props.setScreen('test');
    } else {
      props.setScreen('show');
    }
    props.setWhatTest([...props.whatTest, chapter, student_id]);
  }

  const startEndIndex = [
    [[1, 100], [101, 200], [201, 300], [301, 400], [401, 500], [501, 600],],
    [[601, 700], [701, 800], [801, 900], [901, 1000], [1001, 1100], [1101, 1200],],
    [[1201, 1300], [1301, 1400], [1401, 1500], [1501, 1600], [1601, 1700],],
    [[1701, 1800], [1801, 1900], [1901, 2027],],
    [[1, 100], [101, 200], [201, 300], [301, 418],]
  ]
  return (
    <div className="contents correct">
      <p>問題番号を選択</p>
      <div className="detail">
        <div className="headline">
          <img src={`${process.env.PUBLIC_URL}/image1.png`} alt="" />
          <h1>選択</h1>
        </div>
        <div className="select-btn">
          {startEndIndex[props.whatTest[3] - 1].map((item, index) => (
            <button key={index} className='chapter_selecter' onClick={() => setScreenAndWhatTest(index+1)}>{`${item[0]}~${item[1]}`}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Select