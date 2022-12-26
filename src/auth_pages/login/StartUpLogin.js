import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadBlockchainData, loadWeb3 } from "../../helpers/web3Helpers";
import Navbar from "../Navbar";

export default function StartUpLogin() {
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "start up",
    email: "",
    password: "",
  });
  const { email, password } = data;
  const web3 = window.web3;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // startup login method

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Please fill all details");

    try {
      const res = await crowdFund.methods.startupUsersList(email).call();

      console.log(res);
      if (res.password === password) {
        localStorage.setItem("username", res.username);
        localStorage.setItem("email", email);
        navigate("/startup-home");
      } else {
        return alert("wrong user credintinals or please signup");
      }
    } catch (e) {
      return alert(e.message);
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
                  STARTUP LOGIN
                </p>
                <div class="card-body">
                  <p
                    class="card-title"
                    style={{ fontSize: "16px", marginTop: "5px" }}
                  >
                    Email Address
                  </p>
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={email}
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
                    placeholder="password"
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
