import React, {Component} from 'react';
import { withRouter } from  'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import blue from 'material-ui/colors/blue'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AddMetricForm from '../metrics/add_form/add_metric_form'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    width: '100%',
  },
  flex: {
    display: "flex",
  },
  navTitle: {
    textTransform: 'None',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  navSpace: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  navBarButton: {
    backgroundColor: 'white',
     '&:hover': {
      backgroundColor: 'white'
    },
    color: blue,
    marginRight: 12,
 }
});


class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleTitleTap = this.handleTitleTap.bind(this)
  }

  handleTitleTap() {
    this.props.history.push("/");
  };

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

  componentWillUnmount (props){
   this.setState({company: this.props.company}) // This will update your component.
  }

  render() {
    const {classes, company, currentUser} = this.props
    const loginButton = () => (
      <Button className={classes.navBarButton} onClick={this.handleLogin}>
        <Typography type="button" className={classes.navTitle} color="primary">
          Login
        </Typography>
      </Button>
    );

    const logoutButton = () => (
      <Button className={classes.navBarButton} onClick={this.handleLogout}>
        <Typography type="button" className={classes.navTitle} color="primary">
          Logout
        </Typography>
      </Button>
    );

    const submitDataButton = () => (
      <AddMetricForm industryid={company.industry.id}
                     companyid={company.id}
                     currentUser={currentUser}
      />
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.flex}>
            <Button color="contrast" className={classes.navTitle} onClick={this.handleTitleTap}>
              <Typography type="title" color="inherit" className={classes.navTitle}>
                  Kimono Metrics
              </Typography>
            </Button>
            <div className={classes.navSpace}></div>
              {company && submitDataButton()}
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
