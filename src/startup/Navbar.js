import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("email");

    navigate("/");
  };
  return (
    <nav
      style={{ padding: 10 }}
      className="navbar navbar-expand-lg navbar-light bg-dark "
    >
      <a
        style={{ color: "white",  }}
        className="navbar-brand"
        href="#"
      >
        Crowd Funding
      </a>
      <button
        style={{ color: "white" }}
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a
              style={{ color: "white" }}
              className="nav-link"
              href="/startup-home"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              style={{ color: "white" }}
              className="nav-link"
              href="/startup-home"
            >
              My projects
            </a>
          </li>
        </ul>
      </div>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Button
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: 4,
            }}
            className="nav-link"
            onClick={() => {
              navigate("/startup-create-project");
            }}
          >
            Create Project
          </Button>
        </li>
        <li className="nav-item">
          <a
            style={{ color: "white" }}
            className="nav-link"
            href="/how-to-use/1"
          >
            How to use
          </a>
        </li>
        <li className="nav-item">
          <a style={{ color: "white" }} className="nav-link" href="/help/1">
            help
          </a>
        </li>
        <li className="nav-item">
          <Button
            style={{
              color: "white",
              border: "1px solid white",
              borderRadius: 4,
            }}
            className="nav-link"
            onClick={logout}
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}
