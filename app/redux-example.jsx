const redux = require('redux');

const actions = require('./actions/index');
const store = require('./store/configureStore').configure();

const stateDefault = {
  id: 1,
  name: 'Anonymous',
  hobbies: [],
  movies: []
}


// const oldRseducer = (state = stateDefault, action) => {
//   switch(action.type) {
//     case 'CHANGE_NAME':
//       return {
//         ...state,
//         name: action.name
//       };
//     case 'ADD_HOBBY':
//       return {
//         ...state,
//         hobbies: [
//           ...state.hobbies,
//           {
//             id: action.id,
//             hobby: action.hobby
//           }
//         ]
//       };
//     case 'REMOVE_HOBBY':
//       return {
//         ...state,
//         hobbies: state.hobbies.filter(hobby => hobby.id !== action.id)
//       };
//     case 'ADD_MOVIE':
//       return {
//         ...state,
//         movies: [
//           {
//             id: action.id,
//             title: action.title,
//             genere: action.genere
//           }
//         ]
//       };
//       case 'REMOVE_HOBBY':
//         return {
//           ...state,
//           hobbies: state.movies.filter(movie => movie.id !== action.id)
//         };
//
//       default:  return state;
//   }
// };

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


// Map reducer and action generators
//-----------------------------------

const mapReducer = (state={isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case "COMPLETE_LOCATION_FETCH":
      return {
        isFetching: false,
        url: action.url
      };

    default: return state;

  }
}

const startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH',
  }
}

const completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

const fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then((res) => {
    const loc = res.data.loc;
    const baseUrl = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc))
  });
}




const reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movie: moviesReducer,
  map: mapReducer
})

// const store = redux.createStore(reducer, redux.compose(
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// ));

const unsubsribe = store.subscribe(() => {
  const state = store.getState();
  console.log(state);

  if(state.map.isFetching) {
    document.getElementById('app').innerHTML = "Loading";
  }
  else if (state.map.url) {
    document.getElementById('app').innerHTML = "<a href='" + state.map.url + "' target=_blank >View Your Location </a>";
  }
});

const currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName("new name"));
store.dispatch(actions.addHobby(1, 'running'));
store.dispatch(actions.addHobby(2, 'walking'));
store.dispatch(actions.removeHobby(1));
store.dispatch(actions.addMovie(1, 'Volvere', 'Drama'));
store.dispatch(actions.changeName("latest nameeeee"));
store.dispatch(actions.addMovie(2, 'Pulp Fiction', 'Action'));
store.dispatch(actions.removeMovie(1));
