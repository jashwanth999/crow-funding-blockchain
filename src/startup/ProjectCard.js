import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";
import { useNavigate } from "react-router";
import Card from "./Card";

export default function ProjectCard(props) {
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  // const [isFlipped, setIsFlipped] = useState(false);

  // for abort the project

  const abortProject = async (id) => {
    try {
      console.log(id);
      let adminApproveStage = projects[id].adminApproveStage;

      let amount = adminApproveStage > 0 ? projects[id].amountRecieved : 0;

      await crowdFund.methods
        .rejectProject(id + 1)
        .send({ from: account, value: amount });
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }
  };

  // after full amount raised , user can change the stage below function called

  const changeStage = async (id) => {
    try {
      let adminApproveStage = projects[id].adminApproveStage;

      let stage = projects[id].stage;
      console.log(adminApproveStage, stage);

      if (Math.abs(adminApproveStage - stage) !== 1)
        return alert("Admin has not approved your current stage");

      await crowdFund.methods.changeStage(id + 1).send({ from: account });
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }
  };

  // fetching all projects

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectCount = await crowdFund.methods
          .startUpProjectsCount()
          .call();

        let data = [];

        for (let i = 1; i <= projectCount; i++) {
          const res = await crowdFund.methods.startUpProjectList(i).call();

          const res2 = await crowdFund.methods.startUpProjectList2(i).call();

          data.push({
            ...res,
            fileUrl: res2.fileUrl,
            stage: res2.stage,
            adminApproveStage: res2.adminApproveStage,
            amountRecieved: res2.amountRecieved,
            projectAddress:res2.projectAddress
          });
        }

        setProjects(data);
      } catch (e) {}
    }
    fetchProjects();
  }, [crowdFund]);

  // loading web3

  useEffect(() => {
    loadWeb3();
  }, []);

  // loading blockchain data
  
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);

  console.log(projects);

  return (
    <div style={projectsCardDiv}>
      {projects.map((data, index) => {
        return (
          <Card
            data={data}
            navigate={navigate}
            index={index}
            abortProject={abortProject}
            changeStage={changeStage}
            account={account}
          />
        );
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
