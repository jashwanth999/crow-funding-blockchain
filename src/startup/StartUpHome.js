import React from "react";
import ProjectCard from "./ProjectCard";
import Navbar from "./Navbar";

export default function StartUpHome() {
  const email = localStorage.getItem("email");
  return (
    <>
      <Navbar />

      <div style={rootDiv}>
        <br />
        <br />
        <br />
        <div style={detailsDiv}>
          <h4>
            {" "}
            <img
              style={{ height: 35, width: 35 }}
              src="https://img.icons8.com/office/512/rocket.png"
            />{" "}
            {localStorage.getItem("username")}
          </h4>
          <h4>
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
          <h2 style={{ padding: 10 }}>MY PROJECTS</h2>

          <div style={mileStoneDiv}>
            <span
              style={{
                backgroundColor: "red",
                padding: 2,
                width: "30%",
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              {" "}
              Milestone not set{" "}
            </span>
            <span
              style={{
                backgroundColor: "green",
                padding: 2,
                width: "30%",
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              {" "}
              Milestone set not yet approved{" "}
            </span>
            <span
              style={{
                backgroundColor: "blue",
                padding: 2,
                width: "30%",
                display: "flex",
                justifyContent: "center",
                color: "white",
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
