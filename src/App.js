import React from 'react';
function App(props) {
  return (
    <div className="App">
      <div>这里是导航</div>
     {props.children}
    </div>
  );
}

export default App;
