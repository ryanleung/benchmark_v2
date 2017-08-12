import { connect } from 'react-redux';
import AddMetricForm from './add_metric_form';
import { getMetricNames, createMetrics } from '../../../actions/metric_actions'

const mapStateToProps = (state, ownProps) => ({
  metricNames: state.metricNames
});

const mapDispatchToProps = dispatch => ({
  getMetricNames: companyId => dispatch(getMetricNames(companyId)),
  createMetrics: (companyId, metrics) => dispatch(createMetrics(companyId, metrics))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMetricForm);
