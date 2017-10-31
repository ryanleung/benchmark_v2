import React, { Component } from 'react'

import './metrics_cards.css'

class NumberCard extends Component {
  render() {
    const year = new Date().getFullYear()
    const { title, metrics, locked} = this.props
    if (locked) {
      return (
        <div className="Metric ">
          <div className="LockedMetric">
            <span className="LockedMetricText"> To get access, subscribe or contribute data.</span>
          </div>
          <div className='MetricName'> { title } {value_description_display}</div>
        </div>
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
      <div className="Metric">
        <div className='MetricName'> { title } {value_description_display}</div>
        <div className='MetricValue'> { value_displayed } </div>
      </div>
    )
  }
}

export default NumberCard
