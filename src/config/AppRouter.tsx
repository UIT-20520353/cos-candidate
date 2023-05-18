import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Contests from "../pages/contests";
import ResetPassword from "../pages/ResetPassword";
import Teams from "../pages/teams";

function AppRouter() {
  return (
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/contests"} element={<Contests />} />
      <Route path={"/reset-password"} element={<ResetPassword />} />
      <Route path={"/teams"} element={<Teams />} />
    </Routes>
  );
}

export default AppRouter;
