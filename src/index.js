import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './router'
//引入Store，使所有组件的props中都有Store对象
import Store from 'store/store'
import {Provider}from 'react-redux'
import * as serviceWorker from './serviceWorker';
//引入axios,将axios挂载到根组件
import axios from 'utils/axios.js'
React.Component.prototype.$axios=axios
ReactDOM.render(
  <Provider store={Store}>
  <RootRouter>
    
  </RootRouter >
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
