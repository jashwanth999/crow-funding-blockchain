export const accountAction = (data) => {
    return {
      type: "ADD_ACCOUNT",
      payload: data,
    };
  };

export const crowdFundAction = (data) => {
  return {
    type: "CROWDFUND_ACTION",
    payload: data,
  };
};
