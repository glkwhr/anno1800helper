import {createStore} from "redux";
import rootReducer from "./reducers";

// To be used to hydrate state
const persistedState = JSON.parse(localStorage.getItem('reduxState') || '{}');

const store = createStore(rootReducer, persistedState);

// Every time state changes, will be written to localStorage.
// TODO: Find a more efficient way to do localStorage
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

export default store;