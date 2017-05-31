import React from 'react';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './shared/nav_bar'
import AppMuiTheme from './themes/app_mui_theme';
import ExploreContainer from './explore/explore_container';

import './app.css'


const App = ({ children }) => (
  <div>
    <MuiThemeProvider muiTheme={AppMuiTheme}>
      <div>
        <NavBar />
        <ExploreContainer />
        { children }
      </div>
    </MuiThemeProvider>
  </div>
);

export default App;
