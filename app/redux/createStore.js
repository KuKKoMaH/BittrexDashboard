import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducer from './reducer';
import { saveAuth } from "./middlewares";

export default () => {
  const middlewares = applyMiddleware(
    thunk,
    saveAuth,
  );
  return createStore(reducer, middlewares);
}
