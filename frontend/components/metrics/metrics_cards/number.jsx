import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar'

const styles = {
  metric: {
    backgroundColor: "white",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "32%",
    marginBottom: 20,
    height: 120,
  },
  lockedMetric: {
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    width: "32%",
    height: 120,
  },
  metricName : {
    fontSize: 15,
    fontWeight: 400,
    display: "flex",
  },
  metricValue : {
    fontSize: 24,
    fontWeight: 900,
    color: "#1976D2",
    alignSelf: "flex-end",
  },
  lockedMetricText: {
    alignSelf: "flex-end",
    fontSize: 16,
    alignSelf: "flex-end",
  },
  transparent: {
    opacity: .3,
  },
  cardContentTop: {
    padding: 0,
    margin: [12, 12, 0, 12],
    flexBasis: "100%",
    height: 48,
  },
  cardContentBottom: {
    padding: 0,
    margin: [12, 12, 0, 12],
    height: 48,
  },
  lockImg: {
    paddingTop: 20,
    marginLeft: "auto",
    marginTop: "auto",
    marginRight: -8,
    height: 48,
  },
};

export function getMetricString(metricValues) {
  const year = new Date().getFullYear()
  const currentMetric = metricValues.filter(metric => metric.year === year)[0]
  let { value, value_description, type } = currentMetric

  function sigFigs(n, sig) {
    var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
    return Math.round(n * mult) / mult;
  }
  function abbreviateNumber(number) {
      const SI_POSTFIXES = ["", "k", "M", "B", "T"];
      const tier = Math.log10(Math.abs(number)) / 3 | 0;
      number = sigFigs(number, 2)
      if(tier <= 1) return number;

      const suffix = SI_POSTFIXES[tier];
      const scale = Math.pow(10, tier * 3);
      let formatted = (number / scale).toFixed(2) + '';

      if (/\.00$/.test(formatted))
        formatted = formatted.substr(0, formatted.length - 3);

      return formatted + suffix;
  }

  const value_description_display = (function(value_desc) {
    switch(value_desc) {
      case 'Quantity':
        return null
      default:
        return `(${value_description})`
    }
  })(value_description)
  var value_displayed = value.toLocaleString()

  value_displayed = `${abbreviateNumber(currentMetric.value).toLocaleString()}`
  if (value_description == "USD") {
    value_displayed = `$${value_displayed}`
  }
  return value_displayed
}

class NumberCard extends Component {
  render() {
    const { title, metrics, locked, classes} = this.props
    if (locked) {
      return (
        <Card className={classes.lockedMetric}>
          <CardContent className={classes.cardContentTop}>
            <Typography type="subheading" className={[classes.metricName, classes.transparent].join(' ')} gutterBottom> { title } {value_description_display}</Typography>
          </CardContent>
          <CardContent className={classes.cardContentBottom}>
            <Typography type="subheading" className={classes.lockedMetricText}> Contact sales to get access</Typography>
          </CardContent>
          <div className={classes.lockImg}>
            <img src="https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_network_locked_black_48px.svg"/>
          </div>
        </Card>
      )
    }
    var value_displayed = getMetricString(metrics)
    return(
      <Card className={classes.metric}>
        <CardContent className={classes.cardContentTop}>
          <Typography type="subheading" className={classes.metricName} gutterBottom> { title } </Typography>
        </CardContent>
        <CardContent className={classes.cardContentBottom}>
          <Typography type="subheading" className={classes.metricValue}> { value_displayed } </Typography>
        </CardContent>
      </Card>
    )
  }
}
NumberCard.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(NumberCard);
