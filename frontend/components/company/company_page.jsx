import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

import * as APIUtil from '../../api/metric_api_util'
import Company from '../../models/Company'
import MetricGroup from '../metrics/metric_group'

import './company_page.css'


class CompanyPage extends Component {
  componentDidMount() {
    const { match } = this.props
    this.props.fetchCompany(match.params.company_id)
    APIUtil.getMetrics(match.params.company_id)
      .then(response => {
        this.setState({metrics_dashboard: response.data.metric_dashboard})
      })
  }

  render() {
    if (!this.state) {
      return(
        <div>Loading...</div>
      )
    }

    const { company } = this.props
    const metrics = this.state.metrics_dashboard

    const metricGroups = metrics.map(metric => {
      return <MetricGroup title={metric.group} metrics={metric.metrics} />
    })

    // <NumberCard title="Revenue" metrics={annual_revenue} />
    // <NumberCard title="Employees" metrics={total_num_employees} />
    // <NumberCard title="Revenue Per Employee" metrics={revenue_per_employee} />
    // <NumberCard title="Overall Sales Per 1k FTE" metrics={overall_sales_per_1k_fte} />
    // <NumberCard title="Direct Sales Per 1k FTE" metrics={direct_sales_reps_per_1k_fte} />
    // <NumberCard title="Sales Support Per 1k FTE" metrics={sales_support_per_1k_fte} />
    // <NumberCard title="Accounts Per Sales Rep" metrics={accounts_per_sales_rep} />

    return (
      <div>
        {company &&
          <div className="CompanyPage">
            <h1>{company.name}</h1>
            { metricGroups }
        </div>
        }
      </div>
    )
  }
}

CompanyPage.propTypes = {
  company: PropTypes.instanceOf(Company),
}

export default CompanyPage;
