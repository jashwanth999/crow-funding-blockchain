import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBlockchainData, loadWeb3 } from "../helpers/web3Helpers";
import { useNavigate } from "react-router";
import Card from "./Card";

export default function ProjectCard(props) {
  const crowdFund = useSelector((state) => state.crowdFund.crowdFund);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projectCount = await crowdFund.methods
          .startUpProjectsCount()
          .call();

        let data = [];

        for (let i = 1; i <= projectCount; i++) {
          const res = await crowdFund.methods.startUpProjectList(i).call();

          data.push(res);
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
        return <Card data={data} navigate={navigate} index={index} />;
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
