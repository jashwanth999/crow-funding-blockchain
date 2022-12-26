import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { navBarMapper } from "./navBarMapper";
import { loadBlockchainData, loadWeb3 } from "./web3Helpers";

export default function Help() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const { id } = useParams();
  const [data, setData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const { username, email, message } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // sending a query to admin
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!username || !email || !message)
      return alert("Please fill all details");

    try {
      await crowdFund.methods
        .addQuery(username, email, message)
        .send({ from: account });
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
      {navBarMapper[id]}
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
                  Send Your Request
                </p>

                <div class="card-body">
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    placeholder="Enter your name"
                    type="text"
                    name="username"
                    value={username}
                    onChange={changeHandler}
                  />
                  <br />

                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    placeholder="Enter Your Email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={changeHandler}
                  />

                  <br />

                  <textarea
                    style={{ width: "100%" }}
                    class="form-control"
                    placeholder="Enter your message"
                    type="text"
                    name="message"
                    value={message}
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
const rootDiv = {
  backgroundColor: "rgb(44, 62, 80)",
  display: "flex",
  flex: 1,
  minHeight: "100vh",
  height: "auto",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 20,
};
