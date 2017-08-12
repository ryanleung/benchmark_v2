import React, { Component } from 'react'

import NumberCard from './metrics_cards/number'

class MetricGroup extends Component {
  render() {
    const { title, metrics } = this.props

    const metricCards = metrics.map((metric, idx) => {
      if (metric.values.length > 0) {
        return <NumberCard key={idx}
                           title={metric.title}
                           metrics={metric.values} />
      }
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
