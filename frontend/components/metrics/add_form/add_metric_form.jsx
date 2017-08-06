import React, { Component } from 'react';

class AddMetricForm extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", value: "", year: "", company_id: "" }
    this.submitForm = this.submitForm.bind(this)
    this.update = this.update.bind(this)
  }

  update(property) {
    return e => this.setState({ [property]: e.currentTarget.value })
  }

  submitForm(e) {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <div>
              Metric Name:
              <select onChange={this.update('name')}>
                <option disabled selected>-- Please Select --</option>
                <option value="one">1</option>
                <option value="two">2</option>
              </select><br />
              Value: <input type="text" onChange={this.update('value')}></input><br />
              Year: <input type="text" onChange={this.update('year')}></input>
          </div>
          </div>
          <button onClick={ this.submitForm }>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddMetricForm;
