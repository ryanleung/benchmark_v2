import React, { Component } from 'react'
import blue500 from 'material-ui/styles/colors';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { Link } from 'react-router-dom'

import './metrics_cards.css'

class AddMetricCard extends Component {
  render() {
    const {company} = this.props
    return(
      <div className="Metric AddMetric">
        <Link className="AddMetricLink"
              to={`/industry/${company.industry.id}/company/${company.id}/add_metric`}>
        </Link>
      </div>
    )
  }
}

export default AddMetricCard
