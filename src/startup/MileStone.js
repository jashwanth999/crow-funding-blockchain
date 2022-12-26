import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";
import Navbar from "./Navbar";
export default function Milestone() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "milestone",
    m1: "",
    m2: "",
    m3: "",
  });
  const { m1, m2, m3 } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  // submitting milestones 

  const submitHandler = async (e) => {
    e.preventDefault();
    const date1 = new Date(m1);
    const date2 = new Date(m2);
    const date3 = new Date(m3);

    const diffTime = date2 - date1;

    const diffTime2 = date3 - date2;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));


    if (diffDays <= 0 || diffDays2 <= 0)
      return alert("Milestones are not valid");

    if (!m1 || !m3 || !m3) return alert("please fill all details");

    try {
      await crowdFund.methods
        .updateMileStone(id, m1, m2, m3)
        .send({ from: account });
      navigate("/startup-home");
    } catch (e) {}
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
                  Set Milestone
                </p>
                <div class="card-body">
                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Milestone 1
                  </p>
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    type="date"
                    name="m1"
                    value={m1}
                    onChange={changeHandler}
                  />

                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Milestone 2
                  </p>

                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    placeholder="password"
                    type="date"
                    name="m2"
                    value={m2}
                    onChange={changeHandler}
                  />

                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Milestone 3
                  </p>

                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    placeholder="password"
                    type="date"
                    name="m3"
                    value={m3}
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
