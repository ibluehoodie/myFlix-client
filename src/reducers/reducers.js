// Redux function for combined reducers (ex. moviesApp());
import { combineReducers } from "redux";

import { SET_USER, SET_FILTER, SET_MOVIES, ADD_FAVORITE, DEL_FAVORITE } from "../actions/actions";

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.user || localStorage.getItem('user') || '';
    case ADD_FAVORITE:
      return action.value;
    case DEL_FAVORITE:
      return action.value;
    default:
      return state;
  }
}

// Two functions (reducers), "visibilityFilter" and "movies" each take a state and an action;
function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

// Long-form combined function before implementing Redux's combineReducers();
// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }
const moviesApp = combineReducers({
  user,
  visibilityFilter,
  movies
});

export default moviesApp;