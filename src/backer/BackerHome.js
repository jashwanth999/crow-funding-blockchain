import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import BackerNavbar from "./BackerNavbar";
import BackerProjectCard from "./BackerProjectCard";

export default function BackerHome() {
  const backerEmail = localStorage.getItem("backerEmail");

  const navigate = useNavigate();

  useEffect(() => {
    if (!backerEmail) {
      navigate("/");
    }
  }, [backerEmail]);
  return (
    <>
      <BackerNavbar />

      <div style={rootDiv}>
        <br />
        <br />
        <br />
        <div style={detailsDiv}>
          <h4 style={{ color: "white" }}>
            {" "}
            <img
              style={{ height: 35, width: 35 }}
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512/external-backer-crowdfunding-flaticons-lineal-color-flat-icons.png"
            />{" "}
            {localStorage.getItem("backerUsername")}
          </h4>
          <h4 style={{ color: "white" }}>
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
          <BackerProjectCard cardName={"My Projects"} />
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
