import React from 'react'
import '../../css/Content.css'

const Content = (props) => {
  const contentsTitles = {
    'words': [
      ['間違えた問題から出題', '復習', 'review'],
      ['単語から全て出題', 'テスト', 'all'],
      ['単語からランダムに出題', 'テスト', 'random'],
      ['間違えた問題を復習', '確認', 'review'],
      ['新しい単語を学習', '学習', 'all'],
    ],
    'phrases': [
      ['間違えた問題から出題', '復習', 'review'],
      ['フレーズから全て出題', 'テスト', 'all'],
      ['フレーズからランダムに出題', 'テスト', 'random'],
      ['間違えた問題を復習', '確認', 'review'],
      ['新しいフレーズを学習', '学習', 'all'],
    ]
  }

  const stagesSelect = {
    'words': ['Stage1', 'Stage2', 'Stage3', 'Stage4'],
    'phrases': ['Stage1', 'Stage2', 'Stage3', 'Stage4', 'Stage5']
  }

  const setScreenAndWhatTest = (testOrShow, mode, kind, stage) => {
    props.setScreen('select');
    props.setWhatTest([testOrShow, mode, kind, stage]);
  }

  return (
    <>
      {contentsTitles[props.kind].map((item, index) => (
        <div className="contents" key={index}>
          <p>{item[0]}</p>
          <div className="detail">
            <div className="headline">
              <img src={`${process.env.PUBLIC_URL}/image${index}.png`} alt="" />
              <h1>{item[1]}</h1>
            </div>
            <div className="select-btn">
              {stagesSelect[props.kind].map((item_, index_) => (
                <button key={index_} onClick={() => setScreenAndWhatTest(item[1], item[2], props.kind, index_+1)}>{item_}</button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Content