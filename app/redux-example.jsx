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

// Name reducer and action generators
//-----------------------------------

const nameReducer = (state='Anonymous', action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default: return state
  }
}

const changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
}

// Hobbies reducer and action generators
//-----------------------------------
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
//actions
const addHobby = (id, hobby) => {
  return {
    type: 'ADD_HOBBY',
    id,
    hobby
  }
}

const removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }

}

// Movies reducer and action generators
//-----------------------------------
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

// actions
const addMovie = (id, title, genere) => {
  return {
    type: 'ADD_MOVIE',
    id,
    title,
    genere
  }
}

const removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
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


store.dispatch(changeName("new name"));
store.dispatch(addHobby(1, 'running'));
store.dispatch(addHobby(2, 'walking'));
store.dispatch(removeHobby(1));
store.dispatch(addMovie(1, 'Volvere', 'Drama'));
store.dispatch(changeName("latest nameeeee"));
store.dispatch(addMovie(2, 'Pulp Fiction', 'Action'));
store.dispatch(removeMovie(1));
