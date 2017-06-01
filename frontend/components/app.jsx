import React from 'react';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './shared/nav_bar'
import AppMuiTheme from './themes/app_mui_theme';
import ExplorePageContainer from './explore/explore_page_container';

import './app.css'


const App = ({ children }) => (
  <div>
    <MuiThemeProvider muiTheme={AppMuiTheme}>
      <div>
        <NavBar />
        <ExplorePageContainer />
        { children }
      </div>
    </MuiThemeProvider>
  </div>
);

export default App;
