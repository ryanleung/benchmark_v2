import Divider from 'material-ui/Divider';
import React, { Component } from 'react'
import NumberCard from './metrics_cards/number'
import { Link } from 'react-router-dom'
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';


const styles = {
  metrics: {
    width: "100%",
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  emptyDiv: {
    width: "32%"
  }
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
    var emptyDivs = []
    var fillThree = metricCards.length % 3
    if (fillThree) {
      for (var i = 0; i < fillThree; i++) {
        const emptyDiv = (
          <div key={i} className={classes.emptyDiv}/>
        );
        emptyDivs.push(emptyDiv)
      }
    }

    return(
      <div>
        <div className='spacer' />
        <Divider />
        <div className='spacer' />
        <div className='spacer' />
        <Typography type="title" color="inherit" gutterBottom>
          { title }
        </Typography>
        <div className='spacer' />
        <div className={classes.metrics}>
          { metricCards }
          { emptyDivs }
        </div>
        <div className='spacer' />
      </div>
    )
  }
}

MetricGroup.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(MetricGroup);
