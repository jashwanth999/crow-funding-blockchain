const initialState = {
  crowdFund: {},
};
export const crowdFundReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CROWDFUND_ACTION":
      return {
        ...state,
        crowdFund: action.payload,
      };
    default:
      return state;
  }
};
