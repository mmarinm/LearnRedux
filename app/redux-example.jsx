const redux = require('redux');

console.log('starting redux example');

const stateDefault = {
  id: 1,
  name: 'Anonymous',
  hobbies: [],
  movies: []
}


const oldRseducer = (state = stateDefault, action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: action.id,
            hobby: action.hobby
          }
        ]
      };
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter(hobby => hobby.id !== action.id)
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          {
            id: action.id,
            title: action.title,
            genere: action.genere
          }
        ]
      };
      case 'REMOVE_HOBBY':
        return {
          ...state,
          hobbies: state.movies.filter(movie => movie.id !== action.id)
        };

      default:  return state;
  }
};

const nameReducer = (state='Anonymous', action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default: return state
  }
}

const hobbiesReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: action.id,
          hobby: action.hobby
        }
      ]
    case 'REMOVE_HOBBY':
      return state.filter(hobby => hobby.id !== action.id)
    default: return state

  }
}

const moviesReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          genere: action.genere
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter(movie => movie.id !== action.id)
    default: return state

  }
}


const reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movie: moviesReducer
})

const store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const unsubsribe = store.subscribe(() => {
  const state = store.getState();
  console.log(state);

  document.getElementById('app').innerHTML = state.name;
});

const currentState = store.getState();
console.log('currentState', currentState);

const action = {
  type:'CHANGE_NAME',
  name: 'new name'
}
const newAction = {
  type:'CHANGE_NAME',
  name: 'latest name'
}

const addMovie = {
  type: 'ADD_MOVIE',
  id: 1,
  title: 'Volvere',
  genere: 'Drama'
}

const addMovie2 = {
  type: 'ADD_MOVIE',
  id: 2,
  title: 'Pulp Fiction',
  genere: 'Action'
}

store.dispatch(action);
store.dispatch({
  type: 'ADD_HOBBY',
  id:1,
  hobby: 'running'
});
store.dispatch({
  type: 'ADD_HOBBY',
  id:2,
  hobby: 'walking'
});
store.dispatch({
  type: 'REMOVE_HOBBY',
  id:2
});
store.dispatch(addMovie);
store.dispatch(newAction);
store.dispatch(addMovie2);
store.dispatch({
  type: 'REMOVE_MOVIE',
  id:1
})
console.log(store);
