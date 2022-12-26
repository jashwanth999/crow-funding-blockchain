import "./App.css";
import Home from "./screens/Home";
import { Route, Routes } from "react-router";
import BackerRegister from "./auth_pages/register/BackerRegister";
import BackerLogin from "./auth_pages/login/BackerLogin";
import StartUpRegister from "./auth_pages/register/StartUpRegister";
import StartUpLogin from "./auth_pages/login/StartUpLogin";
import StartUpHome from "./startup/StartUpHome";
import CreateProject from "./startup/CreateProject";
import Milestone from "./startup/MileStone";
import Admin from "./admin/Admin";
import BackerHome from "./backer/BackerHome";
import Funding from "./backer/Funding";
import AdminLogin from "./admin/AdminLogin";
import HowToUse from "./helpers/HowToUse";
import Help from "./helpers/Help";
import Query from "./helpers/Query";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backer-register" element={<BackerRegister />} />
        <Route path="/backer-login" element={<BackerLogin />} />
        <Route path="/startup-register" element={<StartUpRegister />} />
        <Route path="/startup-login" element={<StartUpLogin />} />
        <Route path="/startup-home" element={<StartUpHome />} />
        <Route path="/startup-create-project" element={<CreateProject />} />
        <Route path="/startup-set-mile-stone/:id" element={<Milestone />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/backer-home" element={<BackerHome />} />
        <Route path="/backer-funds/:id" element={<Funding />} />
        <Route path="/how-to-use/:id" element={<HowToUse />} />
        <Route path="/help/:id" element={<Help />} />
        <Route path="/query" element={< Query/>} />
      </Routes>
    </div>
  );
}

export default App;
