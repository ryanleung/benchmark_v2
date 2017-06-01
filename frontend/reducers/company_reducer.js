import {
  RECEIVE_COMPANIES,
  RECEIVE_COMPANY,
  RECEIVE_ERRORS } from '../actions/company_actions';

const _nullCompanies = Object.freeze({
  items: [],
  errors: []
});

export const CompanyListReducer = (state = _nullCompanies, action) => {
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

const _nullCompany = Object.freeze({
  company: null,
  errors: []
})

export const ViewingCompanyReducer = (state = _nullCompany, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_COMPANY:
      return Object.assign({}, state, {
        company: action.company,
        errors: []
      });
    case RECEIVE_ERRORS:
      return Object.assign({}, _nullCompany, {
        errors
      });
    default:
      return state;
  }
};
