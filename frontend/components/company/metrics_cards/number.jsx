import React, { Component } from 'react'

import './metrics_cards.css'

class NumberCard extends Component {
  render() {
    const year = new Date().getFullYear()
    const { title, metrics } = this.props
    const currentMetric = metrics.filter(metric => metric.year === year)[0]
    const { value, value_description, type } = currentMetric
    const currency =
      value_description !== "Quantity" ? `(${value_description})` : ""

    return(
      <div className="card">
        <h3>{ title } {currency}</h3>
        <h4>{ Math.round(value).toLocaleString(undefined) }</h4>
      </div>
    )
  }
}

export default NumberCard
