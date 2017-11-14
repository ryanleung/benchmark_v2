import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  metric: {
    backgroundColor: "white",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 20,
    marginBottom: 20,
    minWidth: 200,
    flex: .25,
  },
  lockedMetric: {
    backgroundColor: "gray",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 20,
    marginBottom: 20,
    minWidth: 200,
    flex: .25,
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
    alignSelf: "flex-end"
  },
  lockedMetricText: {
    alignSelf: "flex-end",
    fontStyle: "italic",
    fontSize: 12,
  },
  cardContent: {
    padding: 12,
    flexBasis: "100%",
  },
  cardContentBottom: {
    padding: 12,
    paddingBottom: 0,
    marginBottom: "auto",
    display: "flex,"
  },
};

class NumberCard extends Component {
  render() {
    const year = new Date().getFullYear()
    const { title, metrics, locked, classes} = this.props
    if (locked) {
      return (
        <Card className={classes.lockedMetric}>
          <CardContent className={classes.cardContent}>
            <Typography type="subheading" className={classes.metricName} gutterBottom> { title } {value_description_display}</Typography>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography type="subheading" className={classes.lockedMetricText}> To get access, subscribe or contribute data. </Typography>
          </CardContent>
        </Card>
      )
    }
    const currentMetric = metrics.filter(metric => metric.year === year)[0]
    let { value, value_description, type } = currentMetric

    function abbreviateNumber(number) {
        const SI_POSTFIXES = ["", "k", "M", "B", "T"];
        const tier = Math.log10(Math.abs(number)) / 3 | 0;
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

    if (value_description == "USD") {
      value_displayed = `$${abbreviateNumber(currentMetric.value).toLocaleString()}`
    }

    return(
      <Card className={classes.metric}>
        <CardContent className={classes.cardContent}>
          <Typography type="subheading" className={classes.metricName} gutterBottom> { title } {value_description_display}</Typography>
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
