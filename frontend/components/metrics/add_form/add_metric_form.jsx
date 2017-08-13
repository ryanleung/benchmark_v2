import React, { Component } from 'react';
import * as APIUtil from '../../../api/metric_api_util'

class AddMetricForm extends Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.updateYear = this.updateYear.bind(this)
    this.update = this.update.bind(this)

    this.createMetricSelectBox = this.createMetricSelectBox.bind(this)
    this.setMetricFields = this.setMetricFields.bind(this)
    this.createDataInputs = this.createDataInputs.bind(this)
  }

  componentDidMount() {
    const companyId = this.props.match.params.company_id
    this.props.getMetricNames(companyId)
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
          Title: {inputField.title}<br />
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
      isCurrentValueEmpty = stateMetrics[idx].value == ""
      stateMetrics[idx].value = isCurrentValueEmpty ? "" : Number(e.currentTarget.value)
      this.setState({ metrics: stateMetrics })
    }
  }

  submitForm(e) {
    e.preventDefault();
    const companyId = this.props.match.params.company_id;
    const industryId = this.props.match.params.industry_id;

    this.props.createMetrics(companyId, this.state)
      .then(() => this.props.history.push(`/industry/${industryId}/company/${companyId}`))
  }

  render() {
    if (!this.props.metricNames) {
      return(<div>Loading...</div>)
    } else {
      const fields = this.props.metricNames.data.fields;
      let dataInputFields;

      if (this.state) {
        dataInputFields = this.createDataInputs();
      }

      return (
        <div>
          <form>
            Metric Name: { this.createMetricSelectBox(fields) }<br />
            { dataInputFields }
            <button onClick={ this.submitForm }>Submit</button>
          </form>
        </div>
      )
    }
  }
}

export default AddMetricForm;
