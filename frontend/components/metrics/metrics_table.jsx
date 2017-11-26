import React, { Component, PropTypes } from 'react'
import { withRouter } from  'react-router-dom'
import { browserHistory } from 'react-router'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'
import {getMetricString} from './metrics_cards/number'
import Company from '../../models/Company'

const styles = theme => ({
  table: {
    borderTop: '1px solid #E0E0E0',
    width: '100%',
    overflow: 'scroll',
  },
  tableMainRow: {
    height: 100,
  },
  tableRow: {
    borderBottom: [1, 'solid', 'rgba(0, 0, 0, 0.075)'],
    height: 24,
  },
  companyName: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '20%',
    cursor: 'pointer',
  },
  avatar: {
    height: 36,
    width: 36,
    marginRight: 6,
  },
  metricString: {
    fontSize: 18,
  }
});

class MetricsTable extends Component {
  handleCompanyNameClick(event, company) {
    event.preventDefault();
    this.props.onNameClick(company)
  }

  render() {
    const { classes, companies, metrics, selectedMetricGroup } = this.props
    var selectedCompanyMetrics = []
    if (metrics && Object.keys(metrics).length > 0) {
      // Loop through each company
      for (var i = 0; i < companies.length; i++) {
        var companyMetrics = metrics[companies[i].id]
        // Take the metrics selected by the buttons on explore
        var selectedMetrics = companyMetrics[selectedMetricGroup]
        if (selectedMetrics && Object.keys(selectedMetrics).length > 0) {
          selectedCompanyMetrics.push(selectedMetrics)
        }
      }
    }
    var showMetricColumns = selectedCompanyMetrics && Object.keys(selectedCompanyMetrics).length > 0
    return (
      <Table className={classes.table}>
        <TableBody>
          <TableRow key={0} className={classes.tableMainRow}>
            <TableCell>
              <h2>Name</h2>
            </TableCell>
            {showMetricColumns && selectedCompanyMetrics[0].metrics.map(n => {
              return (
                <TableCell key={n.mu_key}>
                  <h2>{n.title}</h2>
                </TableCell>
              );
            })}
          </TableRow>
          {companies.map((n, index) => {
            return (
              <TableRow key={n.id} className={classes.tableRow}>
                <TableCell className={classes.companyName} onClick={event => this.handleCompanyNameClick(event, n)}>
                  <Avatar src={n.logo_img_url + '?size=150&format=png'} className={classes.avatar}/>
                  <h2>{n.name}</h2>
                </TableCell>
                {showMetricColumns && selectedCompanyMetrics[index].metrics.map((m,mindex) => {
                  if (m && m.values && m.values.length > 0) {
                    return (
                      <TableCell key={n.id.toString()+mindex.toString()}>
                        <div className={classes.metricString}> {getMetricString(m.values)}</div>
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }
}

MetricsTable.propTypes = {
  companies: PropTypes.arrayOf(Company),
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(MetricsTable));
