import { createStore, combineReducers } from "redux";
import { accountReducer } from "../reducers/addAccountReducer";
import { crowdFundReducer } from "../reducers/crowFundReducer";

const combined = combineReducers({
  crowdFund: crowdFundReducer,
  account: accountReducer,
});
export const store = createStore(combined);
