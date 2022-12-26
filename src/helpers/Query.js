import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../admin/AdminNavbar";
import { loadBlockchainData, loadWeb3 } from "./web3Helpers";
export default function Query() {
  const dispatch = useDispatch();

  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);

  const [queries, setQueries] = useState([]);

  useEffect(() => {
    loadWeb3();
  }, []);
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);

  // fetching all queries

  useEffect(() => {
    async function fectchQueries() {
      const queryCount = await crowdFund.methods.getQueryCount().call();
      let allQueries = [];

      console.log(queryCount);

      for (let i = 1; i <= queryCount; i++) {
        const res = await crowdFund.methods.queryList(i).call();
        allQueries.push(res);
      }

      setQueries(allQueries);
    }

    fectchQueries();
  }, [crowdFund]);

  return (
    <>
      <AdminNavbar />
      <div style={rootDiv}>
        <div style={projectDiv}>
          <h3 style={{ color: "white", textAlign: "center" }}> ALL QUERIES </h3>
          <div
            style={{ width: "100%", backgroundColor: "grey", height: 1 }}
          ></div>
          <br />
          {queries.map((data, index) => {
            return (
              <div key={index}>
                <p style={{ color: "white" }}>
                  <span style={{ fontWeight: "bold" }}> Username </span>:{" "}
                  {data.username}
                </p>
                <p style={{ color: "white" }}>
                  <span style={{ fontWeight: "bold" }}> Email </span>:{" "}
                  {data.email}
                </p>
                <p style={{ color: "white" }}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}> message </span>:{" "}
                  {data.message}
                </p>
                <div
                  style={{ width: "100%", backgroundColor: "grey", height: 1 }}
                ></div>
              </div>
            );
          })}
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
  width: "70%",
  display: "flex",
  borderRadius: 5,
  marginBottom: 20,
  flexDirection: "column",
  backgroundColor: "rgb(40, 55, 71)",
  padding: 10,
};
