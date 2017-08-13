import React, {Component} from 'react';
import { withRouter } from  'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// import SignInPage from './SignInPage.js';

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleTitleTap = this.handleTitleTap.bind(this)
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleTitleTap() {
    this.props.history.push("/");
  };

  handleLogin() {
    this.props.history.push('/login')
  };

  handleLogout() {
    this.props.logout()
    this.props.history.push("/");
  };

  handleAddMetric() {
    this.props.history.push('/add_metric')
  };

  render() {
    const currentUser = this.props.currentUser

    const loginButton = () => (
      <FlatButton
        label="Login"
        onTouchTap={this.handleLogin} />
    );

    const logoutButton = () => (
      <FlatButton
        label="Logout"
        onTouchTap={this.handleLogout} />
    );

    return (
      <div>
        <AppBar
          zDepth={0}
          title="Kimono Metrics"
          showMenuIconButton={false}
          onTitleTouchTap={this.handleTitleTap}
          iconElementRight={currentUser ? logoutButton() : loginButton()}
        />
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}>
        </Dialog>
      </div>
    )
  }
}

export default withRouter(NavBar);
