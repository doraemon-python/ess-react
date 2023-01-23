import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DashBord.css'


const DashBord = (props) => {
  const student_id = useParams().student_id;
  const url = `https://3saq93.deta.dev/api/user/?kind=${props.kind}&student_id=${student_id}`;
  const [userdata, setUserdata] = useState();

  
  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => setUserdata(data))
    .catch(error => {console.log(error)});
  }, [url]);

  if (typeof userdata == 'object') {
    document.getElementById('latest_login_date').textContent = userdata.latest_login
    const progressByStage = userdata.progress
    for (let i = 1; i <= progressByStage.length; i++) {
      document.getElementById('s'+i+'-1').textContent = progressByStage[i-1][0]
      document.getElementById('s'+i+'-2').textContent = progressByStage[i-1][1]
      document.getElementById('s'+i+'-3').textContent = progressByStage[i-1][2]
      const sum = progressByStage[i-1][0] + progressByStage[i-1][1] + progressByStage[i-1][2]
      const rate1 = parseInt(progressByStage[i-1][0]/sum*100)
      const rate2 = parseInt(progressByStage[i-1][1]/sum*100)
      const rate3 = 100 - rate1 -rate2
      document.getElementById('s'+i+'-1-bar').style.width = rate1 + '%'
      document.getElementById('s'+i+'-2-bar').style.width = rate2 + '%'
      document.getElementById('s'+i+'-3-bar').style.width = rate3 + '%'
    };
  };
  
  let stages = [];
  if (props.kind === 'words') {
    stages = [1, 2, 3, 4];
  } else if (props.kind === 'phrases') {
    stages = [1, 2, 3, 4, 5];
  };
  return (
    <div className="dash_bord">
      <input type="checkbox" name='student_info' id='student_info' />
      <label htmlFor="student_info" className='student_info_label'>生徒番号:{student_id}
        <div className="state">+</div>
      </label>
      <div className={props.kind === 'phrases' ? "student_info_content phrases" : "student_info_content"}>
        <ul>
          <div>
            <li className="latest_login">
              <p>前回の学習</p>
              <p id='latest_login_date'>?</p>
            </li>
          </div>
          {stages.map(stage => (
            <div key={stage}>
              <li className="score">
                <p>Stage{stage}</p>
                <div className="detail">
                  <div className="cycle"></div><span id={`s${stage}-1`}>?</span>
                  <img src={`${process.env.PUBLIC_URL}/checkbox.svg`} alt="" /><span id={`s${stage}-2`}>?</span>
                  未<span id={`s${stage}-3`}>?</span>
                </div>
              </li>
              <li className="statebar">
                <div id={`s${stage}-1-bar`} className="bar-blue"></div>
                <div id={`s${stage}-2-bar`} className="bar-red"></div>
                <div id={`s${stage}-3-bar`} className="bar-gray"></div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DashBord