import { NavLink, Outlet, useParams } from "react-router-dom";
import Header from "~/components/Header";

function LayoutDetailProblem() {
  const { idProblem, idContest } = useParams<{ idProblem: string; idContest: string }>();

  return (
    <div className={"flex w-full flex-col items-center"}>
      <Header />
      <div className={"mt-8 w-4/5"}>
        <div className={"flex flex-row items-center"}>
          <NavLink
            to={`/problem/detail/${idProblem}/contest/${idContest}`}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
            end={true}
          >
            Đề bài
          </NavLink>
          <NavLink
            to={`/problem/detail/${idProblem}/contest/${idContest}/submit`}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
          >
            Nộp bài
          </NavLink>
          <NavLink
            to={`/problem/detail/${idProblem}/contest/${idContest}/submission/mine`}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
          >
            Các lần bạn nộp
          </NavLink>
          <NavLink
            to={idContest !== "0" ? `/contest/enter/${idContest}` : "/problem/list"}
            className={({ isActive }) => `${isActive ? "bg-gray-300" : ""} px-4 py-2 text-lg font-medium duration-300 `}
          >
            Quay lại
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutDetailProblem;
