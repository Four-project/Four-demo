import React ,{Component}from 'react';
import './index.less'
function App (props){
    return (
    <div className="App"> 
     {props.children}
    </div>
  )

}

export default App
