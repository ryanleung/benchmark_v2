import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Company from '../../../models/Company'
import CompanyIndustries from './company_industries'

const styles = {
  header: {
    display: "flex",
    height: 120,
    marginBottom: 20,
  },
  logo: {
    width: "10%",
    height: "100%",
  },
  info: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
  },
  textContainer: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
  },
  industries: {
    width: "30%",
  },
};

class CompanyHeader extends Component {
  render() {
    const { classes, company } = this.props

    return (
      <div className={classes.header}>
        <Avatar className={classes.logo} src={company.logo_img_url}/>
        <div className={classes.info}>
          <div className={classes.textContainer}>
            <Typography className={classes.nameText} type="title" color="inherit">
              {company.name}
            </Typography>
            {company.city &&
              <Typography className={classes.locationText} type="subheading" color="inherit">
                {company.city}, {company.state}
              </Typography>
            }
          </div>
          <div className={classes.textContainer}>
          </div>
          <CompanyIndustries company={company}/>
        </div>
      </div>
  )
  }
}

CompanyHeader.propTypes = {
  company: PropTypes.instanceOf(Company),
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CompanyHeader);
