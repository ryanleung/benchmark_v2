import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Company from '../../../models/Company'


const styles = {
  industries: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
  },
  industryLabel: {
    textAlign: "center",
    justifyContent: "center",
    margin: [0, 20]
  },
  labelBox: {
    padding: 4,
    width: 100,
    backgroundColor: "lightgray",
    border: [1, "solid", "#000"],
    borderRadius: 5,
  }
};

class CompanyIndustries extends Component {
  render() {
    const { classes, company } = this.props

    return (
      <div className={classes.industries}>
        <div className={classes.industryLabel}>
          <div className={classes.labelBox}>
            Technology
          </div>
        </div>
        <div className={classes.industryLabel}>
          <div className={classes.labelBox}>
            SaaS
          </div>
        </div>
        <div className={classes.industryLabel}>
          <div className={classes.labelBox}>
            {company.industry.name}
          </div>
        </div>
      </div>
    )
  }
}

CompanyIndustries.propTypes = {
  company: PropTypes.instanceOf(Company),
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CompanyIndustries);
