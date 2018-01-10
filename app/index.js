import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from "./redux/createStore";

const render = () => (
  <Provider store={createStore()}>
    <App />
  </Provider>
);
ReactDOM.render(render(), document.getElementById('app'));
