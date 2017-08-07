import { RECEIVE_METRIC_NAMES } from '../actions/metric_actions';

const MetricReducer = (oldState = null, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_METRIC_NAMES:
      return Object.assign({}, oldState, action.metricNames);
    default:
      return oldState;
  };
};

export default MetricReducer;
