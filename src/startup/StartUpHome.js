import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

export default function StartUpHome() {
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  // auto navigate to home if email not there in local storage

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);
  return (
    <>
      <Navbar />

      <div style={rootDiv}>
        <br />
        <br />
        <br />
        <div style={detailsDiv}>
          <h4 style={{ color: "white" }}>
            {" "}
            <img
              style={{ height: 35, width: 35 }}
              src="https://img.icons8.com/office/512/rocket.png"
            />{" "}
            {localStorage.getItem("username")}
          </h4>
          <h4 style={{ color: "white" }}>
            {" "}
            <img
              style={{ height: 35, width: 35 }}
              src="https://img.icons8.com/doodle/512/apple-mail.png"
            />{" "}
            {email}
          </h4>
        </div>
        <br />
        <br />
        <div style={projectDiv}>
          <h2 style={{ padding: 10, color: "white" }}>MY PROJECTS</h2>

          <div style={mileStoneDiv}>
            <span
              style={{
                backgroundColor: "rgb(231, 76, 60)",
                padding: 2,
                width: "30%",
                display: "flex",
                justifyContent: "center",
                color: "white",
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              {" "}
              Milestone not set{" "}
            </span>
            <span
              style={{
                backgroundColor: "rgb(34, 153, 84)",
                padding: 2,
                width: "30%",
                display: "flex",
                justifyContent: "center",
                color: "white",
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              {" "}
              Milestone set but not yet approved{" "}
            </span>
            <span
              style={{
                backgroundColor: "rgb(46, 134, 193)",
                padding: 2,
                width: "30%",
                display: "flex",
                justifyContent: "center",
                color: "white",
                borderRadius: 2,
                fontWeight: "bold",
              }}
            >
              {" "}
              Project approved{" "}
            </span>
          </div>
          <br />

          <ProjectCard cardName={"My Projects"} />
          <br />
        </div>
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
};

const detailsDiv = {
  width: "60%",
  display: "flex",
  justifyContent: "space-evenly",
  borderRadius: 5,
  marginTop: 10,
  alignItems: "center",
  padding: 10,
  backgroundColor: "rgba(33, 47, 61,1)",
};

const projectDiv = {
  width: "90%",
  display: "flex",
  borderRadius: 5,
  marginBottom: 20,
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "rgba(33, 47, 61,1)",
};

const mileStoneDiv = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
};
