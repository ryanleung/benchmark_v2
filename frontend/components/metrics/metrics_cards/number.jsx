import React, { Component } from 'react'

import './metrics_cards.css'

class NumberCard extends Component {
  render() {
    const year = new Date().getFullYear()
    const { title, metrics } = this.props
    const currentMetric = metrics.filter(metric => metric.year === year)[0]
    let { value, value_description, type } = currentMetric
    value = Math.round(value).toLocaleString(undefined)
    let currency = "";

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

    const value_description_display = `(${value_description})`

    if (value_description == "USD") {
      value = `$${abbreviateNumber(currentMetric.value)}`
    }

    return(
      <div className="card">
        <h3>{ title } {value_description_display}</h3>
        <h4>{ value }</h4>
      </div>
    )
  }
}

export default NumberCard
