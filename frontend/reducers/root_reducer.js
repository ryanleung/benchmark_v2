import {combineReducers} from 'redux';

import CompanyReducer from './company_reducer';
import SessionReducer from './session_reducer';

const RootReducer = combineReducers({
  companies: CompanyReducer,
  session: SessionReducer
});

export default RootReducer;
