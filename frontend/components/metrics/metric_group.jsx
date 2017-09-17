import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NumberCard from './metrics_cards/number'


import './metric_group.css'
class MetricGroup extends Component {
  render() {
    const { title, metrics, company } = this.props

    const metricCards = metrics.map((metric, idx) => {
      if (metric.values.length > 0) {
        return <NumberCard key={idx}
                           title={metric.title}
                           metrics={metric.values} />
      }
    })

    return(
      <div>
        <div className='MetricGroupTop'>
          <h2 className='MetricGroupTitle'>{ title }</h2>
          <Link to={`/industry/${company.industry.id}/company/${company.id}/add_metric`}>
            <FloatingActionButton mini={true}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
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
