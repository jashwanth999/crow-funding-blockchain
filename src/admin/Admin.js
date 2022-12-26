import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminProjectCard from "./AdminProjectCard";

export default function Admin() {

  return (
    <>
      <AdminNavbar />

      <div style={rootDiv}>
        <div style={projectDiv}>
          <h2 style={{ padding: 10, color: "white" }}>PROJECTS</h2>

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

          <AdminProjectCard />
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
  backgroundColor: "rgb(40, 55, 71)",
};

const mileStoneDiv = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
};
