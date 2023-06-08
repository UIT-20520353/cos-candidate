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
import ProblemsOfContest from "../pages/ProblemsOfContest";
import DetailProblem from "../pages/DetailProblem";
import LayoutDetailProblem from "../layouts/LayoutDetailProblem";
import ListSubmission from "../pages/ListSubmission";
import Register from "../pages/register";
import SubmitPage from "../pages/SubmitPage";
import RankContest from "../pages/Ranking/RankContest";

function AppRouter() {
  return (
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/contest"}>
        <Route index={true} path={"list"} element={<Contests />} />
        <Route path={"list/register/:contestId"} element={<RegisterContest />} />
        <Route path={"enter/:id"} element={<ProblemsOfContest />} />
        <Route path={"ranking/:idContest"} element={<RankContest />} />
      </Route>
      <Route path={"/reset-password"} element={<ResetPassword />} />
      <Route path={"/contest/list/registered"}>
        <Route index={true} element={<StartContest />}></Route>
        <Route path={"create"} element={<CreateTeam />}></Route>
      </Route>
      <Route path={"/ranking"} element={<Ranking />} />
      <Route path={"/problem"}>
        <Route path={"list"} element={<Exercises />} index={true} />
        <Route path={"detail/:idProblem"} element={<LayoutDetailProblem />}>
          <Route path={":idContest"}>
            <Route index={true} element={<DetailProblem />} />
            <Route path={"submit"} element={<SubmitPage />} />
            <Route path={"submission/mine"} element={<ListSubmission />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
