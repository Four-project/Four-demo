import React ,{Component}from 'react';
import './index.less'
import Nav from './components/nav'
function App (props){
    return (
    <div className="App">
      
     {props.children}
    </div>
  )

}

export default App
