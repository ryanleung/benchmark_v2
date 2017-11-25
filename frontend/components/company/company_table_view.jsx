import React, { Component, PropTypes } from 'react'
import { withRouter } from  'react-router-dom'
import { browserHistory } from 'react-router'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table'

import Company from '../../models/Company'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    borderTop: '1px solid #E0E0E0',
    width: '100%',
    overflow: 'scroll',
    backgroundColor: "white",
  },
  tableRow: {
    height: 24,
    cursor: 'pointer',
    backgroundColor: "white",
  },
  avatarCell: {
    width: 24,
  },
  avatar: {
    height: 32,
    width: 32,
  }
});

class CompanyTableView extends Component {

  handleCompanyClick(event, company) {
    event.preventDefault();
    this.props.onClick(company)
  }

  render() {
    const { classes, companies } = this.props

    return (
      <Table className={classes.table}>
        <TableBody>
          {companies.map(n => {
            return (
              <TableRow key={n.id} onClick={event => this.handleCompanyClick(event, n)} className={classes.tableRow}>
                <TableCell className={classes.avatarCell}>
                  <Avatar src={n.logo_img_url + '?size=150&format=png'} className={classes.avatar}/>
                </TableCell>
                <TableCell>
                  <h2>{n.name}</h2>
                  <div>{`${n.url} / ${n.city}, ${n.state}`}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }
}

CompanyTableView.propTypes = {
  companies: PropTypes.arrayOf(Company),
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(CompanyTableView));
