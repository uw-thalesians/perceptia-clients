import {combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import {reducer as dataReducer} from './data/reducer';
import { reducer as servicesReducer } from './services/reducer';

const appReducer = combineReducers({
  data: dataReducer,
  services: servicesReducer,
});


const store = createStore(appReducer, composeWithDevTools());

export default store;