import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadBlockchainData, loadWeb3 } from "../../helpers/web3Helpers";
import Navbar from "../Navbar";

export default function BackerRegister() {
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "backer",
    nameOfBacker: "",
    email: "",
    password: "",
    mobile: "",
  });
  const { nameOfBacker, email, password, mobile } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // backer registration method
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!nameOfBacker || !email || !password || !mobile)
      return alert("please fill all details");
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      alert("please enter valid email address");
      return;
    }
    try {
      await crowdFund.methods
        .createBacker(nameOfBacker, email, password, mobile, account)
        .send({ from: account });
      localStorage.setItem("backerUsername", nameOfBacker);
      localStorage.setItem("backerEmail", email);
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
      <Navbar />
      <div className="registration_and_login">
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
                  BACKER REGISTRATION
                </p>
                <div class="card-body">
                  <p class="card-title" style={{ fontSize: "16px" }}>
                    Name of backer
                  </p>
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    type="text"
                    name="nameOfBacker"
                    value={nameOfBacker}
                    onChange={changeHandler}
                  />
                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Email Address
                  </p>
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    type="text"
                    name="email"
                    value={email}
                    onChange={changeHandler}
                  />

                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Mobile
                  </p>
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    type="text"
                    name="mobile"
                    value={mobile}
                    onChange={changeHandler}
                  />

                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Password
                  </p>

                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    type="password"
                    name="password"
                    value={password}
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
