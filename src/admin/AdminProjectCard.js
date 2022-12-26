import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";
import { useNavigate } from "react-router";
import AdminCard from "./AdminCard";

export default function AdminProjectCard() {
  const account = useSelector((state) => state.account.account);
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const approveProject = async (id) => {
    try {
      await crowdFund.methods.approveProject(id + 1).send({ from: account });
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }
  };

  const rejectProject = async (id) => {
    try {
      await crowdFund.methods
        .rejectProject(id + 1)
        .send({ from: account, value: 0 });
    } catch (e) {
      alert(e.message);
    }
  };

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
          });
        }

        setProjects(data);
      } catch (e) {}
    }
    fetchProjects();
  }, [crowdFund]);

  useEffect(() => {
    loadWeb3();
  }, []);
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);

  return (
    <div style={projectsCardDiv}>
      {projects.map((data, index) => {
        return (
          <AdminCard
            data={data}
            navigate={navigate}
            approveProject={approveProject}
            index={index}
            rejectProject={rejectProject}
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
