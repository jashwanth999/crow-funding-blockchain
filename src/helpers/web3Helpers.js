import Web3 from "web3/dist/web3.min.js";
import { accountAction, crowdFundAction } from "../api/action";
import CrowdFund from "../build/contracts/CrowdFund.json";

// loading web3 and signing to window

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

// fetching metamask accounts 

export const loadBlockchainData = async (dispatch) => {
  const web3 = window.web3;
  
  // Load account

  const accounts = await web3.eth.getAccounts();

  dispatch(accountAction(accounts[0]));

  // Network ID
  const networkId = await web3.eth.net.getId();
  // Network data

  if (networkId) {
    const crowdFund = new web3.eth.Contract(
      CrowdFund.abi,
      CrowdFund.networks[networkId].address
    );
    dispatch(crowdFundAction(crowdFund));
  } else {
    alert("not deployed");
  }
};
