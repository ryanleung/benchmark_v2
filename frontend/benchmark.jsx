import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './components/root';
import configureStore from './store/store';


document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // Needed for onTouchTap 
  // http://stackoverflow.com/a/34015469/988941 
  injectTapEventPlugin();

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});