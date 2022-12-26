import { Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";
import BackerNavbar from "./BackerNavbar";

export default function Funding() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);

  const [checked, setChecked] = useState(false);

  const [TCdata, setTCdata] = useState("");
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

    if (!checked) return alert("Please agree to the terms");

    const backerEmail = localStorage.getItem("backerEmail");

    // console.log(backerEmail, funds);

    const web3 = window.web3;

    const res = await crowdFund.methods.startUpProjectList(id).call();

    let amountReq = Number(web3.utils.fromWei(res.amountToBeRaised,'ether'));

    let amountRaised = Number(web3.utils.fromWei(res.amountRaised,'ether'));

    console.log(amountReq, amountRaised);

    let finalAmount = funds;
    if (Number(funds) >= amountReq - amountRaised) {
      finalAmount = (amountReq - amountRaised).toString();
    }


    // console.log(finalAmount);

    let amountToSend = await web3.utils.toWei(finalAmount, "ether");

    // let gas = await web3.eth.estimateGas({ from: account });

    try {
      await crowdFund.methods
        .updateFunds(Number(id), backerEmail, amountToSend)
        .send({
          from: account,
          value: amountToSend,
          // gas: gas,
        });
      navigate("/backer-home");
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    async function fetchProjects() {
      const res = await crowdFund.methods.startUpProjectList2(id).call();

      setTCdata(res.termsAndCondition);
    }
    fetchProjects();
  }, []);

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
                  <br />

                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Terms and Conditions
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      onClick={() => setChecked(!checked)}
                      checked={checked}
                    />

                    <p
                      class="card-title"
                      style={{ fontSize: "16px", marginTop: "5px" }}
                    >
                      {TCdata}
                    </p>
                  </div>

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
