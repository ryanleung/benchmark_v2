import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { browserHistory } from 'react-router'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  loginFormContainer: {
    display: 'flex',
    width: 1000,
    backgroundColor: 'white',
    margin: [0, "auto"],
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    display: 'flex',
    verticalAlign: 'middle',
    lineHeight: theme.spacing.unit / 3,
    whiteSpace: 'normal',
    marginBottom: 10,
  },
})

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.history.goBack()
    }
  }

  updateField(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  navLink() {
    if (this.props.formType === "login") {
      return <Link to="/signup">sign up instead</Link>;
    } else {
      return <Link to="/login">log in instead</Link>;
    }
  }

  renderErrors() {
    if (this.props.errors) {
      return(
        <ul>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.loginFormContainer}>
        <h1>Welcome to Benchmark!</h1>
        <h2>Please {this.props.formType} or {this.navLink()}</h2>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          {this.renderErrors()}
          <TextField
            className={classes.input}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.handleSubmit(ev)
              }
            }}
            placeholder={"Email"}
            onChange={this.updateField("email")}
            value={this.state.email}/>
          <TextField
            className={classes.input}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                this.handleSubmit(ev)
              }
            }}
            placeholder={"Password"}
            onChange={this.updateField("password")}
            value={this.state.password}
            type="password"/>
        </form>
        <Button raised color="primary" className={classes.button} onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }

}

export default withStyles(styles)(withRouter(SessionForm));
