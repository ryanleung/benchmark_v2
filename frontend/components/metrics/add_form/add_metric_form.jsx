import React, { Component } from 'react';
import * as APIUtil from '../../../api/metric_api_util'

class AddMetricForm extends Component {
  constructor(props) {
    super(props)

    this.state = { metrics: null, title: null, year: null }
    this.submitForm = this.submitForm.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    const companyId = this.props.match.params.company_id
    this.props.getMetricNames(companyId)
  }

  // componentWillReceiveProps(nextProps, oldProps) {
  //   debugger
  // }

  update(property, inputSize) {
    return e => this.setState({ [property]: e.currentTarget.value })
  }

  submitForm(e) {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    if (!this.props.metricNames) {
      return(
        <div>Loading...</div>
      )
    } else {
      let nameOptions = this.props.metricNames.data.fields.map((name, idx) => <option key={idx} value={name.title}>{name.title}</option>)
      nameOptions = (
        <select onChange={this.update('title')}>
          <option disabled selected>-- Please Select --</option>
          { nameOptions }
        </select>
      )

      return (
        <div>
          <form>
            <div>
              <div>
                Metric Name: { nameOptions }<br />
              </div>
            </div>
            <button onClick={ this.submitForm }>Submit</button>
          </form>
        </div>
      )
    }
  }
}

export default AddMetricForm;
