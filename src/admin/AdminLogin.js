import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../auth_pages/Navbar";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "start up",
    email: "",
    password: "",
  });
  const { email, password } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // admin login not integrated with solidity
  
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Please fill all details");

    try {
      if (email === "admin@gmail.com" && password === "admin123") {
        navigate("/admin");
      } else return alert("wrong credentials");
    } catch (e) {
      return alert(e.message);
    }
  };

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
                  Admin Login
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
