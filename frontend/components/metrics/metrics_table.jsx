import React, { Component, PropTypes } from 'react'
import { withRouter } from  'react-router-dom'
import { browserHistory } from 'react-router'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'

import Company from '../../models/Company'

const styles = theme => ({
  table: {
    borderTop: '1px solid #E0E0E0',
    width: '100%',
    overflow: 'scroll',
  },
  tableMainRow: {
    height: 40,
  },
  tableRow: {
    height: 24,
  },
  companyName: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 36,
    width: 36,
    marginRight: 6,
  }
});

class MetricsTable extends Component {
  render() {
    const { classes, companies } = this.props
    return (
      <Table className={classes.table}>
        <TableBody>
          <TableRow key={0} className={classes.tableMainRow}>
            <TableCell className={classes.companyName}>
              <h2>Name</h2>
            </TableCell>
            <TableCell>
              <h2>Revenue</h2>
            </TableCell>
            <TableCell>
              <h2>Revenue</h2>
            </TableCell>
            <TableCell>
              <h2>Revenue</h2>
            </TableCell>
            <TableCell>
              <h2>Revenue</h2>
            </TableCell>
            <TableCell>
              <h2>Revenue</h2>
            </TableCell>
          </TableRow>
          {companies.map(n => {
            return (
              <TableRow key={n.id} className={classes.tableRow}>
                <TableCell className={classes.companyName}>
                  <Avatar src={n.logo_img_url + '?size=150&format=png'} className={classes.avatar}/>
                  <h2>{n.name}</h2>
                </TableCell>
                <TableCell>
                  <h2>Revenue</h2>
                </TableCell>
                <TableCell>
                  <h2>Revenue</h2>
                </TableCell>
                <TableCell>
                  <h2>Revenue</h2>
                </TableCell>
                <TableCell>
                  <h2>Revenue</h2>
                </TableCell>
                <TableCell>
                  <h2>Revenue</h2>
                </TableCell>
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
