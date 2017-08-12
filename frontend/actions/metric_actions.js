import * as APIUtil from '../api/metric_api_util'

export const CREATE_METRIC = 'CREATE_METRIC'
export const RECEIVE_METRIC_NAMES = 'RECEIVE_METRIC_NAMES'

export const receiveMetricNames = metricNames => ({
  type: RECEIVE_METRIC_NAMES,
  metricNames
})

export const createMetric = (company_id, metric) => dispatch => (
  APIUtil.postMetric(company_id, metric)
);

export const getMetricNames = companyId => dispatch => (
  APIUtil.getMetricNames(companyId)
    .then(metricNames => dispatch(receiveMetricNames(metricNames)))
)
