import React from 'react';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppMuiTheme from './themes/app_mui_theme.js';
import ExploreContainer from './explore/explore_container';


const App = ({ children }) => (
  <div>
    <MuiThemeProvider muiTheme={AppMuiTheme}>
      <div>
        <ExploreContainer />
        { children }
      </div>
    </MuiThemeProvider>
  </div>
);

export default App;
