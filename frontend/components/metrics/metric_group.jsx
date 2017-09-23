import Divider from 'material-ui/Divider';
import React, { Component } from 'react'
import NumberCard from './metrics_cards/number'
import AddMetricCard from './metrics_cards/add_metric'


import './metric_group.css'
class MetricGroup extends Component {
  render() {
    const { title, metrics, company } = this.props

    var numCards = metrics.length
    metrics[numCards+1] = "AddMetricCard"
    const metricCards = metrics.map((metric, idx) => {
      if (metric == "AddMetricCard") {
        return <AddMetricCard key={idx}
                              company={company} />
      } else if (metric.values.length > 0) {
        return <NumberCard key={idx}
                           title={metric.title}
                           metrics={metric.values} />
      }
    })

    return(
      <div>
        <div className='MetricGroupTop'>
          <h2 className='MetricGroupTitle'>{ title }</h2>
        </div>
        <div className="Metrics">
          { metricCards }
        </div>
        <div className='spacer' />
        <Divider />
      </div>
    )
  }
}

export default MetricGroup
