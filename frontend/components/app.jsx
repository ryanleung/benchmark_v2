import React from 'react';
import { Route, Switch } from 'react-router-dom'

import NavBar from './shared/nav_bar_container'
import CompanyPageContainer from './company/company_page_container';
import ExplorePageContainer from './explore/explore_page_container';
import SessionFormContainer from './session_form/session_form_container';
import AddMetricFormContainer from './metrics/add_form/add_metric_form_container';

import './app.css'

const App = ({ children }) => (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={ExplorePageContainer} />
        <Route path="/login" component={SessionFormContainer} />
        <Route exact path="/industry/:industry_id/company/:company_id" component={CompanyPageContainer} />
        <Route path="/industry/:industry_id/company/:company_id/add_metric" component={AddMetricFormContainer} />
        <Route path="/signup" component={SessionFormContainer} />
      </Switch>
    </div>
);

export default App;
