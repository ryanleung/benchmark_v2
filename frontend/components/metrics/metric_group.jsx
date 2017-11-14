import Divider from 'material-ui/Divider';
import React, { Component } from 'react'
import NumberCard from './metrics_cards/number'
import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';


const styles = {
  metrics: {
    display: "flex",
  },
};

class MetricGroup extends Component {
  render() {
    const { title, metrics, company, classes} = this.props

    const metricCards = metrics.map((metric, idx) => {
      if (metric && metric.values && metric.values.length > 0) {
        return <NumberCard key={idx}
                           title={metric.title}
                           locked={metric.locked}
                           metrics={metric.values} />
      }
    })

    return(
      <div>
        <div className='spacer' />
        <div className='spacer' />
        <Typography type="title" color="inherit" gutterBottom>
          { title }
        </Typography>
        <div className='spacer' />
        <div className={classes.metrics}>
          { metricCards }
        </div>
        <div className='spacer' />
        <Divider />
      </div>
    )
  }
}

MetricGroup.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(MetricGroup);
