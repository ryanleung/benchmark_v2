import React, { Component, PropTypes } from 'react'
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

import Company from '../../models/Company'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    height: 175,
  }
});

function CompanyTableView(props) {
  const { classes, companies } = props

  return (
    <Table className={classes.table}>
      <TableBody>
        {companies.map(n => {
          return (
            <TableRow key={n.id} className={classes.tableRow}>
              <TableCell>
                <Avatar src={n.logo_img_url + '?size=150&format=png'} sizes={200}/>
              </TableCell>
              <TableCell>
                <div>{n.name}</div>
                <div>{`${n.url} / ${n.city}, ${n.state}`}</div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  )
}

CompanyTableView.propTypes = {
  companies: PropTypes.arrayOf(Company),
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CompanyTableView);
