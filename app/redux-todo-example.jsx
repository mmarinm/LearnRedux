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

const store = redux.createStore(reducer);

const currentState = store.getState();

console.log('currentState', currentState);

const action = {
  type:'CHANGE_SEACRH_TEXT',
  searchText: 'new searchText'
}

store.dispatch(action);
console.log('searchText shoud be new searchText', store.getState().searchText);
