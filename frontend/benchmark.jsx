import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import AppMuiTheme from './components/themes/app_mui_theme';
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
  ReactDOM.render(
    <MuiThemeProvider theme={AppMuiTheme}>
      <Root store={store}/>
    </MuiThemeProvider>, root);
});
