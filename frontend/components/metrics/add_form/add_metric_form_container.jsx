import { connect } from 'react-redux';
import AddMetricForm from './add_metric_form';
import { getMetricNames, postMetric } from '../../../actions/metric_actions'

const mapStateToProps = (state, ownProps) => ({
  metricNames: state.metricNames
});

const mapDispatchToProps = dispatch => ({
  getMetricNames: companyId => dispatch(getMetricNames(companyId)),
  postMetric: (companyId, metric) => dispatch(postMetric(companyId, metric))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMetricForm);
