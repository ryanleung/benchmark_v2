import React from 'react';
import { Provider } from 'react-redux';

// react router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// react components
import App from './app';
import ExploreContainer from './explore/explore_container';
import SessionFormContainer from './session_form/session_form_container';

const Root = ({ store }) => {

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
          <Route path="/signup" component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;