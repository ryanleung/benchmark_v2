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
import CompanyHeader from './company_header/company_header'

const styles = {
  container: {
    padding: [36, 135],
    width: 1000,
    margin: [0, "auto"]
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
            <div className={classes.container}>
              <CompanyHeader company={company}/>
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
