class Metric {
  constructor(id, name, type, value, value_description, geo, function_name, business_unit) {
    this.id = id
    this.name = name
    this.type = type
    this.value = value
    this.value_description = value_description
    this.geo = geo
    this.function_name = function_name
    this.business_unit = business_unit
  }

  static from_json(json) {
    var metric = new Metric()
    metric.id = json.id
    metric.name = json.metric_name.name
    metric.type = json.metric_type.name
    metric.value = json.value
    metric.value_description = json.value_description
    metric.geo = json.geo
    metric.function_name = json.function.name
    metric.business_unit = json.business_unit.name
    return metric
  }

  to_json() {
    return {
        id: this.id,
        name: this.name,
        type: this.type,
        value: this.value,
        value_description: this.value_description,
        geo: this.geo,
        function_name: this.function_name,
        business_unit: this.business_unit
    }
  }
}

export default Metric;