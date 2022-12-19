import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";
import Navbar from "./Navbar";

export default function CreateProject() {
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "title",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    amountToBeRaised: "",
  });
  const { title, description, startDate, endDate, amountToBeRaised } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description || !startDate || !endDate || !amountToBeRaised)
      return alert("Please fill all details");

    console.log(account);

    try {
      await crowdFund.methods
        .createStartUpProject(
          title,
          description,
          startDate,
          endDate,
          amountToBeRaised
        )
        .send({ from: account });

      navigate("/startup-home");
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
      <Navbar />
      <br />
      <div
        style={{
          backgroundColor: "orange",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          marginTop:30
        
        }}
      >
      
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
                Create New Project
              </p>
              <div class="card-body">
                <p
                  class="card-title"
                  style={{ fontSize: "16px", marginTop: "5px" }}
                >
                  Title of Project
                </p>
                <input
                  style={{ width: "100%" }}
                  class="form-control"
                  type="text"
                  name="title"
                  value={title}
                  onChange={changeHandler}
                />

                <p
                  class="card-title"
                  style={{ fontSize: "16px", marginTop: "5px" }}
                >
                  Description of the project
                </p>

                <textarea
                  style={{ width: "100%" }}
                  class="form-control"
                  name="description"
                  value={description}
                  onChange={changeHandler}
                />

                <p
                  class="card-title"
                  style={{ fontSize: "16px", marginTop: "5px" }}
                >
                  Start Date
                </p>

                <input
                  style={{ width: "100%" }}
                  class="form-control"
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={changeHandler}
                />
                <p
                  class="card-title"
                  style={{ fontSize: "16px", marginTop: "5px" }}
                >
                  End Date
                </p>

                <input
                  style={{ width: "100%" }}
                  class="form-control"
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={changeHandler}
                />

                <p
                  class="card-title"
                  style={{ fontSize: "16px", marginTop: "5px" }}
                >
                  Amount to be Raised(ETH)
                </p>

                <input
                  style={{ width: "100%" }}
                  class="form-control"
                  name="amountToBeRaised"
                  value={amountToBeRaised}
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
    
    </>
  );
}
