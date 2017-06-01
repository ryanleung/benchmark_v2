import * as APIUtil from '../api/company_api_util'
import Company from '../models/Company'

export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES'
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"

export const fetchCompanies = industry_id => dispatch => (
  APIUtil.getCompanies(industry_id)
    .then(companies => dispatch(receiveCompanies(companies)),
      err => dispatch(receiveErrors(err.responseJSON)))
);

export const receiveCompanies = json => ({
  type: RECEIVE_COMPANIES,
  items: json.data.items.map(item => Company.from_json(item))
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});
