import React from "react";
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Crowd Funding
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Register
              </a>
              <ul class="dropdown-menu bg-dark">
                <li>
                  <a class="dropdown-item text-white" href="/startup-register">
                    Start Up
                  </a>
                </li>
                <li>
                  <a class="dropdown-item text-white" href="/backer-register">
                    Backer
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </a>
              <ul class="dropdown-menu bg-dark">
                <li>
                  <a class="dropdown-item text-white" href="/startup-login">
                    Start Up
                  </a>
                </li>
                <li>
                  <a class="dropdown-item text-white" href="/backer-login">
                    Backer
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/admin-login">
                Admin
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
