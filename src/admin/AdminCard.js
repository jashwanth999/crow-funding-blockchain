import { Button, Paper, Typography } from "@mui/material";
import FlipCard from "flip-card-react";
import React, { useState } from "react";

export default function AdminCard({
  data,
  approveProject,
  index,
  rejectProject,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (data.title === "") return;

  return (
    <div style={{ width: "30%", margin: 5 }}>
      <FlipCard
        isFlipped={isFlipped}
        key={data.title}
        front={
          <Paper
            onClick={() => setIsFlipped(!isFlipped)}
            elevation={1}
            style={frontCardDiv}
          >
            <div
              style={{
                margin: 5,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                {data.title}{" "}
                {Number(data.adminApproveStage - 1) === 3
                  ? "(Completed)"
                  : data.isApproved
                  ? `(Approved ${
                      data.amountRaised === data.amountToBeRaised &&
                      Number(data.adminApproveStage - 1) > 0
                        ? "stage " + Number(data.adminApproveStage - 1)
                        : ""
                    })`
                  : "(Not Approved)"}{" "}
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                Start Date:{data.startDate}
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                End Date:{data.endDate}
              </Typography>
            </div>

            <div
              style={{
                height: 5,
                backgroundColor: data.isApproved
                  ? "blue"
                  : data.isSetMileStone
                  ? "green"
                  : "red",
                width: "100%",
              }}
            />
            <div style={{ margin: 5 }}>
              <Typography
                style={{
                  color: data.isApproved
                    ? "blue"
                    : data.isSetMileStone
                    ? "green"
                    : "red",
                  fontWeight: "bold",
                }}
              >
                M1:{data.m1}{" "}
              </Typography>
              <Typography
                style={{
                  color: data.isApproved
                    ? "blue"
                    : data.isSetMileStone
                    ? "green"
                    : "red",
                  fontWeight: "bold",
                }}
              >
                M2:{data.m2}{" "}
              </Typography>
              <Typography
                style={{
                  color: data.isApproved
                    ? "blue"
                    : data.isSetMileStone
                    ? "green"
                    : "red",
                  fontWeight: "bold",
                }}
              >
                M3:{data.m3}{" "}
              </Typography>
            </div>

            <div
              style={{
                height: 5,
                backgroundColor: data.isApproved
                  ? "blue"
                  : data.isSetMileStone
                  ? "green"
                  : "red",
                width: "100%",
              }}
            />
            <div
              style={{
                marginTop: 10,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography style={{ fontWeight: "bold" }}>
                Total Amount Required:
                {window.web3.utils.fromWei(data.amountToBeRaised, "ether")}{" "}
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                Amount Raised:{" "}
                {window.web3.utils.fromWei(data.amountRaised, "ether")} ETH{" "}
              </Typography>
            </div>
          </Paper>
        }
        back={
          <Paper
            onClick={() => setIsFlipped(!isFlipped)}
            elevation={1}
            style={backCardDiv}
          >
            <div
              style={{
                margin: 2,
                border: "0px solid black",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <Typography style={{ color: "black" }}> {data.desc}</Typography>
            </div>{" "}
            <br />
            <Button
              style={{ fontWeight: "bold", margin: 10 }}
              color="primary"
              variant="contained"
              href={data.projectURL}
              target="_blank"
            >
              {" "}
              Know More
            </Button>
            <Button
              style={{ fontWeight: "bold", margin: 10 }}
              color="secondary"
              variant="contained"
              href={data.fileUrl}
              target="_blank"
            >
              {" "}
              View Document
            </Button>
            {data.stage === data.adminApproveStage && (
              <Button
                style={{ color: "white", fontWeight: "bold", margin: 10 }}
                variant="contained"
                color="success"
                onClick={() => {
                  approveProject(index);
                }}
              >
                {" "}
                Approve{" "}
                {data.amountRaised === data.amountToBeRaised
                  ? "stage " + data.stage
                  : "project"}
              </Button>
            )}
            {!data.isApproved && (
              <Button
                style={{ fontWeight: "bold", margin: 10 }}
                color="error"
                variant="contained"
                onClick={() => rejectProject(index)}
              >
                {" "}
                Reject project
              </Button>
            )}
          </Paper>
        }
        direction="horizontal"
        width={"30%"}
      />
    </div>
  );
}

const frontCardDiv = {
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
  backgroundColor: "white",
  padding: 5,
  height: 300,
  alignItems: "center",
};
const backCardDiv = {
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
  backgroundColor: "white",
  padding: 5,
  height: 300,
  overflowY: "scroll",
};
