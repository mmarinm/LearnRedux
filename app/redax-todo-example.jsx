const redux = require('redux');

console.log('starting redux example');
const defaultState = {
  searchText:'',
  showCompleted: false,
  todos:[]
}

const reducer = (state = defaultState, action) => {

  return state;
};

const store = redux.createStore(reducer);

const currentState = store.getState();

console.log('currentState', currentState);
