import {combineReducers} from 'redux';

import { CompanyListReducer, ViewingCompanyReducer } from './company_reducer';
import SessionReducer from './session_reducer';

const RootReducer = combineReducers({
  companies: CompanyListReducer,
  viewingCompany: ViewingCompanyReducer,
  session: SessionReducer
});

export default RootReducer;
