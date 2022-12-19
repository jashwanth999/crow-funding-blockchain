import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Navbar from "../auth_pages/Navbar";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";
import BackerNavbar from "./BackerNavbar";

export default function Funding() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "milestone",
    funds: "",
  });
  const { funds } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!funds) return alert("please fill all details");

    const backerEmail = localStorage.getItem("backerEmail");

    // console.log(backerEmail, funds);

    // const web3 = window.web3;

    // let amountToSend = await web3.utils.toWei(funds, "ether");

    // let gas = await web3.eth.estimateGas({from: account});

    try {

      
      await crowdFund.methods
        .updateFunds(Number(id), backerEmail, Number(funds))
        .send({ from: account });
      navigate("/backer-home");
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);
  return (
    <>
      <BackerNavbar />

      <div style={{ paddingTop: 50 }} className="registration_and_login">
        <center>
          <div className="register">
            <form className="register_content">
              <div class="card">
                <p
                  class="card-header"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    outline: "none",
                    textDecoration: "none",
                  }}
                >
                  Fund the Project
                </p>
                <div class="card-body">
                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Amount(in ETH)
                  </p>
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    type="text"
                    name="funds"
                    value={funds}
                    onChange={changeHandler}
                  />

                  <button
                    type="button"
                    class="btn btn-dark mt-2"
                    onClick={submitHandler}
                  >
                    submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </center>
      </div>
    </>
  );
}
