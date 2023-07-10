import { Route, Routes } from "react-router-dom";
import Dashboard from "~/pages/dashboard";
import ProfilePage from "~/pages/ProfilePage";
import SubmitPage from "~/pages/SubmitPage";
import Register from "~/pages/register";
import Login from "~/pages/login";
import Contests from "~/pages/contests";
import RegisterContest from "~/pages/RegisterContest";
import ProblemsOfContest from "~/pages/ProblemsOfContest";
import RankContest from "~/pages/Ranking/RankContest";
import ResetPassword from "~/pages/ResetPassword";
import StartContest from "~/pages/StartContests";
import CreateTeam from "~/pages/CreateTeam";
import Ranking from "~/pages/Ranking";
import Exercises from "~/pages/exercises";
import LayoutDetailProblem from "~/layouts/LayoutDetailProblem";
import DetailProblem from "~/pages/DetailProblem";
import ListSubmission from "~/pages/ListSubmission";
import { ProtectedRoute } from "~/components";

function AppRouter() {
  return (
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      <Route path={"/profile"} element={<ProfilePage />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/contest"}>
        <Route index={true} path={"list"} element={<Contests />} />
        <Route
          path={"register/:contestId"}
          element={
            <ProtectedRoute>
              <RegisterContest />
            </ProtectedRoute>
          }
        />
        <Route path={"enter/:id"} element={<ProblemsOfContest />} />
        <Route path={"ranking/:idContest"} element={<RankContest />} />
      </Route>
      <Route path={"/reset-password"} element={<ResetPassword />} />
      <Route path={"/contest/list/registered"}>
        <Route index={true} element={<StartContest />} />
        <Route path={"create"} element={<CreateTeam />} />
      </Route>
      <Route path={"/ranking"} element={<Ranking />} />
      <Route path={"/problem"}>
        <Route path={"list"} element={<Exercises />} index={true} />
        <Route path={"detail/:idProblem"} element={<LayoutDetailProblem />}>
          <Route path={"contest/:idContest"}>
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
