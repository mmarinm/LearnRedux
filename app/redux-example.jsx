const redux = require('redux');

console.log('starting redux example');

const reducer = (state = {name:'Anonymous'}, action) => {

  return state;
};

const store = redux.createStore(reducer);

const currentState = store.getState();

console.log('currentState', currentState);
