// define potential actions;
export const SET_USER = 'SET_USER';
export const SET_FILTER = 'SET_FILTER';
export const SET_MOVIES = 'SET_MOVIES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DEL_FAVORITE = 'DEL_FAVORITE';

export function setUser(user) {
  return {
    type: SET_USER,
    user: user?.Username
  };
}

// sets filter for movies;
export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

// initialize movies list with movies;
export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}

export function addFavorite(value) {
  return {
    type: ADD_FAVORITE,
    value
  };
}

export function delFavorite(value) {
  return {
    type: DEL_FAVORITE,
    value
  };
}




