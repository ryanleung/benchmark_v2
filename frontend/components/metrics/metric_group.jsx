import React, { Component } from 'react'

class MetricGroup extends Component {
  renter() {
    { title, metrics } = this.props

    const metricCards = metrics.forEach(metric => {
      return <NumberCard title={metric.title} metrics={metric.metrics} />
    })

    return(
      <div>
        <h3>{ title }</h3>
        { metricCards }
      </div>
    )
  }
}
