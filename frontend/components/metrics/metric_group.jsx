import Divider from 'material-ui/Divider';
import React, { Component } from 'react'
import NumberCard from './metrics_cards/number'
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddMetricForm from './add_form/add_metric_form';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { Link } from 'react-router-dom'


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
          <AddMetricForm industryid={company.industry.id}
                         companyid={company.id}/>
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
