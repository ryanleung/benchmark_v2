import React, { Component } from 'react'

import NumberCard from './metrics_cards/number'

class MetricGroup extends Component {
  render() {
    const { title, metrics } = this.props

    const metricCards = metrics.map(metric => {
      return <NumberCard title={metric.title} metrics={metric.values} />
    })

    return(
      <div>
        <h2>{ title }</h2>
        <div className="metrics">
          { metricCards }
        </div>
      </div>
    )
  }
}

export default MetricGroup
