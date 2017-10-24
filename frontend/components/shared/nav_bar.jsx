import React, {Component} from 'react';
import { withRouter } from  'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});


class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleLogin() {
    this.props.history.push('/login')
  };

  handleLogout() {
    this.props.logout()
    this.props.history.push("/");
  };

  render() {
    const {classes, currentUser} = this.props

    const loginButton = () => (
      <Button color="inherit" onClick={this.handleLogin}>
        Login
      </Button>
    );

    const logoutButton = () => (
      <Button color="inherit" onClick={this.handleLogout}>
        Logout
      </Button>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              Kimono Metrics
            </Typography>
            {currentUser ? logoutButton() : loginButton()}
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}>
        </Dialog>
      </div>
  )};
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(NavBar));
