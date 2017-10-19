import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import { getCompanyPageLink } from '../../utils/link_helpers'
import { withStyles } from 'material-ui/styles';
import AddMetricForm from '../metrics/add_form/add_metric_form'
import * as APIUtil from '../../api/metric_api_util'
import Company from '../../models/Company'
import MetricGroup from '../metrics/metric_group'

import './company_page.css'

const styles = {
  bigAvatar: {
    width: 72,
    height: 72,
  },
  addMetric: {
  },
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
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
            <div className={classes.heading}>
              <Avatar className={classes.bigAvatar} src={company.logo_img_url}/>
              <div className={classes.addMetric}>
                <Typography type="subheading" gutterBottom align="center">
                  Know this company?
                </Typography>
                <AddMetricForm industryid={company.industry.id}
                               companyid={company.id}/>
                <Typography type="subheading" gutterTop align="center">
                  and get free credit!
                </Typography>
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
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CompanyPage);
