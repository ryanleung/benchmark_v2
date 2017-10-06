import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import { getCompanyPageLink } from '../../utils/link_helpers'
import { withStyles } from 'material-ui/styles';

import * as APIUtil from '../../api/metric_api_util'
import Company from '../../models/Company'
import MetricGroup from '../metrics/metric_group'

import './company_page.css'

const styles = {
  bigAvatar: {
    width: 72,
    height: 72,
  },
};

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

    const { classes, company } = this.props
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
              <Avatar className={classes.bigAvatar} src={company.logo_img_url}/>
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
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CompanyPage);
