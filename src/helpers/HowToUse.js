import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import Navbar from "../startup/Navbar";
import { navBarMapper } from "./navBarMapper";

export default function HowToUse() {
  const { id } = useParams();
  return (
    <>
      {navBarMapper[id]}
      <div style={rootDiv}>
        <div style={projectDiv}>
          <h3 style={{ color: "white" }}> Start up</h3>
          <Typography style={{ color: "white", fontSize: 16 }}>
            <span style={span}>
              1. Import a new account form Ganache to the Metamask extension.
            </span>
            <br />
            <span style={span}>
              2.Select an unused account from Metamask. <br />{" "}
            </span>{" "}
            <span style={span}>3. Go to the Register Startup Page.</span> <br />{" "}
            <span style={span}> 4. Fill in all the details properly.</span>{" "}
            <br />
            <span style={span}>5. Login as Startup.</span> <br />
            <span style={span}>
              6. You will be redirected to the Home Page on successfull Login.
            </span>{" "}
            <br />{" "}
            <span style={span}>
              {" "}
              7. You can now create new projects and wait for their approval.{" "}
              <br />
            </span>{" "}
            <span style={span}>
              {" "}
              8. You will also have to set the milestones for your project to be
              approved.
            </span>{" "}
            <br />
            <span style={span}>
              9. Wait for the project to arrive to the APPROVED stage.
            </span>{" "}
            <br />
            <span style={span}>
              10. Once in APPROVED stage, you will be eligible to be funded by
              the Backers.{" "}
            </span>{" "}
            <br />
            <span style={span}>
              11. Once your funding requirement is met you can start working on
              the milestones that you have set.
            </span>{" "}
            <br />{" "}
            <span style={span}>
              12. On successfull completion, you should change the state of your
              project and wait for approval ie. change to either of
              (STAGE1,STAGE2, STAGE3) .
            </span>{" "}
            <br />
            <span style={span}>
              13. Once the states are approved by the admin ie. either of
              (APPROVED_STAGE 1, APPROVED_STAGE2, COMPLETED), you should check
              your account balance.
            </span>{" "}
            <br />
            <span style={span}>
              {" "}
              14. You will receive 1/3rd of the total amount that was raised for
              your project on each successfull milestone completion.{" "}
            </span>
            <br />
            <span style={span}>
              15. At any stage you can abort the project.
            </span>{" "}
            <br />{" "}
            <span style={span}>
              {" "}
              16. The aborted projects will not be visible to you anymore.
            </span>{" "}
            <br />
            <span style={span}>
              {" "}
              17. If you abort the project, then you will not be eligible to
              receive the remaining
            </span>
          </Typography>
        </div>
        <br />

        <div style={projectDiv}>
          <h3 style={{ color: "white" }}> Backer</h3>
          <Typography style={{ color: "white", fontSize: 16 }}>
            <span style={span}>
              1. Import a new account form Ganache to the Metamask extension.
            </span>
            <br />
            <span style={span}>
              2.Select an unused account from Metamask. <br />{" "}
            </span>{" "}
            <span style={span}>3. Go to the Register Startup Page.</span> <br />{" "}
            <span style={span}> 4. Fill in all the details properly.</span>{" "}
            <br />
            <span style={span}>5. Login as Backer.</span> <br />
            <span style={span}>
              6. You will be redirected to the Home Page on successfull Login.
            </span>{" "}
            <br />{" "}
            <span style={span}>
              {" "}
              7. You can view all the APPROVED projects on this platform.
              <br />
            </span>{" "}
            <span style={span}>
              {" "}
              8. You can fund the APPROVED projects as many times you want until
              their requirement is met.
            </span>{" "}
            <br />
            <span style={span}>
              9. You will be able to see how much amount you have funded to a
              particular project.
            </span>{" "}
            <br />
            <span style={span}>
              10. On funding, the entire amount is stored in the smart contract.
            </span>{" "}
            <br />
            <span style={span}>
              11. On each successfull completion of the milestone of project
              1/3rd of the total amount raised will be transferred tot the
              Startup's account.
            </span>{" "}
            <br />{" "}
            <span style={span}>
              12. You can track the progress of the project by looking at their
              states.
            </span>{" "}
            <br />
            <span style={span}>
              13. If at any time the project is aborted following cases come
              into the picture:
              <ul style={{ marginLeft: 20 }}>
                <li>
                  If it was in APPROVED or STAGE1 state, the whole amount that
                  you funded will be refunded to you immediately.
                </li>

                <li>
                  If it was in APPROVED_STAGE1 or STAGE2, then 2/3rd of the
                  amount that you funded will be refunded to you immediately.
                </li>

                <li>
                  If it was in APPROVED_STAGE2 or STAGES then 2/3rd of the
                  amount that you funded will be refunded to you immediately.
                </li>
              </ul>
            </span>
            <span style={{ fontSize: 14.5 }}>
              {" "}
              14. The aborted projects will not be visible to you anymore.
            </span>
            <br />
          </Typography>
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
  width: "60%",
  backgroundColor: "white",
  display: "flex",
  borderRadius: 5,
  marginBottom: 20,
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "rgb(40, 55, 71)",
  padding: 10,
};

const span = {
  margin: 16,
  padding: 10,
  fontSize: 14.5,
};
