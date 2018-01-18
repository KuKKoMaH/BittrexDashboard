import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { saveAuth } from './middlewares';

export default () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = applyMiddleware(
    thunk,
    saveAuth,
  );
  return createStore(reducer, composeEnhancers(middlewares));
}
