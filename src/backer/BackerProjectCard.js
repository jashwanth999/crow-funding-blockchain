import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";
import { useNavigate } from "react-router";
import BackerCard from "./BackerCard";

export default function BackerProjectCard(props) {
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const backerEmail = localStorage.getItem("backerEmail");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectCount = await crowdFund.methods
          .startUpProjectsCount()
          .call();

        let data = [];

        for (let i = 1; i <= projectCount; i++) {
          const res = await crowdFund.methods.startUpProjectList(i).call();

          const myFunds = await crowdFund.methods
            .getMyFunds(backerEmail, i)
            .call();

          const res2 = await crowdFund.methods.startUpProjectList2(i).call();

          data.push({
            ...res,
            myFunds: myFunds,
            adminApproveStage: res2.adminApproveStage,
            amountRecieved: res2.amountRecieved,
          });
        }

        setProjects(data);
      } catch (e) {}
    }
    fetchProjects();
  }, [crowdFund, backerEmail]);

  useEffect(() => {
    loadWeb3();
  }, []);
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);

  return (
    <div style={projectsCardDiv}>
      {projects.map((data, index) => {
        return <BackerCard data={data} navigate={navigate} index={index} />;
      })}
    </div>
  );
}
const projectsCardDiv = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  height: "auto",
};
