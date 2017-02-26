const redux = require('redux');
import {nameReducer, hobbiesReducer, moviesReducer, mapReducer} from './../reducers/index';
import ReduxThunk from 'redux-thunk'

export const configure = () => {
  const reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movie: moviesReducer,
    map: mapReducer
  })

  const store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(ReduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store
}
