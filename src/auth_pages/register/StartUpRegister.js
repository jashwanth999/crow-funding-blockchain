import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadBlockchainData, loadWeb3 } from "../../helpers/web3Helpers";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import Navbar from "../Navbar";

export default function StartUpRegister() {
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "start up",
    nameOfStartup: "",
    email: "",
    password: "",
  });
  const { nameOfStartup, email, password } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadWeb3();
  }, []);
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!nameOfStartup || !email || !password)
      return alert("Please fill all details");

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      alert("please enter valid email address");
      return;
    }
    try {
      await crowdFund.methods
        .createStartUpUser(nameOfStartup, email, password)
        .send({ from: account });
      localStorage.setItem("username", nameOfStartup);
      localStorage.setItem("email", email);
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
                  STARTUP REGISTRATION
                </p>
                <div class="card-body">
                  <p class="card-title" style={{ fontSize: "16px" }}>
                    Name Of Startup
                  </p>
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    placeholder="Name Of Startup"
                    type="text"
                    name="nameOfStartup"
                    value={nameOfStartup}
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

                  <input type="file" />

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
