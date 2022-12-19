import React from "react";
import Navbar from "../auth_pages/Navbar";
import BackerNavbar from "./BackerNavbar";
import BackerProjectCard from "./BackerProjectCard";

export default function BackerHome() {
  const backerEmail = localStorage.getItem("backerEmail");
  return (
    <>
      <BackerNavbar />

      <div style={rootDiv}>
        <br />
        <br />
        <br />
        <div style={detailsDiv}>
          <h4>
            {" "}
            <img
              style={{ height: 35, width: 35 }}
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512/external-backer-crowdfunding-flaticons-lineal-color-flat-icons.png"
            />{" "}
            {localStorage.getItem("backerUsername")}
          </h4>
          <h4>
            {" "}
            <img
              style={{ height: 35, width: 35 }}
              src="https://img.icons8.com/doodle/512/apple-mail.png"
            />{" "}
            {backerEmail}
          </h4>
        </div>
        <br />
        <br />
        <div style={projectDiv}>
          <h2 style={{ padding: 10 }}>PROJECTS</h2>
          <BackerProjectCard cardName={"My Projects"} />
          <br />
        </div>
      </div>
    </>
  );
}

const rootDiv = {
  backgroundColor: "rgb(255, 158, 30)",
  display: "flex",
  flex: 1,
  minHeight: "100vh",
  height: "auto",
  flexDirection: "column",
  alignItems: "center",
};

const detailsDiv = {
  width: "60%",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-evenly",
  borderRadius: 5,
  marginTop: 10,
  alignItems: "center",
  padding: 10,
};

const projectDiv = {
  width: "90%",
  backgroundColor: "white",
  display: "flex",
  borderRadius: 5,
  marginBottom: 20,
  alignItems: "center",
  flexDirection: "column",
};

const mileStoneDiv = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
};
