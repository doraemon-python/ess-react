import { useState } from 'react'
import About from '../main/About'
import Content from '../main/Content'
import Menu from '../main/menu/Menu'
import Test from '../main/Test'
import Select from '../main/Select'
import Show from '../main/Show'

const Main = (props) => {
  const [whatTest, setWhatTest] = useState([]);

  const contentState = () => {
    if (props.kind !== 'about') {
      if (props.screen === 'home') {
        return <Content setScreen={props.setScreen} setWhatTest={setWhatTest} kind={props.kind} />
      } else if (props.screen === 'select') {
        return <Select setScreen={props.setScreen} setWhatTest={setWhatTest} whatTest={whatTest} />
      } else if (props.screen === 'test') {
        return <Test setScreen={props.setScreen} whatTest={whatTest}/>
      } else if (props.screen === 'show') {
        return <Show setScreen={props.setScreen} whatTest={whatTest}/>
      }
    } else {
      return <About />
    }
  }
  return (
    <main>
      {props.screen === 'home' && <Menu kind={props.kind} setScreen={props.setScreen}/>}
      {props.screen === 'select' && <Menu kind={props.kind} setScreen={props.setScreen}/>}
      {contentState()}
    </main>
  )
}

export default Main