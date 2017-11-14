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
import * as APIUtil from '../../api/metric_api_util'
import Company from '../../models/Company'
import MetricGroup from '../metrics/metric_group'

import './company_page.css'

const styles = {
  bigAvatar: {
    width: 100,
    height: 100,
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    height: 156,
  },
  maintitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  metadataText: {
    fontSize: 14,
  },
  container: {
    padding: 36,
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  companyInfo: {
    width: 280,
  },
  titleDivide: {
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    height: 32,
    width: 1,
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
            <div className={classes.container}>
              <div className={classes.heading}>
                <div className={classes.companyInfo}>
                  <div className={classes.title}>
                    <Typography className={classes.maintitle} type="title" color="inherit" gutterBottom>
                      {company.name}
                    </Typography>
                    <div className={classes.titleDivide}>
                    </div>
                    <div className={classes.metadata}>
                      <Typography className={classes.metadataText} type="title" color="inherit" gutterBottom>
                        {company.city}, {company.state}
                      </Typography>
                      <Typography className={classes.metadataText} type="title" color="inherit" gutterBottom>
                        {company.industry.name}
                      </Typography>
                    </div>
                  </div>
                  <Avatar className={classes.bigAvatar} src={company.logo_img_url}/>
                </div>
              <div className={classes.addMetric}>
                Know this company?
                Submit a metric and get free credit.
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
