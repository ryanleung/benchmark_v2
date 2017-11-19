import React, {Component} from 'react';
import { withRouter } from  'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import blue from 'material-ui/colors/blue'
import grey from 'material-ui/colors/grey'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AddMetricForm from '../metrics/add_form/add_metric_form'
import appLogo from '../../assets/images/applogo.png'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    width: '100%',
  },
  flex: {
    display: "flex",
    padding: 0,
  },
  navTitle: {
    textTransform: 'None',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    padding: 0,
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
    color: "black",
    marginRight: 12,
  },
  container: {
    width: 1000,
    margin: [0, "auto"]
  },
  appBar: {
    backgroundColor: "black",
    display: "flex",
  },
  appLogo: {
    backgroundImage: "url(https://i.imgur.com/l1rg5CO.png)",
    backgroundSize: "cover",
    marginLeft: -32,
    marginRight: 12,
    height: 20,
    width: 20,
    padding: 0,
    minWidth: 0,
    minHeight: 0,
    borderRadius: 0,
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
      <Button className={classes.navBarButton} onClick={this.handleLogin} disableRipple={true}>
        <Typography type="button" className={classes.navTitle}>
          Login
        </Typography>
      </Button>
    );

    const logoutButton = () => (
      <Button className={classes.navBarButton} onClick={this.handleLogout} disableRipple={true}>
        <Typography type="button" className={classes.navTitle}>
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
        <AppBar className={classes.appBar} position="fixed">
          <div className={classes.container}>
            <Toolbar className={classes.flex}>
              <IconButton className={classes.appLogo} onClick={this.handleTitleTap}/>
              <Button color="contrast" className={classes.navTitle} onClick={this.handleTitleTap} disableRipple={true}>
                <Typography type="title" color="inherit" className={classes.navTitle}>
                    Kimono Metrics
                </Typography>
              </Button>
              <div className={classes.navSpace}></div>
                {currentUser ? logoutButton() : loginButton()}
            </Toolbar>
          </div>
        </AppBar>
      </div>
  )};
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(NavBar));
