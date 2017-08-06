import React from 'react';
import { Route, Switch } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './shared/nav_bar'
import AppMuiTheme from './themes/app_mui_theme';
import CompanyPageContainer from './company/company_page_container';
import ExplorePageContainer from './explore/explore_page_container';
import SessionFormContainer from './session_form/session_form_container';
import AddMetricForm from './metrics/add_form/add_metric_form';

import './app.css'


const App = ({ children }) => (
  <div>
    <MuiThemeProvider muiTheme={AppMuiTheme}>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ExplorePageContainer} />
          <Route path="/login" component={SessionFormContainer} />
          <Route path='/industry/:industry_id/company/:company_id' component={CompanyPageContainer} />
          <Route path="/signup" component={SessionFormContainer} />
          <Route path="/company/:company_id/add_metric" component={AddMetricForm} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </div>
);

export default App;
