import React, { Component } from 'react';
import * as APIUtil from '../../../api/metric_api_util'

class AddMetricForm extends Component {
  constructor(props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.setMetricFields = this.setMetricFields.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    const companyId = this.props.match.params.company_id
    this.props.getMetricNames(companyId)
  }

  setMetricFields(fields) {
    return e => {
      const metric = fields[e.currentTarget.value]

      const stateMetrics = metric.input_fields.map((input_field, i) => {
        return {
          name: input_field.title,
          value: null,
          relevant_year: null
        }
      })

      this.setState({ metrics: stateMetrics })
    }
  }

  update(property) {
    return e => this.setState({ [property]: e.currentTarget.value })
  }

  submitForm(e) {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    if (!this.props.metricNames) {
      return(<div>Loading...</div>)
    } else {
      const fields = this.props.metricNames.data.fields;
      let inputFields, metricNameOptions, metricNameSelectBox;

      metricNameOptions = fields.map((name, idx) => <option key={idx} value={idx}>{name.title}</option>)
      metricNameSelectBox = (
        <select onChange={this.setMetricFields(fields)}>
          <option disabled selected>-- Please Select --</option>
          { metricNameOptions }
        </select>
      )


      return (
        <div>
          <form>
            Metric Name: { metricNameSelectBox }<br />
            <button onClick={ this.submitForm }>Submit</button>
          </form>
        </div>
      )
    }
  }
}

export default AddMetricForm;
