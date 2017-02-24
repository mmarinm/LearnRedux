const redux = require('redux');

console.log('starting redux example');
const defaultState = {
  searchText:'',
  showCompleted: false,
  todos:[]
}

const reducer = (state = defaultState, action) => {
  console.log('new action', action);

  switch(action.type) {
    case 'CHANGE_SEACRH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
      default:  return state;
  }
};

// second argument is for redux dev tools
const store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

//Subscribe to changes
store.subscribe(() => {
  const state = store.getState();
  console.log('name is ', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
});

const currentState = store.getState();

console.log('currentState', currentState);

const action = {
  type:'CHANGE_SEACRH_TEXT',
  searchText: 'new searchText'
}
const newAction = {
  type:'CHANGE_SEACRH_TEXT',
  searchText: 'latest searchText'
}

store.dispatch(action);
store.dispatch(newAction)
