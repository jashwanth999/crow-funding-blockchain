import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadBlockchainData, loadWeb3 } from "../../helpers/web3Helpers";
import { storage } from "../../api/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Navbar from "../Navbar";
import { Box, Button, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
      <Box sx={{ width: "80%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function StartUpRegister() {
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState("");
  const [progress, setProgresspercent] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "start up",
    nameOfStartup: "",
    email: "",
    password: "",
    mobile: "",
  });
  const { nameOfStartup, email, password, mobile } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    loadWeb3();
  }, []);
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);

  // Start up registration method

  const submitHandler = async (e) => {
    e.preventDefault();

    // console.log(fileUrl); || !fileUrl

    if (mobile.length !== 10) return alert("Please enter valid mobile number");

    if (!nameOfStartup || !email || !password || !mobile || !fileUrl)
      return alert("Please fill all details");

    if (mobile.length !== 10) return alert("Please enter valid mobile number");

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      alert("please enter valid email address");
      return;
    }
    try {
      await crowdFund.methods
        .createStartUpUser(
          nameOfStartup,
          email,
          password,
          mobile,
          fileUrl,
          account
        )
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
                    Mobile
                  </p>
                  <input
                    style={{ width: "100%" }}
                    class="form-control"
                    placeholder="Mobile"
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
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={changeHandler}
                  />

                  <input
                    type="file"
                    accept=".doc,.docx,.xml,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <LinearProgressWithLabel value={progress} />
                    <Button
                      style={{ display: "flex", flex: 0.3 }}
                      onClick={handleSubmit}
                      variant="contained"
                    >
                      {" "}
                      Upload
                    </Button>
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
