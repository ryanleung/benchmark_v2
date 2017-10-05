import React, { Component } from 'react';
import * as APIUtil from '../../../api/metric_api_util'
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { getMetricNames, createMetrics } from '../../../actions/metric_actions'

class AddMetricForm extends Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.updateYear = this.updateYear.bind(this)
    this.update = this.update.bind(this)

    this.createMetricSelectBox = this.createMetricSelectBox.bind(this)
    this.setMetricFields = this.setMetricFields.bind(this)
    this.createDataInputs = this.createDataInputs.bind(this)
    this.state = {
      open: false,
    }
    this.handleOpen = () => {
      this.setState({open: true});
    }
    this.handleClose = () => {
      this.setState({open: false});
    }
  }


  componentDidMount() {
    const companyId = this.props.companyid
    APIUtil.getMetricNames(companyId)
      .then(response => {
        this.setState({metricNames: response.data.fields})
      })
  }

  createMetricSelectBox(fields) {
    const metricNameOptions = fields.map(
      (name, idx) => <option key={idx} value={idx}>{name.title}</option>
    )

    return (
      <select onChange={this.setMetricFields(fields)}>
        <option disabled selected>-- Please Select --</option>
        { metricNameOptions }
      </select>
    )
  }

  setMetricFields(fields) {
    return e => {
      const metric = fields[e.currentTarget.value]

      const stateMetrics = metric.input_fields.map((input_field, i) => {
        return {
          title: input_field.title,
          metric_name: input_field.metric_name,
          value: "",
          relevant_date: ""
        }
      })

      this.setState({ metrics: stateMetrics })
    }
  }

  createDataInputs() {
    const inputFields = this.state.metrics.map((inputField, idx) => {
      return(
        <div key={idx}>
          Title: {inputField.title}
          Value: <input type="text"
                        onChange={this.update(idx)}
                        value={this.state.metrics[idx].value}></input>
        </div>
      )
    })

    return (
      <div>
        { inputFields }
        Year: <input type="text"
                     onChange={this.updateYear}
                     value={this.state.metrics[0].relevant_date}></input>
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
    if (!this.state.metricNames) {
      return(<div>Loading...</div>)
    } else {
      const actions = [
        <Button raised
          label="Submit"
          onClick={this.submitForm}
        />,
      ];
      const fields = this.state.metricNames;

      let dataInputFields;
      if (this.state.metrics) {
        dataInputFields = this.createDataInputs();
      }
      return (
        <div>
        <Button fab label="Dialog" mini={true} onClick={this.handleOpen}>
          <AddIcon />
        </Button>
        <Dialog
          title="Add a metric"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
        <form>
          Metric Name: { this.createMetricSelectBox(fields) }
          { dataInputFields }
        </form>
        </Dialog>
      </div>
    )
    }
  }
}

export default AddMetricForm
