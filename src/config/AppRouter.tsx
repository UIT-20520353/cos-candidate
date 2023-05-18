import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";

function AppRouter() {
  return (
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
