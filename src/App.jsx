import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';

function App() {
  const [screen, setScreen] = useState('home');
  return (
    <div className="app">
      <Routes>
        <Route path='/:student_id' element={<Header setScreen={setScreen}/>}>
          <Route path='words' element={<Main screen={screen} setScreen={setScreen} kind='words'/>}></Route>
          <Route path='phrases' element={<Main screen={screen} setScreen={setScreen} kind='phrases'/>}></Route>
          <Route path='about' element={<Main screen={screen} setScreen={setScreen} kind='about'/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;