import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import '../../css/Header.css';

const Header = (props) => {
  const classToggle = () => {
    const active = document.querySelector('.active');
    const btn = document.querySelector('header nav');
    active.classList.toggle('open');
    btn.classList.toggle('open');
  };

  const student_id = useParams().student_id;

  const classToggleAndSetScreen = () => {
    classToggle();
    props.setScreen('home');
  };

  return (
    <>
    <div className='header'>
      <header>
      <Link onClick={() => props.setScreen('home')} to={`/${student_id}/words`}><img src={`${process.env.PUBLIC_URL}/icon.png`} alt=''/>ESS</Link>
      <nav onClick={classToggle}>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </nav>
      </header>
      <div className='active'>
        <div className='nav-menu'>
          <ul>
            <li><Link onClick={classToggleAndSetScreen} activeclassname='now' to={`/${student_id}/words`}>シスタン・単語</Link></li>
            <li><Link onClick={classToggleAndSetScreen} activeclassname='now' to={`/${student_id}/phrases`}>シスタン・フレーズ</Link></li>
            <li><Link onClick={classToggleAndSetScreen} activeclassname='now' to={`/${student_id}/about`}>使い方</Link></li>
          </ul>
        </div>
      </div>
      <div className='air'></div>
    </div>
    <Outlet />
    </>
  )
}

export default Header
