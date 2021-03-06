import React, { Component } from 'react';
import { withRouter } from  'react-router-dom';
import * as APIUtil from '../../../api/metric_api_util'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import blue from 'material-ui/colors/blue'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { getMetricNames, createMetrics } from '../../../actions/metric_actions'
import { browserHistory } from 'react-router'

const styles = theme => ({
  formControl: {
    minWidth: 400,
    minHeight: 52
  },
  addButton: {
    marginBottom: 6,
  },
  formContainer: {
    height: 200
  },
  navBarButton: {
    backgroundColor: 'white',
     '&:hover': {
      backgroundColor: 'white'
    },
    color: blue,
    marginRight: 12,
  },
  navTitle: {
    textTransform: 'None',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
})

class AddMetricForm extends Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.updateYear = this.updateYear.bind(this)
    this.update = this.update.bind(this)

    this.createMetricSelectBox = this.createMetricSelectBox.bind(this)
    this.setMetricFields = this.setMetricFields.bind(this)
    this.createDataInputs = this.createDataInputs.bind(this)
    this.handleLogin = this.handleLogin.bind(this)

    this.state = {
      open: false,
      currentMetric: ""
    }
    this.handleOpen = () => {
      this.setState({open: true});
    }
    this.handleClose = () => {
      this.setState({open: false});
    }
  }

  handleLogin() {
    this.setState({open: false})
    this.props.history.push('/login');
  };

  componentDidMount() {
    const companyId = this.props.companyid
    APIUtil.getMetricNames(companyId)
      .then(response => {
        this.setState({metricNames: response.data.fields})
      })
  }

  createMetricSelectBox(fields) {
    const classes = this.props.classes
    const metricNameOptions = fields.map(
      (name, idx) => <MenuItem value={idx}>{name.title}</MenuItem>
    )

    return (
      <FormControl className={classes.formControl}>
        <Select  value={this.state.currentMetric} onChange={this.setMetricFields(fields)}>
          <MenuItem value=""></MenuItem>
          { metricNameOptions }
        </Select>
      </FormControl>
    )
  }

  setMetricFields(fields) {
    return e => {
      const metric = fields[e.currentTarget.value]

      const stateMetrics = metric.input_fields.map((input_field, i) => {
        return {
          title: input_field.title,
          metric_name: input_field.metric_name,
          description: input_field.description,
          value: "",
          relevant_date: ""
        }
      })

      this.setState({ metrics: stateMetrics })
      this.setState({currentMetric: e.currentTarget.value})
    }
  }

  createDataInputs() {
    const classes = this.props.classes
    const inputFields = this.state.metrics.map((inputField, idx) => {
      return(
        <div key={idx}>
          <DialogContentText>
            {this.state.metrics[idx].description}
          </DialogContentText>
          <div></div>
         <FormControl className={classes.formControl}>
            <TextField
              label={inputField.title + " Value"}
              onChange={this.update(idx)}
              value={this.state.metrics[idx].value}/>
          </FormControl>
        </div>
      )
    })

    return (
      <div>
        { inputFields }
          <TextField
            label="Year"
            onChange={this.updateYear}
            value={this.state.metrics[0].relevant_date}/>
      </div>
    )
  }

  updateYear(e) {
    const stateMetrics = this.state.metrics.slice()
    const newMetrics = stateMetrics.map(metric => {
      metric.relevant_date = Number(e.currentTarget.value)
      return metric
    })

    this.setState({ metrics: newMetrics })
  }

  update(idx) {
    return e => {
      const stateMetrics = this.state.metrics.slice()
      const isCurrentValueEmpty = e.currentTarget.value == ""
      stateMetrics[idx].value = isCurrentValueEmpty ? "" : Number(e.currentTarget.value)
      this.setState({ metrics: stateMetrics })
    }
  }
  submitForm(e) {
    e.preventDefault();
    const companyId = this.props.companyid;
    const industryId = this.props.industryid;

    APIUtil.postMetric(companyId, {metrics: this.state.metrics})
      .then(this.handleClose)
  }

  render() {
    const classes = this.props.classes
    if (!this.state.metricNames) {
      return(<div>Loading...</div>)
    } else {
      const actions = [
        <Button raised onClick={this.submitForm}>
          Submit
        </Button>
      ];
      const fields = this.state.metricNames;

      let dataInputFields;
      if (this.state.metrics) {
        dataInputFields = this.createDataInputs();
      }
      const loginButton = () => (
        <Button raised onClick={this.handleLogin}>
            Login
        </Button>
      );


      let dialog = null;
      if (this.props.currentUser) {
        dialog =
          <Dialog
            title="Add a metric"
            open={this.state.open}
            onRequestClose={this.handleClose}>
            <DialogContent>
              <DialogContentText>
                What metric would you like to add?
              </DialogContentText>
              <form className={classes.formContainer} autoComplete="off">
                <FormControl className={classes.formControl}>
                  { this.createMetricSelectBox(fields) }
                  { dataInputFields }
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              {actions}
            </DialogActions>
          </Dialog>
      } else {
        dialog = 
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <DialogContent>
            <DialogContentText>
              Sign in to contribute data. <br/>
              Get a month free of standard access for each data
              point you contribute.
            </DialogContentText>
         </DialogContent>
         <DialogActions>
           {loginButton()}
         </DialogActions>
        </Dialog>
      }
      return (
        <div>
        <Button className={classes.navBarButton} onClick={this.handleOpen}>
          <Typography type="button" className={classes.navTitle} color="primary">
            Submit Metric
          </Typography>
        </Button>
        {dialog}
      </div>
    )
    }
  }
}

AddMetricForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(withRouter(AddMetricForm));
