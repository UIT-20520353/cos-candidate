import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Contests from "../pages/contests";
import ResetPassword from "../pages/ResetPassword";
import StartContest from "../pages/StartContests";
import CreateTeam from "../pages/CreateTeam";
import RegisterContest from "../pages/RegisterContest";
import Ranking from "../pages/Ranking";
import Exercises from "../pages/exercises";

function AppRouter() {
  return (
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/contest/list"}>
        <Route index={true} element={<Contests />} />
        <Route path={"register/:id"} element={<RegisterContest />} />
      </Route>
      <Route path={"/reset-password"} element={<ResetPassword />} />
      <Route path={"/contest/list/registered"}>
        <Route index={true} element={<StartContest />}></Route>
        <Route path={"create"} element={<CreateTeam />}></Route>
      </Route>
      <Route path={"/ranking"} element={<Ranking />} />
      <Route path={"/problem/list"} element={<Exercises />} />
    </Routes>
  );
}

export default AppRouter;
