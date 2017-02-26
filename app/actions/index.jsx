const axios = require('axios');

export const changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
}

export const addHobby = (id, hobby) => {
  return {
    type: 'ADD_HOBBY',
    id,
    hobby
  }
}

export const removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

export const addMovie = (id, title, genere) => {
  return {
    type: 'ADD_MOVIE',
    id,
    title,
    genere
  }
}

export const removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}

export const startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH',
  }
}

export const completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

export const fetchLocation = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch());

    axios.get('http://ipinfo.io').then((res) => {
      const loc = res.data.loc;
      const baseUrl = 'http://maps.google.com?q=';

      dispatch(completeLocationFetch(baseUrl + loc))
    });
  }
}
