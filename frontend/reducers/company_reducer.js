import {
  RECEIVE_COMPANIES,
  RECEIVE_ERRORS } from '../actions/company_actions';

const _nullCompanies = Object.freeze({
  items: [],
  errors: []
});

const CompanyReducer = (state = _nullCompanies, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_COMPANIES:
      return Object.assign({}, state, {
        items: action.items,
        errors: []
      });
    case RECEIVE_ERRORS:
      return Object.assign({}, state, {
        items: [],
        errors: action.errors
      });
    default:
      return state;
  }
};

export default CompanyReducer;
