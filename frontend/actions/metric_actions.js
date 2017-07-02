import * as APIUtil from '../api/metric_api_util'

export const CREATE_METRIC = 'CREATE_METRIC'

export const createMetric = metric => dispatch => (
  APIUtil.postMetric(metric);
);