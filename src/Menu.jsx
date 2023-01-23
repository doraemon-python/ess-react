import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import DashBord from './DashBord';
import './Menu.css';

const Menu = (props) => {
  const student_id = useParams().student_id;
  return (
    <div className="menu">
      <div className='game-mode'>
        <p>モード:</p>
        <div className='modes'>
          <NavLink onClick={() => props.setScreen('home')} className={({isActive}) => (isActive ? 'now': 'none')} to={`/${student_id}/words`}>単語</NavLink>
          <NavLink onClick={() => props.setScreen('home')} className={({isActive}) => (isActive ? 'now': 'none')} to={`/${student_id}/phrases`}>フレーズ</NavLink>
          <NavLink onClick={() => props.setScreen('home')} className={({isActive}) => (isActive ? 'now': 'none')} to={`/${student_id}/about`}>使い方</NavLink>
        </div>
      </div>
      {props.kind !== 'about' && <DashBord kind={props.kind}/>}
    </div>
  )
};

export default Menu