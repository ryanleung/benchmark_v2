import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), # TO ACTIVATE REDUX CHROME TOOLS
    applyMiddleware(thunk)
  )
)

export default configureStore;