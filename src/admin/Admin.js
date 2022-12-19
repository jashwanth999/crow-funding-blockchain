import React from "react";
import Navbar from "../auth_pages/Navbar";
import ProjectCard from "../startup/ProjectCard";
import AdminProjectCard from "./AdminProjectCard";

export default function Admin() {
  return (
    <>
      <Navbar />

      <div style={rootDiv}>
        <div style={projectDiv}>
          <h2 style={{ padding: 10 }}>PROJECTS</h2>

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

          <AdminProjectCard />
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
  paddingTop: 20,
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
