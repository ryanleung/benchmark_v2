import {combineReducers} from 'redux';

import { CompanyListReducer, ViewingCompanyReducer } from './company_reducer';
import SessionReducer from './session_reducer';
import MetricReducer from './metric_reducer'

export default combineReducers({
  companies: CompanyListReducer,
  viewingCompany: ViewingCompanyReducer,
  session: SessionReducer,
  metricNames: MetricReducer
});
