import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import { getCompanyPageLink } from '../../utils/link_helpers'

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
        this.setState({metrics_dashboard: response.data.metrics_dashboard})
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
    let metricGroups;

    if (metrics) {
      metricGroups = metrics.map((metric, idx) => {
        return <MetricGroup key={idx}
                            title={metric.group}
                            metrics={metric.metrics}
                            company={company}/>
      })
    }

    return (
      <div>
        {company &&
          <div className="CompanyPage">
            <div className="CompanyPageTop">
              <div className="CompanyAvatar">
                <Avatar src={company.logo_img_url} size={72}/>
              </div>
            </div>
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
