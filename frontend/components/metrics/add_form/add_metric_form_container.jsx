import { connect } from 'react-redux';
import AddMetricForm from './add_metric_form';
import { getMetricNames } from '../../../actions/metric_actions'

const mapStateToProps = (state, ownProps) => ({
  metricNames: state.metricNames
});

const mapDispatchToProps = dispatch => ({
  getMetricNames: companyId => dispatch(getMetricNames(companyId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMetricForm);
