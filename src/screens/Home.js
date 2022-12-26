import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../auth_pages/Navbar";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";


// starting page

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    loadWeb3();
  }, [window.ethereum]);
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch, window.ethereum]);
  return (
    <>
      <Navbar />
      <div className="starting__page">
        <center>
          <div className="cursive">
            <a>Blockchin Based Crowdfunding</a>
          </div>
        </center>
      </div>
    </>
  );
};

export default Home;
